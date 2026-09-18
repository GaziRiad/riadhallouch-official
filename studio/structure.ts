import type { StructureResolver } from "sanity/structure";

// Pins "Site settings" as a singleton (no create/duplicate/delete) and
// lists every other document type normally underneath it.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "siteSettings"),
    ]);
