import { MissingEnvVariableError } from "#lib";

const requiredEnvVariables: string[] = [
  "NODE_ENV",

  "DISCORD_URI",
  "POSTGRESQL_URI",
  "REDIS_URI",

  "PREFIX"
];

// Ensure required env variable are loaded.
for (const rev of requiredEnvVariables) {
  if (typeof process.env[rev] !== "string") {
    throw new MissingEnvVariableError(rev);
  }
}

// Add augmentation for process.env.
declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: "prod" | "dev";
      DISCORD_URI: string;
      POSTGRESQL_URI: string;
      REDIS_URI: string;
      PREFIX: string;
    }
  }
}

export const isProd: boolean = process.env.NODE_ENV === "prod";
export const isDev: boolean = process.env.NODE_ENV === "dev";

export const uri = {
  discord: process.env.DISCORD_URI,
  postgresql: process.env.POSTGRESQL_URI,
  redis: process.env.REDIS_URI
};

export const prefix = process.env.PREFIX;
