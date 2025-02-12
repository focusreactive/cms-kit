import crypto from "crypto";
import inquirer from "inquirer";
import ora from "ora";

import { appendOrUpdateEnv, loadEnvVariables } from "./loadEnvVariables.mjs";
import { checkEnvVariables, localRollout } from "./localRollout.mjs";
import { getSanityUserInfo } from "./services/sanity.mjs";
import { getVercelUserInfo } from "./services/vercel.mjs";
import {
  promptForDatasetName,
  promptForProjectName,
  promptForSanityOrganization,
  promptForSanityToken,
  promptForToken,
  promptForVercelTeam,
} from "./utils/prompts.mjs";
import { colorText } from "./utils/styles.mjs";

const main = async () => {
  console.log(
    colorText("\nWelcome to the Sanity Auto Rollout CLI Tool\n", "cyan"),
  );

  console.log(
    colorText("ℹ️  Configuration will be saved to .env.local", "yellow"),
  );

  try {
    await promptForSanityToken();
    await promptForToken("VERCEL_PERSONAL_AUTH_TOKEN");
    await promptForVercelTeam();
    await promptForSanityOrganization();

    const projectName = await promptForProjectName();
    const datasetName = await promptForDatasetName();

    console.log("projectName, datasetName");
    console.log(projectName, datasetName);

    const vercelUserInfo = await getVercelUserInfo();
    const sanityUserInfo = await getSanityUserInfo();

    return;

    try {
      // Ensure all required environment variables are set
      const requiredEnvVars = [
        "VERCEL_PERSONAL_AUTH_TOKEN",
        "SANITY_PERSONAL_AUTH_TOKEN",
        "SANITY_ORGANIZATION_ID",
        "VERCEL_FR_TEAM_ID",
        "PROJECT_NAME",
        "NEXT_PUBLIC_SANITY_DATASET",
        "MAX_NUMBER_OF_PROJECTS",
      ];
      checkEnvVariables(requiredEnvVars);

      const inputs = {
        email,
        projectName,
        datasetName,
        selectedTeam,
        selectedOrg,
      };
      const secrets = {
        SANITY_PERSONAL_AUTH_TOKEN: process.env.SANITY_PERSONAL_AUTH_TOKEN,
        SANITY_ORGANIZATION_ID: process.env.SANITY_ORGANIZATION_ID,
        VERCEL_PERSONAL_AUTH_TOKEN: process.env.VERCEL_PERSONAL_AUTH_TOKEN,
        VERCEL_FR_TEAM_ID: process.env.VERCEL_FR_TEAM_ID,
        PROJECT_NAME: process.env.PROJECT_NAME,
        NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
        MAX_NUMBER_OF_PROJECTS: process.env.MAX_NUMBER_OF_PROJECTS,
      };

      const summary = await localRollout({ inputs, secrets });

      if (summary) {
        console.table(summary);
        ora().succeed(
          colorText(
            "\nAll projects have been successfully set up and configured! 🎉\n",
            "green",
          ),
        );
        ora().info(colorText("Here are the details:", "cyan"));
        console.log(
          colorText(
            `
  - Environment variables are set up in the Vercel project.
  - The Vercel project is connected with your GitHub repo to rebuild the hosted project on commits to the main branch.
  - A web hook is set up in Sanity to trigger rebuilds on the Vercel project on public content changes.
  - The Vercel deploy URL is added to the Sanity CORS settings.
  - A preview token is created in the Sanity project.
  - Initial content matching the project's content model is uploaded to the production dataset on Sanity.
  - Other minor settings are completed.
  - The final step starts a deploy on your Vercel project. In a few minutes, you will be able to open the initial pages of your website and enter the Sanity studio.
`,
            "dim",
          ),
        );
        ora().succeed(
          colorText(
            "\nYou now have a configured local development mode on your machine. When the Sanity project is created, you will receive an email with an invitation to your project.\n",
            "green",
          ),
        );
        ora().info(
          colorText(
            "You can open the following links in your browser:",
            "cyan",
          ),
        );
        ora().info(
          colorText(`- Deployed website: ${summary.deploymentUrl}`, "cyan"),
        );
        ora().info(colorText(`- Sanity Studio: ${summary.studioUrl}`, "cyan"));
        ora().info(colorText(`- Vercel Project: ${summary.vercelUrl}`, "cyan"));
        ora().info(
          colorText(`- Sanity Project: ${summary.sanityUrl}\n`, "cyan"),
        );

        ora().info(colorText("The next commands you should use:", "cyan"));
        console.log(
          colorText(
            `
  > pnpm run build - to build the project locally
  > pnpm run dev - to start the dev server
`,
            "cyan",
          ),
        );
      }
    } catch (error) {
      console.error(colorText("Error:", "red"), error.message);
    }
  } catch (error) {
    console.log(error);
    console.error(colorText("Error :", "red"), error.message);
    process.exit(1);
  }
};

main();
