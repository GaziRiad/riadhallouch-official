import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineCliConfig({
  api: { projectId, dataset },
  // Pins the application this Studio deploys to. Sanity asks for it
  // otherwise, which a CI runner cannot answer.
  deployment: { appId: "akk5gb4xiapqr7zyl7h4gghe" },
  // Pins the hostname so `sanity deploy` doesn't stop to ask for one in CI,
  // where there's nobody to answer. Unset, the CLI uses whichever host the
  // project already has registered.
  studioHost: process.env.SANITY_STUDIO_HOST,
});
