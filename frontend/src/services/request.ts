export type RequestFn = <T = any>(input: RequestInfo, init?: RequestInit) => Promise<T>;

export const request: RequestFn = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<any> => {
  const response = await fetch(input, init);
  if (response.ok) {
    return await response.json();
  } else {
    throw new ErrorWithStatus(response.statusText, response.status);
  }
};

export class ErrorWithStatus extends Error {
  public constructor(message: string, public readonly status: number) {
    super(message);
  }
}
