import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export function GET() {
  return Response.json({
    generateText: typeof generateText,
    openai: typeof openai,
  });
}

