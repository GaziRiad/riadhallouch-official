import { NextResponse } from "next/server";
import { contactRequestSchema } from "@/lib/validation";
import { isRateLimited } from "@/lib/rate-limit";
import { getSiteSettings } from "@/sanity/queries";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = contactRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const { name, email, reason, message } = parsed.data;

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error(
      "Contact form submitted but WEB3FORMS_ACCESS_KEY is not configured. Set it in your environment to enable email delivery.",
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
    const settings = await getSiteSettings();
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `${reasonLabel} from ${name}`,
        from_name: `${settings.name} Portfolio`,
        name,
        email,
        reason: reasonLabel,
        message,
      }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.success) {
      throw new Error(data?.message ?? `Web3Forms request failed (${res.status})`);
    }
  } catch (error) {
    console.error("Failed to send contact email via Web3Forms", error);
    // `detail` carries Web3Forms' own rejection reason ("invalid access key",
    // a domain restriction, and so on). The form keeps showing the friendly
    // `error`, so this is only visible in the response body — enough to
    // diagnose a delivery failure without shell access to the runtime logs.
    return NextResponse.json(
      {
        error: "Failed to send message.",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
