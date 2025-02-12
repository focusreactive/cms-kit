import ora from "ora";

export async function createSanityProject(projectName) {
  const spinner = ora("Start creating Sanity project...⏳").start();
  try {
    const response = await fetch("https://api.sanity.io/v2021-06-07/projects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SANITY_PERSONAL_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: projectName,
        organizationId: process.env.SANITY_ORGANIZATION_ID,
      }),
    });

    if (response.status.toString().startsWith("4")) {
      throw new Error("Error createSanityProject");
    }

    const data = await response.json();
    spinner.succeed("Sanity project created successfully! ✅");
    return data.id;
  } catch (error) {
    spinner.fail("Failed to create Sanity project.");
    console.warn(error);
  }
}

export async function createSanityReadToken(projectId) {
  const spinner = ora("Creating read token 🔑 for Sanity project...⏳").start();
  try {
    const response = await fetch(
      `https://api.sanity.io/v2021-06-07/projects/${projectId}/tokens`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SANITY_PERSONAL_AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: "sanity preview read token",
          roleName: "viewer",
        }),
      },
    );

    if (response.status.toString().startsWith("4")) {
      throw new Error("Error createSanityReadToken");
    }

    const data = await response.json();
    spinner.succeed("Sanity read token created successfully! ✅");
    return data.key;
  } catch (error) {
    spinner.fail("Failed to create Sanity read token.");
    console.warn(error);
  }
}

export async function createVercelProject({
  projectName,
  sanityProjectId,
  sanityDatasetName,
  sanityReadToken,
}) {
  const body = JSON.stringify({
    name: projectName,
    environmentVariables: [
      {
        key: "NEXT_PUBLIC_SANITY_PROJECT_ID",
        value: sanityProjectId,
      },
      {
        key: "NEXT_PUBLIC_SANITY_DATASET",
        value: sanityDatasetName,
      },
      {
        key: "NEXT_PUBLIC_READ_TOKEN",
        value: sanityReadToken,
      },
      {
        key: "SANITY_API_READ_TOKEN",
        value: sanityReadToken,
      },
      {
        key: "REPO_ID",
        value: process.env.REPO_ID,
      },
      {
        key: "REPO_PROD_BRANCH",
        value: process.env.REPO_PROD_BRANCH,
      },
      {
        key: "REPO_TYPE",
        value: "github",
      },
      {
        key: "VERCEL_PERSONAL_AUTH_TOKEN",
        value: process.env.VERCEL_PERSONAL_AUTH_TOKEN,
      },
      {
        key: "VERCEL_FR_TEAM_ID",
        value: process.env.VERCEL_FR_TEAM_ID,
      },
      {
        key: "ROLL_OUT_API_TOKEN",
        value: process.env.ROLL_OUT_API_TOKEN,
      },
      {
        key: "SANITY_STUDIO_URL",
        value: `https://${projectName}.vercel.app/studio`,
      },
      {
        key: "NEXT_PUBLIC_DOMAIN",
        value: `https://${projectName}.vercel.app`,
      },
    ].map((v) => ({
      ...v,
      target: ["production", "preview", "development"],
      type: "encrypted",
    })),
    framework: "nextjs",
    gitRepository: {
      repo: process.env.REPO_NAME,
      type: "github",
    },
    buildCommand: "cd ../../ && turbo run build --filter=sanity",
    rootDirectory: "apps/sanity",
    publicSource: false,
    installCommand: "pnpm i",
  });

  const spinner = ora("Start creating Vercel project...⏳").start();
  try {
    const response = await fetch(
      `https://api.vercel.com/v10/projects?teamId=${process.env.VERCEL_FR_TEAM_ID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_PERSONAL_AUTH_TOKEN}`,
        },
        method: "POST",
        body,
      },
    );

    if (response.status.toString().startsWith("4")) {
      spinner.fail("Failed to create Vercel project.");
      const message = await response.json();
      console.error(message);
      throw new Error("Error createVercelProject");
    }

    const data = await response.json();
    spinner.succeed("Vercel project created successfully! ✅");
    return {
      projectId: data.id,
      projectName: data.name,
      deploymentUrl: `https://${data.name}.vercel.app`,
    };
  } catch (error) {
    spinner.fail("Failed to create Vercel project.");
    console.warn(error);
  }
}

export async function getVercelProjects() {
  const spinner = ora("Fetching Vercel projects...⏳").start();
  try {
    const response = await fetch(
      `https://api.vercel.com/v9/projects?repoId=${process.env.REPO_ID}&teamId=${process.env.VERCEL_FR_TEAM_ID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_PERSONAL_AUTH_TOKEN}`,
        },
      },
    );

    if (response.status.toString().startsWith("4")) {
      spinner.fail("Failed to fetch Vercel projects.");
      console.error(response.status);
      throw new Error("Error getVercelProjects");
    }

    const data = await response.json();
    spinner.succeed("Vercel projects fetched successfully! ✅");
    return data.projects;
  } catch (error) {
    spinner.fail("Failed to fetch Vercel projects.");
    console.warn(error);
  }
}

export async function triggerGithubWorkflow({
  sanityProjectId,
  sanityDatasetName,
  vercelProjectId,
  vercelProjectName,
  vercelDeploymentUrl,
  email,
}) {
  const spinner = ora("Triggering GitHub workflow...⏳").start();
  try {
    const bodyData = {
      ref: process.env.REPO_PROD_BRANCH,
      inputs: {
        email: email,
        "sanity-project-id": sanityProjectId,
        "sanity-dataset-name": sanityDatasetName,
        "vercel-project-id": vercelProjectId,
        "vercel-project-name": vercelProjectName,
        "vercel-deployment-url": vercelDeploymentUrl,
      },
    };

    const response = await fetch(
      `https://api.github.com/repos/${process.env.REPO_NAME}/actions/workflows/${process.env.REPO_WORKFLOW_ID}/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      },
    );

    if (response.status.toString().startsWith("4")) {
      spinner.fail("Failed to trigger GitHub workflow.");
      throw new Error("Error triggering GitHub workflow");
    }

    spinner.succeed("GitHub workflow triggered successfully! ✅");
    return true;
  } catch (e) {
    spinner.fail("Failed to trigger GitHub workflow.");
    console.warn(e);
  }
}
