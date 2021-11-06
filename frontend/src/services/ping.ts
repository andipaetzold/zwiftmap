export async function ping() {
  try {
    await fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "https://api.zwiftmap.com"
          : "http://localhost:3001"
      }/ping`
    );
  } catch {}
}
