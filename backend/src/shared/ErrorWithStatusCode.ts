export class ErrorWithStatusCode extends Error {
  constructor(message: string, readonly statusCode: number) {
    super(message);
  }
}
