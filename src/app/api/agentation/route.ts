import { NextRequest, NextResponse } from "next/server";

// In-memory store for webhook events (dev only)
// Replace with a database/queue in production
type WebhookEvent = {
  event: string;
  timestamp: number;
  url: string;
  receivedAt: number;
};

const events: WebhookEvent[] = [];

export function GET() {
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  const body = await req.json() as WebhookEvent;
  events.push({ ...body, receivedAt: Date.now() });
  return NextResponse.json({ ok: true });
}