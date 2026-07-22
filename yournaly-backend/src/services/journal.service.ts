import type { JournalTone, JournalScore, JournalLanguage, JournalTextLength, JournalMistakeType } from '@/lib/_types';
import type { Prisma } from '@/generated/prisma';
import type {
  ReviewJournalAIArgs,
  ReviewJournalAIResponse,
  GetJournalsSummaryServiceArgs,
  GetJournalsSummaryServiceResponse,
  GetJournalByIdServiceArgs,
  JournalReviewDetail,
  JournalSummaryCard,
  SoftDeleteJournalArgs,
  SoftDeleteJournalResponse,
  UpdateJournalTitleArgs,
  UpdateJournalTitleResponse,
} from '@/lib/interfaces/journal.interface';

import { DEFAULT_JOURNAL_TITLE, DEFAULT_PAGINATION, MAX_PREVIEW_LENGTH } from '@/lib/constants/defaultValues';
import { formatPrompt } from '@/lib/utils/promptUtils';
import { truncateText } from '@/lib/utils/stringUtils';
import { calculateInkCost } from '@/lib/utils/inkUtils';
import { requestOpenAIService } from '@/services/openAI.service';
import { deductUserInksService, refundUserInksService } from '@/services/user.service';
import { prisma } from '@/database';

export const generateJournalReviewAiService = async (args: ReviewJournalAIArgs): Promise<ReviewJournalAIResponse> => {
  const { userId, organizationId, originalText, params } = args;
  const { tone, improveReadability, targetLanguage, reviewLanguage, advancedOptions } = params;

  const organizationMembership = await prisma.organizationUsers.findFirst({
    where: {
      userId,
      organizationId,
      isActive: true,
      deletedAt: null,
    },
  });

  if (!organizationMembership) {
    throw new Error('User is not a member of this organization');
  }

  const estimatedInks = calculateInkCost({
    originalText,
    tone,
    improveReadability,
    advancedOptions,
  });

  await deductUserInksService({ userId, inkAmount: estimatedInks });

  try {
    const prompt = formatPrompt({
      originalText,
      targetLanguage,
      reviewLanguage,
      tone,
      improveReadability,
      textLength: advancedOptions?.textLength ?? 'none',
      minCharacters: advancedOptions?.minCharacters ?? null,
      maxCharacters: advancedOptions?.maxCharacters ?? null,
    });

    const response = await requestOpenAIService(prompt);

    const review = JSON.parse(response) as ReviewJournalAIResponse;

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const createdJournal = await tx.journals.create({
        data: {
          userId,
          originalText,
          title: review.title,
          reviewedText: review.reviewedText,
          estimatedInks,
        },
      });

      review.id = createdJournal.id;

      await tx.journalParams.create({
        data: {
          journalId: createdJournal.id,
          reviewLanguage,
          targetLanguage,
          tone,
          improveReadability,
          textLength: advancedOptions?.textLength ?? 'none',
          minCharacters: advancedOptions?.minCharacters ?? null,
          maxCharacters: advancedOptions?.maxCharacters ?? null,
        },
      });

      const feedbackString = Array.isArray(review.feedback) ? review.feedback.join('\n') : review.feedback;

      const createdReview = await tx.journalReviews.create({
        data: {
          journalId: createdJournal.id,
          score: review.score,
          feedback: feedbackString,
        },
      });

      if (review.insights.length > 0) {
        const insightsData = review.insights.map(insight => ({
          journalReviewId: createdReview.id,
          mistakeType: insight.mistakeType,
          mistakeTitle: insight.mistakeTitle,
          originalMistake: insight.originalMistake,
          mistakeCorrection: insight.mistakeCorrection,
          mistakeExplanation: insight.mistakeExplanation,
          ranges: insight.ranges,
        }));

        await tx.journalReviewInsights.createMany({
          data: insightsData,
        });
      }
    });

    return review;
  } catch (error) {
    await refundUserInksService({ userId, inkAmount: estimatedInks });
    throw error;
  }
};

export const getJournalsSummaryService = async (
  args: GetJournalsSummaryServiceArgs
): Promise<GetJournalsSummaryServiceResponse> => {
  const {
    organizationId,
    userId,
    page = DEFAULT_PAGINATION.page,
    limit = DEFAULT_PAGINATION.limit,
    sort = DEFAULT_PAGINATION.sort,
    order = DEFAULT_PAGINATION.order,
  } = args;

  const skip = (page - 1) * limit;
  const take = Math.min(limit, DEFAULT_PAGINATION.take);

  const sortField = sort === 'inksUsed' ? 'usedInks' : sort;
  const orderBy = { [sortField]: order };

  const [journals, total] = await Promise.all([
    prisma.viewJournalSummary.findMany({
      where: {
        organizationId,
        userId,
      },
      skip,
      take,
      orderBy,
    }),
    prisma.viewJournalSummary.count({
      where: {
        organizationId,
        userId,
      },
    }),
  ]);

  const summaryCards: JournalSummaryCard[] = journals.map(journal => ({
    id: journal.journalId,
    title: journal.title ?? DEFAULT_JOURNAL_TITLE,
    description:
      journal.text.length > MAX_PREVIEW_LENGTH ? truncateText(journal.text, MAX_PREVIEW_LENGTH) : journal.text,
    tone: journal.tone as JournalTone,
    inksUsed: journal.usedInks ?? 0,
    score: journal.score as JournalScore,
    date: journal.createdAt.toISOString(),
  }));

  return {
    total,
    page,
    limit: take,
    journals: summaryCards,
  };
};

export const getJournalByIdService = async (args: GetJournalByIdServiceArgs): Promise<JournalReviewDetail | null> => {
  const { journalId, userId, organizationId } = args;

  const organizationMembership = await prisma.organizationUsers.findFirst({
    where: {
      userId,
      organizationId,
      isActive: true,
      deletedAt: null,
    },
  });

  if (!organizationMembership) {
    throw new Error('User is not a member of this organization');
  }

  const journal = await prisma.journals.findFirst({
    where: {
      id: journalId,
      userId,
    },
    include: {
      journalParams: true,
      journalReviews: {
        include: {
          journalReviewInsights: true,
        },
      },
    },
  });

  if (!journal) {
    return null;
  }

  const review = journal.journalReviews[0];
  const params = journal.journalParams[0];

  if (!review || !params) {
    return null;
  }

  const insights = review.journalReviewInsights.map(insight => ({
    mistakeType: insight.mistakeType as JournalMistakeType,
    mistakeTitle: insight.mistakeTitle,
    originalMistake: insight.originalMistake,
    mistakeCorrection: insight.mistakeCorrection,
    mistakeExplanation: insight.mistakeExplanation,
    ranges: insight.ranges as [number, number][],
  }));

  const journalDetail: JournalReviewDetail = {
    id: journal.id,
    title: journal.title ?? DEFAULT_JOURNAL_TITLE,
    originalText: journal.originalText,
    reviewedText: journal.reviewedText ?? '',
    score: review.score as JournalScore,
    tone: params.tone as JournalTone,
    inksUsed: journal.estimatedInks ?? 0,
    date: journal.createdAt.toISOString(),
    feedback: review.feedback,
    insights,
    parameters: {
      improveReadability: params.improveReadability,
      targetLanguage: params.targetLanguage as JournalLanguage,
      reviewLanguage: params.reviewLanguage as JournalLanguage,
      advancedOptions:
        params.textLength === 'none' && !params.minCharacters && !params.maxCharacters
          ? null
          : {
              textLength: params.textLength as JournalTextLength,
              minCharacters: params.minCharacters,
              maxCharacters: params.maxCharacters,
            },
    },
  };

  return journalDetail;
};

export const softDeleteJournalService = async (args: SoftDeleteJournalArgs): Promise<SoftDeleteJournalResponse> => {
  const { userId, organizationId, journalId } = args;

  const organizationMembership = await prisma.organizationUsers.findFirst({
    where: {
      userId,
      organizationId,
      isActive: true,
      deletedAt: null,
    },
  });

  if (!organizationMembership) {
    throw new Error('User is not a member of this organization');
  }

  const journal = await prisma.journals.findFirst({
    where: {
      id: journalId,
      userId,
      deletedAt: null,
    },
  });

  if (!journal) {
    throw new Error('Journal not found or access denied');
  }

  await prisma.journals.update({
    where: { id: journalId },
    data: {
      deletedAt: new Date(),
    },
  });

  return {
    success: true,
    message: 'Journal deleted successfully',
  };
};

export const updateJournalTitleService = async (args: UpdateJournalTitleArgs): Promise<UpdateJournalTitleResponse> => {
  const { userId, organizationId, journalId, title } = args;

  const organizationMembership = await prisma.organizationUsers.findFirst({
    where: {
      userId,
      organizationId,
      isActive: true,
      deletedAt: null,
    },
  });

  if (!organizationMembership) {
    throw new Error('User is not a member of this organization');
  }

  const journal = await prisma.journals.findFirst({
    where: {
      id: journalId,
      userId,
      deletedAt: null,
    },
  });

  if (!journal) {
    throw new Error('Journal not found or access denied');
  }

  const updatedJournal = await prisma.journals.update({
    where: { id: journalId },
    data: {
      title,
      updatedAt: new Date(),
    },
  });

  return {
    success: true,
    title: updatedJournal.title ?? '',
  };
};
