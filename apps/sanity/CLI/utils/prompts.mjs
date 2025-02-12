import { execSync } from "child_process";
import inquirer from "inquirer";
import open from "open";

import { getSanityOrganizations } from "../services/sanity.mjs";
import { getVercelTeams } from "../services/vercel.mjs";
import { appendOrUpdateEnv, loadEnvVariables } from "./envs.mjs";
import { colorText } from "./styles.mjs";

const envReadableNames = {
  VERCEL_PERSONAL_AUTH_TOKEN: "Vercel access token",
  SANITY_PERSONAL_AUTH_TOKEN: "Sanity access token",
};

const newTokenPages = {
  VERCEL_PERSONAL_AUTH_TOKEN: "https://vercel.com/account/tokens",
};

export async function promptForToken(tokenName) {
  const env = loadEnvVariables();

  if (env[tokenName]) {
    const { useCurrent } = await inquirer.prompt({
      type: "confirm",
      name: "useCurrent",
      message: `${envReadableNames[tokenName]} is already set. Do you want to keep the current value?`,
      default: true,
    });

    if (useCurrent) {
      return env[tokenName];
    }
  }

  const { continue: shouldContinue } = await inquirer.prompt({
    type: "confirm",
    name: "continue",
    message: `Open ${envReadableNames[tokenName]} page in your browser?`,
    default: true,
  });

  if (shouldContinue) {
    await open(newTokenPages[tokenName]);
  }

  const { token } = await inquirer.prompt({
    type: "input",
    name: "token",
    message: `Enter ${envReadableNames[tokenName]}:`,
  });

  appendOrUpdateEnv(tokenName, token);

  return token;
}

export async function promptForSanityToken() {
  const envs = loadEnvVariables();
  const sanityToken = envs["SANITY_PERSONAL_AUTH_TOKEN"];

  if (sanityToken) {
    const { useCurrent } = await inquirer.prompt({
      type: "confirm",
      name: "useCurrent",
      message: `${envReadableNames["SANITY_PERSONAL_AUTH_TOKEN"]} is already set. Do you want to keep the current value?`,
      default: true,
    });

    if (useCurrent) {
      return sanityToken;
    }
  }

  console.log(colorText("\nSanity login\n", "dim"));

  execSync("pnpm sanity login", {
    stdio: "inherit",
  });

  const loggedUserData = execSync("pnpm sanity debug --secrets", {
    stdio: "pipe",
    encoding: "utf-8",
  });

  const sanityPersonalAuthToken = loggedUserData.match(
    /Auth token:[\s\S]*?'([^']+)'/,
  )?.[1];

  appendOrUpdateEnv("SANITY_PERSONAL_AUTH_TOKEN", sanityPersonalAuthToken);

  return sanityPersonalAuthToken;
}

export async function promptForVercelTeam() {
  const env = loadEnvVariables();

  if (env["VERCEL_TEAM_ID"]) {
    const { useCurrent } = await inquirer.prompt({
      type: "confirm",
      name: "useCurrent",
      message:
        "Vercel team is already set. Do you want to keep the current value?",
      default: true,
    });

    if (useCurrent) {
      return env["VERCEL_TEAM_ID"];
    }
  }

  const vercelTeams = await getVercelTeams();

  const { team } = await inquirer.prompt({
    type: "list",
    name: "team",
    message: "Select Vercel team with scope of the token:",
    choices: vercelTeams.map((team) => ({
      name: `${team.name} (${team.slug})`,
      value: team,
    })),
  });

  appendOrUpdateEnv("VERCEL_TEAM_ID", team.id);

  return team.id;
}

export async function promptForSanityOrganization() {
  const env = loadEnvVariables();

  const { isPersonal } = await inquirer.prompt({
    type: "confirm",
    name: "isPersonal",
    message: "Do you want to create project on your personal account?",
    default: true,
  });

  if (isPersonal) return;

  if (env["SANITY_ORGANIZATION_ID"]) {
    const { useCurrent } = await inquirer.prompt({
      type: "confirm",
      name: "useCurrent",
      message: `Sanity organization is already set. Do you want to keep the current value?`,
      default: true,
    });

    if (useCurrent) {
      return env["SANITY_ORGANIZATION_ID"];
    }
  }

  const sanityOrganizations = await getSanityOrganizations();

  const { organization } = await inquirer.prompt({
    type: "list",
    name: "organization",
    message: "Select Sanity organization:",
    choices: sanityOrganizations.map((org) => ({
      name: `${org.name} (${org.slug})`,
      value: org,
    })),
  });

  appendOrUpdateEnv("SANITY_ORGANIZATION_ID", organization.id);
}

export async function promptForProjectName() {
  const { projectName } = await inquirer.prompt({
    type: "input",
    name: "projectName",
    message: "Enter project name:",
    description:
      "Project names can be up to 100 characters long and must be lowercase. They can include letters, digits, and the following characters: '.', '_', '-'. However, they cannot contain the sequence '---'.",
    validate: (input) => {
      if (input.length > 100) {
        return "Project name must be 100 characters or less.";
      }
      if (!/^[a-z0-9._-]+$/.test(input)) {
        return "Project name can only contain lowercase letters, digits, '.', '_', or '-'.";
      }
      if (input.includes("---")) {
        return "Project name cannot contain the sequence '---'.";
      }
      return true;
    },
    default: "nextjs-sanity-fast",
  });

  const hash = Math.random().toString(36).substring(2, 7);

  return `${projectName}-${hash}`;
}

export async function promptForDatasetName() {
  const env = loadEnvVariables();

  if (env["NEXT_PUBLIC_SANITY_DATASET"]) {
    const { useCurrent } = await inquirer.prompt({
      type: "confirm",
      name: "useCurrent",
      message: `Dataset name is already set. Do you want to keep the current value?`,
      default: true,
    });

    if (useCurrent) return;
  }

  const { name } = await inquirer.prompt({
    type: "input",
    name: "name",
    message: `Enter dataset name:`,
    default: "production",
  });

  appendOrUpdateEnv("NEXT_PUBLIC_SANITY_DATASET", name);
}
