export type RequestFn = <T = unknown>(
  input: RequestInfo,
  init?: RequestInit,
) => Promise<T>;

export const request: RequestFn = async (
  input: RequestInfo,
  init?: RequestInit,
) => {
  const response = await fetch(input, init);
  if (response.ok) {
    if (response.status === 204) {
      return undefined;
    } else {
      const contentType =
        response.headers.get("content-type")?.split(";")[0] ?? "";
      if (["application/json", "application/geo+json"].includes(contentType)) {
        return await response.json();
      } else if (contentType?.startsWith("text/")) {
        return await response.text();
      } else if (contentType?.startsWith("image/")) {
        return await response.blob();
      }
      return undefined;
    }
  } else {
    throw new ErrorWithStatus(response.statusText, response.status);
  }
};

export class ErrorWithStatus extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}
