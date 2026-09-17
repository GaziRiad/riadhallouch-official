import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactRequestSchema } from "@/lib/validation";
import { siteConfig } from "@/data/site";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = contactRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const { name, email, reason, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "Contact form submitted but RESEND_API_KEY is not configured. Set it in your environment to enable email delivery.",
      { name, email, reason }
    );
    return NextResponse.json(
      { error: "Email delivery isn't configured yet. Please reach out by email directly." },
      { status: 503 }
    );
  }

  const reasonLabel =
    reason === "project"
      ? "New project inquiry"
      : reason === "full-time"
        ? "Full-time opportunity"
        : "General inquiry";

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `${siteConfig.name} Portfolio <onboarding@resend.dev>`,
      to: siteConfig.email,
      replyTo: email,
      subject: `${reasonLabel} from ${name}`,
      text: `From: ${name} <${email}>\nReason: ${reasonLabel}\n\n${message}`,
    });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
