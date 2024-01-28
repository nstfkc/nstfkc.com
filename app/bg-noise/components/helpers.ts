export function generateRandomId(length: number = 6): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function arrayDiff<T>(arr1: T[], arr2: T[]): T | undefined {
  for (const x of arr1) {
    if (!arr2.includes(x)) {
      return x;
    }
  }
}
