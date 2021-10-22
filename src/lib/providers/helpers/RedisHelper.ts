import type { RedisProvider } from "#lib";

export class RedisHelper {
  /**
   * The redis provider.
   */
  private _provider: RedisProvider;

  /**
   * @param provider The redis provider.
   */
  public constructor(provider: RedisProvider) {
    this._provider = provider;
  }

  /**
   * Get the IORedis client.
   */
  public get client() {
    return this._provider.client;
  }
}
