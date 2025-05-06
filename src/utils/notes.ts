import { chordLabels, keyLabel } from "../definitions/keyLabel";
import { isMatchArrays, removeTargetItem } from "./array";

/**
 * 60がC4、67がG4、72がC5を示すような、絶対的な音階の数値
 */
type AbsoluteNoteNumber = number;
/**
 * 0がC、5がF、7がGを示すような、0~11の間の相対的な音階の数値
 */
type RelativeNoteNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/**
 * 58,60,64のようなNoteNumberを0~11の間に畳み込み、重複を省く
 */
const toRelative = (noteNumber: AbsoluteNoteNumber) =>
  (noteNumber % 12) as RelativeNoteNumber;

/**
 * 鳴らしている音の配列から一番低い音を取得する
 * 相対的な音からは取得できないので型で制限している
 */
const getRootNote = (notes: AbsoluteNoteNumber[]) =>
  Math.min(...notes) as AbsoluteNoteNumber;

/**
 * 2音の正の距離を取得する
 * 度数ではないので同じ音を渡すと0となる
 */
const getInterval = (
  targetNote: RelativeNoteNumber,
  rootNote: RelativeNoteNumber,
) => (targetNote - rootNote + 12) % 12;

/**
 * AbsoluteNoteNumberをRelativeNoteNumberに畳み込み、重複を省く
 */
export const clusteringNotes = (numbers: AbsoluteNoteNumber[]) => {
  return Array.from(new Set(numbers.map(toRelative)));
};

/**
 * 鳴らしている絶対的なnoteNumberの配列を渡すと、コード名を返す
 * 複数解釈できたら複数返す
 * @param absoluteNotes 鳴らしている音の配列
 * @param isHideInversion 転回形の分数表記を省略するか
 * @returns string[]
 */
export const getChords = (
  absoluteNotes: number[],
  isHideInversion: boolean,
) => {
  // 鳴らしている音で一番低い音
  const absoluteRootNote = getRootNote(absoluteNotes);
  const relativeRootNote = toRelative(absoluteRootNote);
  // 相対的な音に畳み込む
  const relativeNotes = clusteringNotes(absoluteNotes);

  // 解釈できたコードネーム
  const chords: string[] = [];

  // 三和音・四和音(転回形含む)の解釈
  // 構成音から一つ取り、ルートとしておく
  for (const tempRootNote of relativeNotes) {
    // ルートからのそれぞれの正の距離を取得する
    const targetIntervals = relativeNotes
      .map((note) => getInterval(note, tempRootNote))
      .sort((a, b) => a - b);

    // 存在するルートからの距離を、ループで回して一致するか確認
    chordLabels.map(({ intervals, name }) => {
      // 転回形かどうか
      const isInversion = relativeRootNote !== tempRootNote;
      if (
        isMatchArrays(targetIntervals, intervals) &&
        // augとdim7は転回形は解釈しない
        !((name === "aug" || name === "dim7") && isInversion)
      ) {
        // 転回形の表示
        const fractionName =
          isInversion && !isHideInversion
            ? `/${keyLabel.american[relativeRootNote]}`
            : "";
        chords.push(`${keyLabel.american[tempRootNote]}${name}${fractionName}`);
      }
    });
  }
  // 分数コード
  // 解釈できたコードがなく、ルート音の上がトライアドのみ(構成音が4種類)の場合、分数コードを解釈する
  if (chords.length === 0 && relativeNotes.length === 4) {
    // 鳴らしている音から一番低い音を除いた構成音
    const absoluteTopNotes = removeTargetItem(absoluteNotes, absoluteRootNote);
    // 上の和音の一番低い音の相対数値
    const secondRootNote = toRelative(getRootNote(absoluteTopNotes));
    // 相対的な音に畳み込む
    const topRelativeNotes = clusteringNotes(absoluteTopNotes);

    // 三和音(転回形含む)の解釈
    for (const topTempRootNote of topRelativeNotes) {
      // ルートからのそれぞれの正の距離を取得する
      const targetIntervals = topRelativeNotes
        .map((note) => getInterval(note, topTempRootNote))
        .sort((a, b) => a - b);

      // 存在するルートからの距離を、ループで回して一致するか確認
      chordLabels.map(({ intervals, name }) => {
        if (
          isMatchArrays(targetIntervals, intervals) &&
          // augとdim7は転回形は解釈しない
          !(name === "aug" && secondRootNote !== topTempRootNote)
        ) {
          // ルート音はsecondRootNoteではないのでisInversionは確認しない
          chords.push(
            `${keyLabel.american[topTempRootNote]}${name}/${keyLabel.american[relativeRootNote]}`,
          );
        }
      });
    }
  }
  return chords;
};
