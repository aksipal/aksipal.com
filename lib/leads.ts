import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  sector: string;
  budget: string;
  message: string;
};

const LEAD_FILE_PATH = path.join(process.cwd(), ".data", "leads.jsonl");

export async function storeLead(payload: LeadPayload) {
  await mkdir(path.dirname(LEAD_FILE_PATH), { recursive: true });
  const line = JSON.stringify({
    ...payload,
    createdAt: new Date().toISOString(),
  });
  await appendFile(LEAD_FILE_PATH, `${line}\n`, "utf8");
}
