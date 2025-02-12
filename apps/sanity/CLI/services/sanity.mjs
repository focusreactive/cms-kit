import { execSync } from "child_process";

import { appendOrUpdateEnv, loadEnvVariables } from "../utils/envs.mjs";

export async function getSanityOrganizations() {
  const token = loadEnvVariables().SANITY_PERSONAL_AUTH_TOKEN;

  const response = await fetch(
    "https://api.sanity.io/v2021-06-07/organizations",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    console.log(response.status, response.statusText, await response.json());

    throw new Error(`❌ HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("🚫 No organizations found.");
  }

  return data.map((org) => ({
    name: org.name,
    slug: org.slug,
    id: org.id,
  }));
}

export async function getSanityUserInfo() {
  const token = loadEnvVariables().SANITY_PERSONAL_AUTH_TOKEN;

  const response = await fetch("https://api.sanity.io/v2021-06-07/users/me", {
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

  return await response.json();
}

export async function createSanityProject(displayName) {
  const envs = loadEnvVariables();
  const token = envs.SANITY_PERSONAL_AUTH_TOKEN;
  const organizationId = envs.SANITY_ORGANIZATION_ID;

  const response = await fetch("https://api.sanity.io/v2021-06-07/projects", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      displayName,
      organizationId,
    }),
  });

  if (response.status.toString().startsWith("4")) {
    throw new Error("Error createSanityProject");
  }

  const data = await response.json();

  appendOrUpdateEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", data.id);
}

export async function createSanityReadToken() {
  const envs = loadEnvVariables();
  const token = envs.SANITY_PERSONAL_AUTH_TOKEN;
  const projectId = envs.NEXT_PUBLIC_SANITY_PROJECT_ID;

  const response = await fetch(
    `https://api.sanity.io/v2021-06-07/projects/${projectId}/tokens`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: "Sanity preview read token",
        roleName: "viewer",
      }),
    },
  );

  if (response.status.toString().startsWith("4")) {
    throw new Error("Error createSanityReadToken");
  }

  const data = await response.json();

  appendOrUpdateEnv("NEXT_PUBLIC_SANITY_READ_TOKEN", data.key);
}

export async function createSanityCorsEntry(url) {
  const envs = loadEnvVariables();
  const token = envs.SANITY_PERSONAL_AUTH_TOKEN;
  const projectId = envs.NEXT_PUBLIC_SANITY_PROJECT_ID;

  const urls = [url, "http://localhost:3000/"];

  for (const origin of urls) {
    const response = await fetch(
      `https://api.sanity.io/v2021-06-07/projects/${projectId}/cors`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin,
          allowCredentials: true,
        }),
      },
    );

    if (response.status.toString().startsWith("4")) {
      throw new Error("Error createSanityCorsEntry");
    }
  }
}

export async function inviteUserToSanityProject(email) {
  const envs = loadEnvVariables();
  const token = envs.SANITY_PERSONAL_AUTH_TOKEN;
  const projectId = envs.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const response = await fetch(
    `https://api.sanity.io/v2021-06-07/invitations/project/${projectId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        role: "editor",
      }),
    },
  );

  if (response.status.toString().startsWith("4")) {
    throw new Error("Error inviteUserToSanityProject");
  }
}

export async function createSanityDataset() {
  const envs = loadEnvVariables();
  const token = envs.SANITY_PERSONAL_AUTH_TOKEN;
  const projectId = envs.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const datasetName = envs.NEXT_PUBLIC_SANITY_DATASET;

  const response = await fetch(
    `https://api.sanity.io/v2021-06-07/projects/${projectId}/datasets/${datasetName}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status.toString().startsWith("4")) {
    throw new Error("Error creating Sanity dataset");
  }
}

export async function fillSanityDataset() {
  const envs = loadEnvVariables();
  const datasetName = envs.NEXT_PUBLIC_SANITY_DATASET;

  execSync(
    `pnpm sanity dataset import src/generated/initial-data.tar.gz ${datasetName}`,
    {
      stdio: "ignore",
    },
  );
}
