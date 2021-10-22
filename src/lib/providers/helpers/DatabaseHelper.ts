import type { DatabaseProvider } from "#lib";

export class DatabaseHelper {
  /**
   * The database provider.
   */
  private _provider: DatabaseProvider;

  /**
   * @param provider The database provider.
   */
  public constructor(provider: DatabaseProvider) {
    this._provider = provider;
  }

  /**
   * Get the prisma client.
   */
  public get client() {
    return this._provider.client;
  }
}
