# Yournaly | Learn English with AI - Project Context

## Test Commit Update

## Overview

Yournaly is a SaaS platform designed to help ESL (English as a Second Language) learners improve
their English writing through structured journaling, GPT teacher-like feedback, and actionable
insights. Users write journals, receive AI feedback, and track their progress in a gamified,
educational environment.

The platform is designed to be clean, scalable, and respectful of user privacy while using a single
PostgreSQL database instance for all users.

## Core Features

- **Journal Writing:** Users can write journals with customizable tone, readability, and length
  preferences.
- **AI Feedback:** Uses GPT models to provide structured, teacher-like feedback and a reviewed
  version of the user's text.
- **Insights:** The AI identifies mistakes in grammar, vocabulary, structure, and style, storing
  each mistake with correction suggestions and explanations.
- **Feedback:** Users receive global feedback for each review to guide their learning.
- **Stripe Payments:** Manages user subscriptions using Stripe for SaaS monetization.
- **OAuth Authentication:** Login and signup are handled exclusively through OAuth providers
  (Google, Apple).
- **User Preferences:** Users can set default parameters for tone, readability, and text length.

## Database Design

PostgreSQL is used with the following tables:

- `users`: Stores user information (UUID PK, email, name, verification state).
- `user_providers`: Stores OAuth provider details (provider, provider_user_id).
- `user_preferences`: Stores user-specific defaults (tone, readability, text length, min/max
  characters).
- `user_subscriptions`: Stores Stripe subscription linkage and status.
- `journals`: Stores user-written journal entries with soft delete support.
- `journal_params`: Stores parameters used for each journal entry.
- `journal_reviews`: Stores reviewed versions of journals with a title, score (A-D), reviewed text,
  and global feedback as `text[]`.
- `journal_review_insights`: Stores individual mistakes with type, title, original text, correction,
  explanation, and character ranges (`int[2][]`).

The design uses:

- UUIDs as PKs with `uuid_generate_v4()`.
- Timestamps with `created_at`, `updated_at`, `deleted_at` for soft delete and versioning.
- Triggers to auto-update `updated_at` on row updates.
- Partial indexes for active record retrieval (`deleted_at IS NULL`).

## Tech Stack

- **Backend:** Node.js + Express (optional), or Supabase as an alternative.
- **Database:** PostgreSQL with UUID PKs.
- **Frontend:** Astro/Svelte/React.
- **Authentication:** OAuth (Google, Apple).
- **Payments:** Stripe.
- **AI:** GPT models (OpenAI) for text review and feedback.

## GPT Review Structure

Each GPT review provides:

- `title`: Summary title.
- `score`: A–D rating.
- `reviewed_text`: Improved version of the user's text.
- `feedback: string[]`: Global feedback.
- `insights`: List of mistakes with:
  - `mistake_type`
  - `mistake_title`
  - `original_mistake`
  - `mistake_correction`
  - `mistake_explanation`
  - `ranges: [number, number][]`

## Development Principles

- Keep architecture clean, scalable, and understandable for future contributors.
- Use clear, structured database design with relational modeling for advanced BI and analytics.
- Store insights relationally for queryable mistake-level data.
- Use soft deletes and consistent timestamp tracking for safe data management.
- Align with best practices in SaaS design while prioritizing ESL learner needs.

## Use Cases

- ESL learners journal daily to improve writing skills.
- Users track improvement through AI-scored feedback and insight trends.
- Users adjust tone, readability, and length to simulate different writing contexts.
- Subscription management through Stripe for premium review volume and features.

## Draft Notes

```
About Yournaly:
Yournaly is a Chrome Extension designed to help non-native English speakers improve their writing while actively learning. It allows users to input text and receive a clear, corrected version alongside structured, teacher-like feedback explaining what was wrong, why it was wrong, and how to fix it, promoting meaningful learning with every entry. The extension provides a simple proficiency score (A–D) and motivational feedback to encourage consistent improvement, supporting tone and readability adjustments based on user preferences. Built with a clean, distraction-free interface within a side panel, Yournaly transforms everyday writing into an opportunity for measurable English skill growth.

Key Features:
- SSO with Google & Apple.
- Purchase on demand inks (tokens) for reviews.
- Search, sort and review journals history.
- In depth feedback on the text provided by a teacher-like AI.
- Language selection for application interface (i18n).

Input Parameters:
- Original Text: the text that the user wants to get feedback on. Max 2500 characters.
- Tone: the tone of the text. Can keep the original tone or change it to a different one.
- Improve Readability: a toggle to improve the readability of the text. Disabled by default.
- Advanced Options/Text Length: optional with options Shorten or Expand. None by default.
- Advanced Options/Min Characters: optional number of characters to generate. None by default.
- Advanced Options/Max Characters: optional number of characters to generate. None by default.

Token system:
Yournaly will use a token system to allow users review their texts. Tokens are called Inks. Depending on the complexity of the request, it will cost a different amount of Inks. Inks can be purchased on demand and does not expire.

Ink Pricing and Token Usage:
- Inks displayed in the extension abstract the underlying OpenAI token usage, ensuring user predictability while aligning with operational costs.
- Ink usage per request depends on:
  a. Text length.
  b. Selected parameters (tone, readability, advanced options).
- Updated Ink cost model (halved for user affordability while maintaining profitability):
  - Base cost: 2.5 Inks per 500 characters (e.g., 2500 characters = 12.5 Inks, rounded to 13 Inks).
  - Tone adjustment: +1 Inks.
  - Readability improvement: +1.5 Inks.
  - Advanced options (shorten/expand): +2.5 Inks.
  - Advanced options (min/max chars): +1.5 Inks.
  - Maximum expected Ink usage per review with all options enabled: 19 Inks.
- Free Inks on sign-up: 300 Inks to allow meaningful testing while limiting abuse (~15 max-parameter reviews).
- Ink packages for monetization:
  a. 500 Inks - $9.99 (~26 max-parameter reviews at 19 Inks/review).
  b. 1000 Inks - $16.99 (~52 max-parameter reviews at 19 Inks/review).
  c. 2000 Inks - $29.99 (~105 max-parameter reviews at 19 Inks/review).
- At maximum usage, the $9.99 package now provides ~26 full-length, max-parameter reviews, ensuring the offering feels fair and competitive while maintaining high gross margins.
- Database storage per review remains negligible (~15 KB/review), and overall storage cost does not affect pricing significantly at scale.
- Users will see an "Estimate Ink Usage" display before submitting a review for transparency and predictability.
- The backend will calculate, deduct, and track Ink usage per request to ensure consistency between frontend display and database records.
- This updated structure ensures Yournaly remains affordable, user-friendly, and scalable while aligned with the project's side-project sustainability goals.

Possible technical decisions:
1. The Chrome Extension will be built with React + Vite. This decision was made because it's a lightweight framework easy to use and deploy. Also, as it is a Chrome Extension, we want to keep the size of the extension as small as possible.
2. On the future, it is possible that I will build a different project with Next to add more features that are not related to the Chrome Extension. These features could be dashboards, recommendations, learning paths, etc.
3. The database will be a relational database like PostgreSQL. This decision was made because it's a mature database with a lot of features and a lot of community support. It also support JSON data types which could be useful for some cases.
4. As mentioned before, the only authentication method will be Google and Apple. This decision was made because it's a simple and secure way to authenticate the user.
5. I'm thinking in using OpenAI API to generate the reviewed text. The model of choice is gpt-4.1-nano. I have yet to evaluate the cost of the API, as well as the performance of the model for this use case.
6. I'm still unsure if I should use Supabase. I think it would be a good idea to have a dedicated backend for the application made with Node.js. This would allow me to have more control over the application and have more flexibility in the future.

Application interface:
1. Authentication Page:
- This page contains a login button for Google and Apple.
- The application does not support local email and password login.
- There are links to the privacy policy and terms of service modal.
- When the user is logged in, they will be redirected to the main page.

2. Main Page:
- This is the main page of the application, the user is able to input text and get feedback on it.
- The top navbar contains the Logo on the left and on the right side, the current Inks balance and a cog icon to open the dropdown menu.
- The Inks balance is displayed in the top navbar and is updated when the user makes a request. It is a button that redirects to the purchase page.
- The cog icon opens the dropdown menu. The dropdown menu contains the following options: View Journals, Language, About Yournaly and Logout.
- There is a Header with the title "What's on your mind today?" and a subtitle "Let your creativity flow while you learn. Use this space to express yourself and watch your writing transform.".

Before submitting the text, this is the Main page structure:
- The first component is a text area with the title "Your journal entry" with a restriction of 2500 characters. This is the original text that the user wants to get feedback on. It has a character counter that shows the number of characters in the text area.
- There is a tone selector where the user can select the tone of the text. At the moment, there are 4 options: Original, Formal, Playful and Professional.
- Next to the tone selector, there is a "Improve Readability" toggle.
- There is an "Advance Options" button that toggles the advanced options section.
- The advanced options section contains the following options:
  a. Text Length: optional with options Shorten or Expand. None by default.
  b. Min Characters: optional number of characters to generate. None by default.
  c. Max Characters: optional number of characters to generate. None by default.
- There is a "Estimate ink usage" section that shows the number of Inks that will be used to review the text.
- At last, there is a "Review Journal" button that will submit the text to the AI for review.

When submitting the text:
- All the inputs are disabled. The user cannot change the text or the options.
- The "Review Journal" button is replaced by a "Reviewing..." button and show a spinner.

After submitting the text, this is the Main page structure:
- The first component is a text are with the title "Reviewed Journal". Next to the title, there's the character count and below a disabled text area with the reviewed text.
- Below the reviewed text, there are 2 actions: "Compare" and "Copy". When clicking on "Compare", there will be UI changes to show the comparison between the original text and the reviewed text. More on this later. When clicking on "Copy", the reviewed text is copied to the clipboard.
- There is a "Review Summary" button which redirects to the Journal Summary page of the journal.
- There is a section that displays the parameters used to generate the reviewed text. All of these parameters are disabled.
- At last, there is a "New Journal Entry" button that will reset the page and the text area and start a new journal entry.

When the user clicks on the "Compare" button, this is the Main page structure:
- The first component is the original text area with the title "Your journal entry" and the character counter. This is disabled.
- Below the original text area, there is a "Reviewed Journal" text area with the title "Reviewed Journal" and the character counter. This is disabled.
- The "Compare" button is replaced by a "Hide Original" button. When clicking on it, it will hide the original text area.

3. Purchase Inks Page:
- There's a title "Select an Ink Package" with a subtitle "Choose the package that fits your needs".
- There are 3 packages available, displayed in a clickable card format:
  a. Number of Inks: 500.
     Price: $9.99
     Title: Occasional Users.
     Description: Perfect for occasional users who need a small boost for their journaling experience.
     Recommended: No.
  b. Number of Inks: 1000.
     Price: $16.99
     Title: Regular Users.
     Description: Ideal for regular users who journal frequently and want consistent feedback..
     Recommended: Yes.
  c. Number of Inks: 2000.
     Price: $29.99
     Title: Power Users.
     Description: Best value for power users who want to maximize their journaling potential.
- At the end of there page, there is a "Proceed Checkout" button that redirects to the checkout page. Next to it, there is a "Cancel" button that redirects to the main page.

When the user clicks on the "Proceed Checkout" button, this is the Purchase Inks page structure:
- There is a full page loading spinner.

When the spinner is finished, this is the Purchase Inks page structure:
- The user should be redirected to the checkout page. This can be a 3rd party checkout page.

Although, the user should be redirected to the 3rd party checkout page, the page should contain the following components:
- A card with the title "Ready to Complete Your Purchase" with the subtitle "You'll be redirected to Stripe to securely complete your payment.".
- A button with the text "Continue to ..." where "..." is the name of the 3rd party checkout page. When clicking on it, the user should be redirected to the 3rd party checkout page.
- A text box with the link to the 3rd party checkout page. This can be copied to the clipboard.
- A "Back to Packages" button that redirects to the Purchase Inks page.

When the purchase is completed, the user should see a confirmation page with the following componentes:
- A card with the title "Purchase Successful!" with the subtitle "Your account has been credited with # Inks.", where # is the number of Inks purchased.
- Purchase details with:
  a. Package name.
  b. Amount paid.
  c. Transaction ID.
- A "Back to Home" button that redirects to the main page.

4. My Journals Page:
- The title of the page is "Journal History" with the subtitle "View and manage your previous journal entries".
- There is a search bar with the placeholder "Search by journal title or tone", that filters the journals by title or tone.
- There is a sort dropdown with the options:
  a. Date: Oldest to Newest and Newest to Oldest.
  b. Inks: Low to High and High to Low.
  c. Score: Low to High and High to Low.
- A list with cards displaying the journals information. This list is paginated and has a pagination component at the bottom of the page. The maximum number of journals per page is 10.
- Each card contains the following information, where each card is clickable and redirects to the Journal Summary page of the journal:
  a. Journal title.
  b. Journal score.
  c. A preview of the journal text.
  d. The tone selected for the journal and the left side of the card, and on the right side of the card, the number of Inks used.
  e. The date of the journal at the bottom of the card.

5. Journal Summary Page:
- There is a title of the Journal which has a pencil icon to edit the journal title. This title is generated by AI, hence, the option to edit the title by the user liking. When clicking the pencil, the user can edit the title. There is a check icon to save the changes and a cross icon to cancel the changes.
- The score section which contains the score (A-D), below this the score explanation and finally, the date of the journal entry.
- There are 2 text areas, both disabled and have the word and character count. The first one is the original text with the title "Your journal" and the second one is the reviewed text with the title "Reviewed journal".
- There is a collapsible section with the title "Review Insights" which contains the following information:
  a. Mistake Section: this is also a collapsible section with the title "Mistakes" which contains cards with the following information eacg:
    - The mistake type.
    - The mistake title.
    - The original mistake.
    - The mistake correction.
    - The explanation of the mistake.
  b. Feedback Section: this is also a collapsible section with the title "Feedback" which contains the following information:
    - The feedback displayed as a list of text.
- There is a "Review Parameters" section which is a collapsible with the information of the parameters used to generate the reviewed text.
- At the bottom, there is a "Download Journal" button which downloads the journal as a PDF file. Next to it, there is a "Delete Journal" button which deletes the journal. This button prompts the user to confirm the action.

6. Language Page:
- This page contains a list of available languages for the application interface. This does not affect the language of the reviewed text.
- There is a list of buttons for the languages: English, Spanish, Italian, French and Portuguese.
- At the bottom, there is a "Save Changes" button that changes the language of the application interface. Next to it, there is a "Cancel" button that cancels the changes and redirects to the main page.

7. About Yournaly Page:
- This page contains the information of the application, such as:
  a. An about us section, describing the application and its purpose.
  b. A legal section with the privacy policy and terms of service.
  c. A contact section with the email address to contact the support
- It also contains a footer with the application version and release date.

Database Design:

- Journal Table:
  a. id: uuid
  b. user_id: uuid
  c. original_text: text
  d. estimated_inks: integer
  e. created_at: timestamp
  f. updated_at: timestamp
  g. deleted_at: timestamp

- Journal Params Table:
  a. id: uuid
  b. journal_id: uuid
  c. tone: text
  d. improve_readability: boolean
  e. text_length: text
  f. min_characters: integer
  g. max_characters: integer
  h. created_at: timestamp
  i. updated_at: timestamp
  j. deleted_at: timestamp

- Journal Review Table:
  a. id: uuid
  b. journal_id: uuid
  c. title: text
  d. score: text (A-D)
  e. reviewed_text: text
  f. created_at: timestamp
  g. updated_at: timestamp
  h. deleted_at: timestamp

Now, the journal review has insights. These insights are the mistakes and the feedback and have the following structure:
feedback: string[];
mistakes: {
  mistake_type: string;
  mistake_title: string;
  original_mistake: string;
  mistake_correction: string;
  mistake_explanation: string;
  ranges: [number, number][];
}[];

How can I design the database to store taking into account this information? I would also like your suggestions for the rest of the the cases, such as authentication, user management, as well as, user preferences.
```
