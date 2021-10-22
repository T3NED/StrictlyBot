import { RedisLog, config } from "#lib";
import IORedis from "ioredis";

export class RedisProvider {
  /**
   * The IORedis instance.
   */
  public client: IORedis.Redis;

  public constructor() {
    this.client = new IORedis(config.uri.redis);

    this.client.on("connect", () => {
      RedisLog.info("Connected to redis");
    });

    this.client.on("error", (error) => {
      if (error.code === "ECONNREFUSED") this.client.disconnect(false);
      RedisLog.error(error);
    });
  }
}

export const redis = new RedisProvider();
