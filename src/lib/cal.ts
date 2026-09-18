"use client";

let apiPromise: ReturnType<typeof initCalApi> | null = null;

async function initCalApi() {
  const { getCalApi } = await import("@calcom/embed-react");
  const cal = await getCalApi();
  cal("ui", {
    theme: "light",
    styles: { branding: { brandColor: "#00c08b" } },
  });
  return cal;
}

/**
 * Opens the Cal.com booking modal. The embed SDK is dynamically imported on
 * first call, so nothing booking-related ships in the initial bundle.
 */
export async function openBooking(calLink: string) {
  if (!apiPromise) apiPromise = initCalApi();
  const cal = await apiPromise;
  cal("modal", { calLink });
}
