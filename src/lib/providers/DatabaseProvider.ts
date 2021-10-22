import { DatabaseHelper, DatabaseLog, config } from "#lib";
import { PrismaClient } from "@prisma/client";
import { performance } from "perf_hooks";

export class DatabaseProvider {
  /**
   * The PrismaClient instance.
   */
  public client: PrismaClient;

  /**
   * The database helper methods.
   */
  public helpers = new DatabaseHelper(this);

  public constructor() {
    const client = new PrismaClient({
      datasources: {
        db: {
          url: config.uri.postgresql
        }
      },
      errorFormat: "pretty",
      rejectOnNotFound: {
        findFirst: false,
        findUnique: false
      },
      log: [
        { level: "info", emit: "event" },
        { level: "warn", emit: "event" },
        { level: "error", emit: "event" }
      ]
    });

    client.$use(async (params, next) => {
      const startTime = performance.now();
      const result = await next(params);
      const timeTook = (performance.now() - startTime).toFixed(4);

      DatabaseLog.info(`Query ${params.model}.${params.action} took ${timeTook}ms`);

      return result;
    });

    client.$on("info", (data) => {
      DatabaseLog.info(data.message);
    });

    client.$on("warn", (data) => {
      DatabaseLog.warn(data.message);
    });

    client.$on("error", (data) => {
      DatabaseLog.error(data.message);
    });

    this.client = client;
    this.client.$connect();
  }
}

export const db = new DatabaseProvider();
