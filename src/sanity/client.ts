import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" })
  : null;

/**
 * Fetches from Sanity when a project is configured, otherwise resolves to
 * `null` so callers can fall back to bundled placeholder content. Keeps
 * every page working — with real content once connected, with sane
 * defaults before that — instead of crashing the build.
 */
export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  { revalidate = 60 }: { revalidate?: number | false } = {}
): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate } });
  } catch (error) {
    console.error("Sanity fetch failed", error);
    return null;
  }
}

export { client };
