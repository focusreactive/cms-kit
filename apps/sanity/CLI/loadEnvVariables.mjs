import fs from "fs";

export function loadEnvVariables(envFilePath = ".env") {
  if (!fs.existsSync(envFilePath)) {
    console.log(`Environment file ${envFilePath} not found`);
    process.exit(1);
  }

  const envVars = fs
    .readFileSync(envFilePath, "utf-8")
    .split("\n")
    .filter((line) => line.trim() && !line.startsWith("#"))
    .reduce((env, line) => {
      const [key, value] = line.split("=");
      env[key.trim()] = value.trim();
      return env;
    }, {});

  // Set the loaded environment variables to process.env
  Object.assign(process.env, envVars);

  return envVars;
}

/// Helper function to append or update to .env file
export const appendOrUpdateEnv = (key, value) => {
  const envFilePath = ".env";
  const envContent = fs.existsSync(envFilePath)
    ? fs.readFileSync(envFilePath, "utf8")
    : "";
  const envLines = envContent.split("\n").filter((line) => line.trim() !== ""); // Remove empty lines

  const existingIndex = envLines.findIndex((line) =>
    line.startsWith(`${key}=`),
  );
  if (existingIndex >= 0) {
    envLines[existingIndex] = `${key}=${value}`;
  } else {
    envLines.push(`${key}=${value}`);
  }

  fs.writeFileSync(envFilePath, envLines.join("\n") + "\n");
};
