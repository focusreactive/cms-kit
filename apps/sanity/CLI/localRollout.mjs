import inquirer from "inquirer";
import ora from "ora";

import { isValidEmail } from "./email.mjs";
import { appendOrUpdateEnv, loadEnvVariables } from "./loadEnvVariables.mjs";
import { localFlow } from "./localFlow.mjs";
import {
  createSanityProject,
  createSanityReadToken,
  createVercelProject,
  getVercelProjects,
} from "./services.mjs";

export function checkEnvVariables(envVars) {
  loadEnvVariables();
  envVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      ora().fail(`Missing environment variable: ${envVar}`);
      process.exit(1);
    }
  });
}

export async function localRollout({ inputs, secrets }) {
  loadEnvVariables();
  const { email, projectName, datasetName, selectedTeam, selectedOrg } = inputs;
  const summary = {};

  try {
    if (!(email && isValidEmail(email))) {
      ora().fail("Email is not valid");
      return;
    }
    const username = email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "") // prevent forbidden symbols
      .slice(0, 90); // prevent project name from being too long
    const finalProjectName = `${username}-${projectName}`;

    summary.username = username;
    summary.email = email;
    summary.finalProjectName = finalProjectName;

    ora().succeed("Username: " + username);
    ora().succeed("Email: " + email);
    ora().succeed("Final Project Name (Sanity): " + finalProjectName);

    let sanityProjectId = "";
    // Check if NEXT_PUBLIC_SANITY_PROJECT_ID is already set
    const existingSanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (existingSanityProjectId) {
      const { createNewProject } = await inquirer.prompt({
        type: "confirm",
        name: "createNewProject",
        message:
          "A Sanity project is already created. Do you want to create a new project?",
        default: false,
      });
      if (!createNewProject) {
        ora().info("Using existing Sanity project ID.");
        sanityProjectId = existingSanityProjectId;
        summary.sanityProjectId = existingSanityProjectId;
        ora().info("Summary:");
        ora().info(JSON.stringify(summary, null, 2));
      }
    }

    if (!sanityProjectId) {
      const sanityProjectSpinner = ora("Creating Sanity project...").start();
      sanityProjectId = await createSanityProject(finalProjectName);
      sanityProjectSpinner.succeed("Sanity project created.");
    }

    if (sanityProjectId) {
      // Save new Sanity project ID to .env and update environment
      appendOrUpdateEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", sanityProjectId);
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = sanityProjectId;

      summary.sanityProjectId = sanityProjectId;
      ora().succeed("Sanity Project ID: " + sanityProjectId);

      const sanityReadTokenSpinner = ora(
        "Creating Sanity read token...",
      ).start();
      const sanityReadToken = await createSanityReadToken(sanityProjectId);
      appendOrUpdateEnv("NEXT_PUBLIC_READ_TOKEN", sanityReadToken);
      sanityReadTokenSpinner.succeed("Sanity read token created.");

      const vercelProjectSpinner = ora("Creating Vercel project...").start();
      const projectData = await createVercelProject({
        sanityReadToken: sanityReadToken || "",
        projectName: finalProjectName,
        sanityProjectId,
        sanityDatasetName: datasetName,
      });
      vercelProjectSpinner.succeed("Vercel project created.");

      if (projectData) {
        summary.projectName = projectData.projectName;
        summary.projectId = projectData.projectId;
        summary.deploymentUrl = projectData.deploymentUrl;
        summary.studioUrl = `${projectData.deploymentUrl}/studio`;
        summary.vercelUrl = `https://vercel.com/${selectedTeam.slug}/${projectData.projectName}`;
        summary.sanityUrl = `https://www.sanity.io/organizations/${selectedOrg.id}/project/${sanityProjectId}`;
        summary.datasetName = datasetName;
        summary.REPO_NAME = process.env.REPO_NAME;

        ora().succeed("Vercel Project Name: " + projectData.projectName);
        ora().succeed("Vercel Project ID: " + projectData.projectId);
        ora().succeed("Deployment URL: " + projectData.deploymentUrl);
        ora().succeed("Sanity Studio: " + summary.studioUrl);
        ora().succeed("Sanity Dataset Name: " + datasetName);
        ora().succeed("Repo Name: " + process.env.REPO_NAME);

        const localFlowSpinner = ora("Starting local flow...\n\n").start();
        const result = await localFlow({
          inputs: {
            "sanity-project-id": sanityProjectId,
            "sanity-dataset-name": datasetName,
            "vercel-project-id": projectData.projectId,
            "vercel-project-name": projectData.projectName,
            "vercel-deployment-url": projectData.deploymentUrl,
            email,
          },
          secrets: {
            VERCEL_FR_TEAM_ID: process.env.VERCEL_FR_TEAM_ID,
            VERCEL_PERSONAL_AUTH_TOKEN: process.env.VERCEL_PERSONAL_AUTH_TOKEN,
            SANITY_AUTH_TOKEN: process.env.SANITY_PERSONAL_AUTH_TOKEN,
            ROLL_OUT_API_TOKEN: process.env.ROLL_OUT_API_TOKEN,
            REPO_ID: process.env.REPO_ID,
            REPO_PROD_BRANCH: process.env.REPO_PROD_BRANCH,
            REPO_TYPE: process.env.REPO_TYPE,
          },
        });

        if (result === true) {
          localFlowSpinner.succeed("All steps were successful 🎉\n\n");

          return summary;
        } else {
          localFlowSpinner.fail("One of the steps was not successful 😿");
          ora().info(JSON.stringify(summary, null, 2));
          return null;
        }
      }
    } else {
      ora().fail("Failed to create Sanity project.");
      return null;
    }
  } catch (error) {
    ora().fail("An error occurred");
    console.error(error);
    ora().info(JSON.stringify(summary, null, 2));
  }
}
