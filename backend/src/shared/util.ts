export function randomString(length = 16) {
  const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  let result = "";
  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * CHARACTERS.length);
    result += CHARACTERS[randomNum];
  }

  return result;
}
