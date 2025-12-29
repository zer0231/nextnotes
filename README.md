## Intro
This is a simple note web application with chatgpt embedded which can read our notes and provide a chatbot to interact with

## How its made?
I have used openai, pinecone and vercel to create this application
with NextJs and prisma for ORM

## Tech Stack
  Framework: Next.js 14 (App Router)
  Authentication: Clerk
  Database: MongoDB Atlas
  Vector DB: Pinecone
  AI SDK: Vercel AI SDK
  LLM: OpenAI (GPT-4o / GPT-3.5)
  ORM: Prisma
  Styling: Tailwind CSS & Shadcn UI
  
  
## How It Works (RAG Architecture)
  Ingestion: When a user creates or updates a note, the text is sent to OpenAI's text-embedding-3-small model.
  Indexing: The resulting vector (a list of numbers) is stored in Pinecone, tagged with the user's Clerk ID.
  Retrieval: When a user asks a question in the chat, the app turns that question into a vector and searches Pinecone for the most relevant notes.
  Generation: The relevant note content is provided to the LLM as context, and the Vercel AI SDK streams the final answer back to the user.
    
    