import { loadEnvVariables } from "../utils/envs.mjs";

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

  const data = await response.json();

  return {
    name: data.name,
    email: data.email,
    profileImage: data.profileImage,
  };
}
