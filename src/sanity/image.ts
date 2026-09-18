import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, isSanityConfigured, projectId } from "./env";

const builder = isSanityConfigured ? createImageUrlBuilder({ projectId: projectId!, dataset }) : null;

/** Returns an image URL builder for a Sanity image field, or null if there's no image / no project configured. */
export function urlFor(source: SanityImageSource | null | undefined) {
  if (!builder || !source) return null;
  return builder.image(source);
}
