import { loadEnvVariables } from "../utils/envs.mjs";

export async function getVercelTeams() {
  const envs = loadEnvVariables();
  const token = envs.VERCEL_PERSONAL_AUTH_TOKEN;

  const response = await fetch("https://api.vercel.com/v2/teams", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.log(response.status, response.statusText, await response.json());

    throw new Error(`❌ HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.teams) || data.teams.length === 0) {
    throw new Error("🚫 No teams found.");
  }

  return data.teams.map((team) => ({
    name: team.name,
    slug: team.slug,
    id: team.id,
  }));
}

export async function getVercelUserInfo() {
  const envs = loadEnvVariables();
  const token = envs.VERCEL_PERSONAL_AUTH_TOKEN;

  const response = await fetch("https://api.vercel.com/v2/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.log(response.status, response.statusText, await response.json());
    throw new Error(`❌ HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return {
    name: data.user.name,
    email: data.user.email,
    profileImage: data.user.profileImage,
  };
}

export async function createVercelProject({ projectName, sbParams }) {
  const { isPreview, spaceId, previewToken, whRevalidateSecret } = sbParams;
  const envs = loadEnvVariables();
  const repoName = envs.REPO_NAME;
  const vercelToken = envs.VERCEL_PERSONAL_AUTH_TOKEN;
  const repoId = envs.REPO_ID;
  const repoType = envs.REPO_TYPE;
  const repoProdBranch = envs.REPO_PROD_BRANCH;
  // const rollOutApiToken = envs.ROLL_OUT_API_TOKEN;
  const vercelTeamId = envs.VERCEL_TEAM_ID;

  const finalProjectName = `${projectName}${isPreview ? "-preview" : ""}`;

  const response = await fetch(
    `https://api.vercel.com/v10/projects?teamId=${vercelTeamId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vercelToken}`,
      },
      body: JSON.stringify({
        name: finalProjectName,
        environmentVariables: [
          {
            key: "NEXT_PUBLIC_URL",
            value: `https://${finalProjectName}.vercel.app`,
          },
          {
            key: "NEXT_PUBLIC_DOMAIN",
            value: `https://${finalProjectName}.vercel.app`,
          },
          {
            key: "NEXT_PUBLIC_API_GATE",
            value: "https://api.storyblok.com/v2/cdn",
          },
          {
            key: "NEXT_PUBLIC_IS_PREVIEW",
            value: isPreview ? "true" : "false",
          },
          {
            key: "NEXT_PUBLIC_SB_REGION",
            value: "EU",
          },
          {
            key: "SB_PREVIEW_TOKEN",
            value: previewToken,
          },
          {
            key: "SB_WEBHOOK_REVALIDATE_SECRET",
            value: whRevalidateSecret,
          },
          {
            key: "SB_SPACE_ID",
            value: spaceId + "",
          },
          {
            key: "REPO_ID",
            value: repoId,
          },
          {
            key: "REPO_TYPE",
            value: repoType,
          },
          {
            key: "REPO_PROD_BRANCH",
            value: repoProdBranch,
          },
          // {
          // key: "ROLL_OUT_API_TOKEN",
          // value: rollOutApiToken,
          // },
        ].map((v) => ({
          ...v,
          target: ["production", "preview", "development"],
          type: "encrypted",
        })),
        framework: "nextjs",
        gitRepository: {
          repo: repoName,
          type: "github",
        },
        buildCommand: "cd ../../ && turbo run build --filter=storyblok",
        rootDirectory: "apps/storyblok",
        publicSource: false,
        installCommand: "pnpm i",
      }),
    },
  );

  if (!response.ok) {
    console.log(response.status, response.statusText, await response.json());

    throw new Error(`❌ HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return {
    projectId: data.id,
    projectName: data.name,
    deploymentUrl: `https://${data.name}.vercel.app`,
  };
}

export async function getVercelProjects() {
  const envs = loadEnvVariables();
  const repoId = envs.REPO_ID;
  const vercelTeamId = envs.VERCEL_FR_TEAM_ID;
  const vercelToken = envs.VERCEL_PERSONAL_AUTH_TOKEN;

  const response = await fetch(
    `https://api.vercel.com/v9/projects?repoId=${repoId}&teamId=${vercelTeamId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vercelToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`❌ HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return data.projects;
}

export async function createProjectDeployment({ name, id }) {
  const envs = loadEnvVariables();
  const vercelTeamId = envs.VERCEL_TEAM_ID;
  const vercelToken = envs.VERCEL_PERSONAL_AUTH_TOKEN;
  const repoId = envs.REPO_ID;
  const repoProdBranch = envs.REPO_PROD_BRANCH;
  const repoType = envs.REPO_TYPE;

  const response = await fetch(
    `https://api.vercel.com/v13/deployments?teamId=${vercelTeamId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        project: id,
        target: "production",
        gitSource: {
          repoId,
          ref: repoProdBranch,
          type: repoType,
        },
      }),
    },
  );
  const data = await response.json();

  if (!response.ok) {
    console.log(response.status, response.statusText, data);

    throw new Error(`❌ HTTP error! Status: ${response.status}`);
  }

  return data;
}
