# Yournaly

**Yournaly** is an AI writing companion for language learners. Write in English—journals, emails, drafts—and get teacher-like feedback, a letter grade, and clear insights so you can improve with every entry.

It lives in your browser as a [Chrome extension](https://chromewebstore.google.com/detail/yournaly/hmapfjoppnaaiidefjjndeppkjaklfjm), with a public homepage at [yournaly.p4blobeltran.com](https://yournaly.p4blobeltran.com/).

## Why Yournaly?

- **Learn by writing** — Practice real English instead of drills. Focus on expressing yourself; Yournaly handles the coaching.
- **Teacher-like reviews** — Corrections, tone guidance, and explanations that feel natural—not robotic red ink.
- **Clear progress** — Every entry gets a grade (A–F) so you can see how you’re doing over time.
- **Feedback in your language** — Understand mistakes in English, Spanish, French, Italian, or Portuguese.
- **Pay as you go** — Usage is measured in **Inks**. No subscriptions—buy credits when you need them.

## Links

|              |                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| **Download** | [Chrome Web Store](https://chromewebstore.google.com/detail/yournaly/hmapfjoppnaaiidefjjndeppkjaklfjm) |
| **Homepage** | [https://yournaly.p4blobeltran.com/](https://yournaly.p4blobeltran.com/)                               |

## How Yournaly helps you learn

1. **Start writing** — Open the side panel and write anything: a journal, an email, or a short draft.
2. **Set your preferences** — Choose your native language, tone, and how detailed you want feedback to be.
3. **Get teacher-like feedback** — Receive corrections and suggestions tailored to your goals.
4. **Review, learn, and improve** — Read the insights, understand your mistakes, and grow one Yournal at a time.

<!-- Replace this placeholder with a screenshot of the learning flow (write → preferences → feedback → improve). -->

![How Yournaly Helps You Learn](https://lh3.googleusercontent.com/M1w_APSUvQD5WwJKxF0wTQFSJV4WZqxeh7F3fJYqdkKaZHzyiw8W3D3c7qHodO2mEYTVm30owufGT9BLxfyh95NP5bs=s1600-w1600-h1000)

## Customizable Yournal review

Every review can match how you want to learn: tone (e.g. formal or casual), feedback depth, and grading so the experience feels like a teacher who knows your goals—not a one-size-fits-all checker.

<!-- Replace this placeholder with a screenshot of review settings and/or a completed Yournal review (score, corrected text, insights). -->

![Customizable Yournal Review](https://lh3.googleusercontent.com/OG0bfsM6ztk-VpH95nXeDKKFASHPvOk00Fn_DU_I4ADbBQ0bErUMmnl90LiDIpLGNI2CAvWnbXeERjK95xNE43KY3w=s1280-w1280-h800)

## Feedback in multiple languages

Get explanations in the language that helps you most. Yournaly’s multilingual interface and native-language feedback support English, Spanish, French, Italian, and Portuguese so corrections are easier to absorb.

<!-- Replace this placeholder with a screenshot showing feedback or UI language options across supported languages. -->

![Feedback in Multiple Languages](https://lh3.googleusercontent.com/ft1Kh3AKXJ9-xBBBvvntJGF-sXuMD6RRfsxURj-LxEB8p6Gd0n97QOrpjw2FHTkIx4zIQ6_8fUt7h09tH7wbB2Fp=s1280-w1280-h800)

## Repository layout

This monorepo contains the full product:

| Package                                      | Role                                                   |
| -------------------------------------------- | ------------------------------------------------------ |
| [`yournaly-extension`](./yournaly-extension) | Chrome (MV3) side-panel extension — primary product UI |
| [`yournaly-backend`](./yournaly-backend)     | Express API — auth, AI reviews, Inks, Stripe           |
| [`yournaly-marketing`](./yournaly-marketing) | Next.js marketing site — landing, privacy, terms       |

See each package README for setup, architecture, and deployment details.

## Built by

[Astrobit](https://www.goastrobit.com) — developed with care for language learners everywhere.
