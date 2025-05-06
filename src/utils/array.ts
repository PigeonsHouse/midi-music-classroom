/**
 * 2つの配列が一致するか確認
 * Tはイコールで比較できるプリミティブな型のみしか許容しないので注意
 */
export const isMatchArrays = <T>(oneArray: T[], otherArray: T[]) =>
  oneArray.length === otherArray.length &&
  oneArray.every((item, index) => item === otherArray[index]);

/**
 * 配列からターゲットを削除した配列を非破壊的に取得する
 * ターゲットが配列になければ配列をそのまま返す
 * Tはイコールで比較できるプリミティブな型のみしか許容しないので注意
 */
export const removeTargetItem = <T>(array: T[], target: T) => {
  const index = array.indexOf(target);
  if (index === -1) return array;
  return array.toSpliced(index, 1);
};
