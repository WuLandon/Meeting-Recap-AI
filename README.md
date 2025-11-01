# Meeting Recap AI

Meeting Recap AI is an intelligent productivity tool that transforms meeting transcripts into structured summaries highlighting key discussions, decisions, and action items — helping teams save time and stay organized. 

Built with Next.js, TypeScript, and Tailwind CSS, the app integrates **Google’s Gemini 2.5 Flash** model through an end-to-end AI workflow that generates clear, actionable recaps from raw meeting text.

👉 **Try It Out:** [meeting-recap-ai.vercel.app](https://meeting-recap-ai.vercel.app)

---

## Features

* **AI-Powered Summaries** – Converts raw meeting transcripts into organized summaries
* **Action Item Extraction** – Identifies tasks, owners, and due dates
* **Decision Tracking** – Highlights major team decisions
* **Next Meeting Notes** – Suggests or records upcoming meeting details
* **Modern UI** – Responsive, minimal interface using ShadCN + Tailwind

---

## Tech Stack

| Category             | Technologies                                                    |
| -------------------- | --------------------------------------------------------------- |
| **Frontend**         | Next.js 14 (App Router), React 19, TypeScript                   |
| **UI/UX**            | Tailwind CSS, ShadCN UI, Radix Primitives                       |
| **AI & API Layer**   | Google Gemini 2.5 Flash (via REST API), structured JSON parsing |
| **Data Handling**    | Node.js (API routes), TypeScript interfaces                     |
| **State Management** | React Query                                                     |
| **Build & Tooling**  | ESLint, Prettier, npm                                           |
| **Deployment**       | Vercel (CI/CD integration)                                      |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/meeting-recap-ai.git
cd meeting-recap-ai
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

> If you encounter dependency conflicts, try:
>
> ```bash
> npm install --legacy-peer-deps
> ```
>
> This flag allows installation even when some peer dependencies don’t perfectly match (common with React version updates).

### 3. Configure environment variables

Create a `.env.local` file in the root directory and add:

```bash
NEXT_PUBLIC_USE_MOCK=true          # Set to false to use real API
GOOGLE_API_KEY=your_gemini_key     # Required if USE_MOCK=false
```

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Example

### Input: Meeting Transcript

> Bob: Let's talk about the upcoming marketing campaign.<br> 
> Sarah: I’ll handle the final asset designs so everything is ready for review.<br>
> John: I’ll take care of preparing the email templates for the launch.<br>
> Bob: Great. Let’s make sure all campaign assets are finalized by Friday so we can start the social rollout on Monday.<br>
> Sarah: Sounds good. I’ll also update the schedule to reflect those dates.<br>
> Bob: Perfect. Our next meeting will be on Tuesday at 11 AM.

### Output

```json
{
  "summary": "The team discussed upcoming marketing strategies and finalized the new campaign launch date.",
  "decisions": [
    "Finalize campaign assets by Friday",
    "Begin social rollout on Monday"
  ],
  "action_items": [
    { "task": "Design final assets", "owner": "Sarah", "due": "Friday" },
    { "task": "Prepare email templates", "owner": "John", "due": "Monday" }
  ],
  "next_meeting": "Next Tuesday 11 AM"
}
```

---

## License

This project is licensed under the [MIT License](LICENSE).
