export async function request(url: string) {
  const r = await fetch(url, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": csrfToken(),
    },
  });
  return await r.json();
}

function csrfToken() {
  return document
    .querySelector('meta[name="csrf-token"]')!
    .getAttribute("content")!;
}

