import fs from "fs";
import dotenv from "dotenv";

const envPaths = ["../.env", "../.env.local"];

export const loadEnvVariables = () => {
  let envVariables = {};

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const parsed = dotenv.parse(fs.readFileSync(envPath));
      envVariables = { ...envVariables, ...parsed };
    }
  }

  return envVariables;
};

export const appendOrUpdateEnv = (key, value, envPath = "../.env.local") => {
  let envContent = "";

  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, "utf8");
  }

  const envLines = envContent.split("\n");
  const existingLineIndex = envLines.findIndex((line) =>
    line.startsWith(`${key}=`),
  );

  if (existingLineIndex !== -1) {
    envLines[existingLineIndex] = `${key}=${value}`;
  } else {
    envLines.push(`${key}=${value}`);
  }

  fs.writeFileSync(envPath, envLines.join("\n"));
};

export const checkEnvVariables = (requiredVars) => {
  const loadedVars = loadEnvVariables();
  const missingVars = requiredVars.filter((varName) => !loadedVars[varName]);
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`,
    );
  }
};
