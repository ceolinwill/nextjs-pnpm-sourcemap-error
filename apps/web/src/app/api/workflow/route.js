import { start } from "workflow/api";
import { demoWorkflow } from "../../../workflows/demo";

export async function POST() {
  const run = await start(demoWorkflow);

  return Response.json({ runId: run.runId });
}

