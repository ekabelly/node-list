
export const randomNum = (min: number = 100, max: number = 2000) => Math.floor(Math.random() * (max - min) + min);

export const randomStr = (existingCollection?: Map<string, boolean>, max: number = 9): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < max; i++) {
    result += characters.charAt(randomNum(0, characters.length));
  }
  if (existingCollection?.has(result)) {
    return randomStr(existingCollection, max);
  }
  return result;
}
