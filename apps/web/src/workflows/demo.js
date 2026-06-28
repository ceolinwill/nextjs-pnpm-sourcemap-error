import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

async function loadAiSdkStep() {
  "use step";

  return {
    generateText: typeof generateText,
    openai: typeof openai,
  };
}

export async function demoWorkflow() {
  "use workflow";

  return loadAiSdkStep();
}

