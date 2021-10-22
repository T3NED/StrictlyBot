export class MissingEnvVariableError extends Error {
  /**
   * @param envVariable The missing env variable.
   */
  public constructor(envVariable: string) {
    super(`Missing environment variable: ${envVariable}`);
  }
}
