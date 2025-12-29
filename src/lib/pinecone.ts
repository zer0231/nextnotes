import { Pinecone } from "@pinecone-database/pinecone";

//To minimize the usage of openai apikey using vector embedding array
const apiKey = process.env.PINECONE_API_KEY;
if (!apiKey) throw Error("PINECONE_API_KEY not set");
const pinecone = new Pinecone({
//   environment: "gcp-starter",
  apiKey
});

export const notesIndex = pinecone.Index("nextjs-openai-note-app")