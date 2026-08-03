import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const secret = process.env.ABA_INBOUND_WEBHOOK_SECRET;
  if (!secret || request.headers.get("x-aba-webhook-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json() as Record<string, any>;
  const data = payload.data || payload;
  const sender = Array.isArray(data.from) ? data.from[0] : data.from;
  const recipient = Array.isArray(data.to) ? data.to[0] : data.to;
  if (!sender || !recipient) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("mail_messages").insert({
    direction: "inbound", sender, recipient, subject: data.subject || "Sans objet",
    body: data.text || data.html || "", status: "received", external_id: data.email_id || data.id || null
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ received: true });
}
