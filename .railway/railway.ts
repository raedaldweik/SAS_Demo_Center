/**
 * Railway configuration (Infrastructure as Code).
 *
 * This is OPTIONAL. Deploying from the Railway dashboard works without it
 * (see "Deploy on Railway" in README.md). Use it when you prefer the Railway CLI:
 *
 *   railway login
 *   railway link            # pick the project and environment
 *   railway config plan     # preview, changes nothing
 *   railway config apply    # create / update the service
 *
 * This file describes the WHOLE Railway project: a service that is not listed
 * here gets deleted by "apply". Only use it on a project that holds nothing
 * but the demo center, and always read the plan first.
 *
 * Railway replaced the old railway.json / railway.toml files with this format.
 */
import { defineRailway, github, project, service } from "railway/iac";

export default defineRailway(() => {
  // Same name Railway gives the service when the repository is deployed from the dashboard.
  const web = service("SAS_Demo_Center", {
    // Change this if the repository is moved or renamed.
    source: github("raedaldweik/SAS_Demo_Center", { branch: "main" }),

    // Reads demos.xlsx and builds the site into the "dist" folder.
    build: "npm run build",

    // No start command on purpose: Railway serves "dist" as a static website.
    env: {
      RAILPACK_SPA_OUTPUT_DIR: "dist",
    },

    // A new version only goes live once the home page answers.
    healthcheck: "/",
  });

  return project("SAS Demo Center", {
    resources: [web],
  });
});
