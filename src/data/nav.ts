export type NavLink = { label: string; href: string };

// Navigation stays code-owned rather than moving to Sanity: the hrefs are
// tied to section ids (#work, #about) baked into the page layout, so
// editing a label here without also updating the matching component
// would silently break scrolling.
export const navLinks: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Writing", href: "/writing" },
];
