import ora from "ora";

import {
  createSanityCorsEntry,
  createSanityDataset,
  createSanityProject,
  createSanityReadToken,
  fillSanityDataset,
  getSanityUserInfo,
  //   inviteUserToSanityProject,
} from "./services/sanity.mjs";
import {
  createProjectDeployment,
  createVercelProject,
} from "./services/vercel.mjs";
import { loadEnvVariables } from "./utils/envs.mjs";
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
    await promptForSanityOrganization();
    await promptForToken("VERCEL_PERSONAL_AUTH_TOKEN");
    await promptForVercelTeam();

    const projectName = await promptForProjectName();
    await promptForDatasetName();

    const sanityUserInfo = await getSanityUserInfo();

    let spinner = ora("Creating Sanity project ⏳").start();
    await createSanityProject(projectName);
    spinner.succeed(`Successfully created Sanity project ✅`);

    spinner.start("Creating Vercel project ⏳");
    const { projectId: vercelProjectId, deploymentUrl } =
      await createVercelProject({
        projectName,
      });
    spinner.succeed("Vercel project created ✅");

    spinner.start("Creating Sanity read token ⏳");
    await createSanityReadToken();
    spinner.succeed("Sanity read token created ✅");

    spinner.start(`Creating Sanity CORS entries for ${deploymentUrl} ⏳`);
    await createSanityCorsEntry(deploymentUrl);
    spinner.succeed("Sanity CORS entries created ✅");

    // spinner.start("Inviting user to Sanity project ⏳");
    // await inviteUserToSanityProject(sanityUserInfo.email);
    // spinner.succeed("User invited to Sanity project ✅");

    spinner.start("Creating Sanity dataset ⏳");
    await createSanityDataset();
    spinner.succeed("Sanity dataset created ✅");

    spinner.start("Filling Sanity dataset with data ⏳");
    await fillSanityDataset();
    spinner.succeed("Sanity dataset filled with data ✅");

    spinner.start("Creating Vercel deployment ⏳");
    await createProjectDeployment({
      name: projectName,
      id: vercelProjectId,
    });
    spinner.succeed("Successfully created Vercel deployment ✅");

    if (!process.env.DEBUG) {
      spinner.start("Removing unrelated files ⏳");
      execSync("rm -rf ../../storyblok", {
        stdio: "ignore",
      });

      execSync("rm -rf ../src/generated/initial-data.tar.gz", {
        stdio: "ignore",
      });

      modifyJsonFile("../package.json", (contentJson) => {
        delete contentJson.scripts["update-dataset"];

        return contentJson;
      });

      execSync("git add -A && git commit -m 'Cleanup' && git push", {
        stdio: "ignore",
      });

      spinner.succeed("Unrelated files removed ✅");
    }

    console.log(
      colorText("\nSanity project setup completed successfully! 🎉", "green"),
    );
    console.log(
      colorText(
        "\nNow wait for deployment to finish, and use your new platform! ⏳",
        "green",
      ),
    );
    console.log(
      colorText("Domain:", "cyan"),
      colorText(deploymentUrl, "yellow"),
    );

    console.log(
      colorText("Sanity Studio:", "cyan"),
      colorText(`${deploymentUrl}/studio`, "yellow"),
    );

    const sanityProjectId = loadEnvVariables().NEXT_PUBLIC_SANITY_PROJECT_ID;
    console.log(
      colorText("Sanity dashboard:", "cyan"),
      colorText(
        `https://www.sanity.io/manage/project/${sanityProjectId}`,
        "yellow",
      ),
    );
  } catch (error) {
    console.log(error);
    console.error(colorText("Error :", "red"), error.message);
    process.exit(1);
  }
};

main();
