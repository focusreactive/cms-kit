import { execSync } from "child_process";
import ora from "ora";

import {
  createStoryblokSpace,
  createStoryblokWebhook,
  updatePageComponentSectionsField,
  updateStoryblokSpace,
  uploadBackupStories,
} from "./services/storyblok.mjs";
import {
  createProjectDeployment,
  createVercelProject,
} from "./services/vercel.mjs";
import { modifyFile } from "./utils/file.mjs";
import { openUrlAndConfirm } from "./utils/open.mjs";
import {
  promptForProjectName,
  promptForToken,
  promptForVercelTeam,
} from "./utils/prompts.mjs";
import { colorText } from "./utils/styles.mjs";

const main = async () => {
  console.log(
    colorText("\nWelcome to the Storyblok Auto Rollout CLI Tool\n", "cyan"),
  );

  console.log(
    colorText("ℹ️  Configuration will be saved to .env.local", "yellow"),
  );

  try {
    const sbPersonalAccessToken = await promptForToken(
      "SB_PERSONAL_ACCESS_TOKEN",
    );
    await promptForToken("VERCEL_PERSONAL_AUTH_TOKEN");
    await promptForVercelTeam();
    const projectName = await promptForProjectName();

    // Create Storyblok space

    const spinner = ora("Creating Storyblok space ⏳").start();
    const { spaceId, previewToken } = await createStoryblokSpace(projectName);
    spinner.succeed(
      `Successfully created Storyblok space with ID: ${spaceId} ✅`,
    );

    // Open Storyblok space page and select plan

    await openUrlAndConfirm(
      `https://app.storyblok.com/me/spaces/${spaceId}/dashboard#/me/spaces/${spaceId}/dashboard`,
      spinner,
    );
    spinner.succeed("Storyblok space plan selected successfully");

    // Log in to storyblok CLI

    spinner.start("Logging in to storyblok CLI ⏳");
    const stdio = process.env.DEBUG ? "inherit" : "ignore";
    try {
      execSync("pnpm storyblok logout", {
        stdio,
      });
    } catch (error) {}

    execSync(`pnpm storyblok login --token ${sbPersonalAccessToken}`, {
      stdio,
    });
    spinner.succeed("Successfully logged in to storyblok CLI ✅");

    // Push components and stories to new space

    spinner.start("Start filling new space with data ⏳");
    execSync(`pnpm push-schemas ${spaceId}`, {
      stdio,
    });

    await updatePageComponentSectionsField(spaceId);
    await uploadBackupStories(spaceId);
    spinner.succeed("Successfully filled new space with data 🎉");

    // Create Vercel production and preview projects

    spinner.start("Creating Vercel production and preview projects ⏳");
    const whRevalidateSecret = crypto.randomUUID();
    const {
      deploymentUrl: productionDeploymentUrl,
      projectName: productionProjectName,
      projectId: productionProjectId,
    } = await createVercelProject({
      projectName,
      sbParams: {
        isPreview: false,
        spaceId,
        previewToken,
        whRevalidateSecret,
      },
    });

    const {
      deploymentUrl: previewDeploymentUrl,
      projectName: previewProjectName,
      projectId: previewProjectId,
    } = await createVercelProject({
      projectName,
      sbParams: {
        isPreview: true,
        spaceId,
        previewToken,
        whRevalidateSecret,
      },
    });
    spinner.succeed(
      "Successfully created Vercel production and preview projects 🎉",
    );

    // Update Storyblok space preview domain and revalidate webhook

    spinner.start("Updating Storyblok space with Vercel data⏳");
    await updateStoryblokSpace(spaceId, {
      domain: `${previewDeploymentUrl}/`,
    });
    await createStoryblokWebhook(
      spaceId,
      `${productionDeploymentUrl}/api/revalidate?secret=${whRevalidateSecret}`,
    );
    spinner.succeed("Storyblok space successfully updated ✅");

    // Create Vercel production and preview deployments

    spinner.start("Creating Vercel production and preview deployments ⏳");
    await createProjectDeployment({
      name: productionProjectName,
      id: productionProjectId,
    });
    await createProjectDeployment({
      name: previewProjectName,
      id: previewProjectId,
    });
    spinner.succeed(
      "Successfully created Vercel production and preview deployments 🎉",
    );

    spinner.start("Updating apps/storyblok/package.json ⏳");
    modifyFile("../package.json", "293915", spaceId);
    spinner.succeed("apps/storyblok/package.json updated ✅");

    spinner.start("Removing unrelated files and scripts ⏳");
    execSync("rm -rf ../../sanity", {
      stdio: "ignore",
    });

    spinner.succeed("Sanity folder removed ✅");

    console.log(
      colorText(
        "\nStoryblok project setup completed successfully! 🎉",
        "green",
      ),
    );
    console.log(
      colorText(
        "\nNow wait for production and preview deployments to finish, and use your new platform! ⏳",
        "green",
      ),
    );
    console.log(
      colorText("Storyblok dashboard:", "cyan"),
      colorText(
        `https://app.storyblok.com/me/spaces/${spaceId}/dashboard#/me/spaces/${spaceId}/dashboard`,
        "yellow",
      ),
    );
    console.log(
      colorText("Domain:", "cyan"),
      colorText(productionDeploymentUrl, "yellow"),
    );
  } catch (error) {
    console.log(error);
    console.error(colorText("Error :", "red"), error.message);
    process.exit(1);
  }
};

main().catch((error) => {
  console.error(colorText("Error:", "red"), error.message);
  process.exit(1);
});
