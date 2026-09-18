// In-memory sliding-window limiter. Good enough for a single-instance
// deployment; on multi-instance serverless hosting each instance keeps its
// own counts, so treat this as a soft brake against basic spam, not a hard
// guarantee — swap in Upstash/Redis if you scale past one region.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return false;
}
