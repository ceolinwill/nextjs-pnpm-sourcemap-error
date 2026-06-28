import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export default function Home() {
  return (
    <main>
      <h1>Next pnpm source map repro</h1>
      <p>generateText: {typeof generateText}</p>
      <p>openai: {typeof openai}</p>
    </main>
  );
}

