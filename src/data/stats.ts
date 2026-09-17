export type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

// NOTE: Verified figures from the brief. Update `value` if these change.
export const upworkStats: Stat[] = [
  {
    label: "Earned on Upwork",
    value: 14000,
    prefix: "$",
    suffix: "+",
  },
  {
    label: "Projects delivered",
    value: 30,
    suffix: "+",
  },
  {
    label: "Average client rating",
    value: 5.0,
    suffix: "/5",
    decimals: 1,
  },
];

// TODO: confirm current Upwork badge (Top Rated / Top Rated Plus / Rising Talent)
// on your live profile and adjust the copy in `upwork-badge.ts` if needed.
export const upworkBadge = {
  label: "Top Rated",
  sublabel: "Upwork",
};
