import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const useScrollBar = () => {
  // リサイズイベントを取得するためのフック
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // スクロール対象
  const scrollRef = useRef<HTMLDivElement>(null);
  // スクロールバーを表示するかどうか
  const isViewScrollBar = useMemo(() => {
    if (!scrollRef.current) return false;
    const firstChild = scrollRef.current.firstChild;
    if (!firstChild) return false;
    return (
      (scrollRef.current.firstChild as HTMLDivElement).offsetWidth > windowWidth
    );
  }, [scrollRef, windowWidth]);
  // スクロールできる最大値
  const maxScrollValue = useMemo(() => {
    if (!scrollRef.current) return 0;
    const scrollWidth = scrollRef.current.scrollWidth;
    const clientWidth = scrollRef.current.clientWidth;
    return scrollWidth - clientWidth;
  }, [scrollRef, windowWidth]);
  // スクロールバーの移動量管理
  const [scrollValue, innerSetScrollValue] = useState<number>(0);
  const setScrollValue = useCallback(
    (value: number) => {
      if (!scrollRef.current) return;
      // valueを0以上maxScrollValue以下に制限
      value = Math.max(Math.min(value, maxScrollValue), 0);
      // スクロールバーの移動量を更新
      innerSetScrollValue(value);
      scrollRef.current.scrollLeft = value;
    },
    [scrollRef, maxScrollValue],
  );

  return {
    isViewScrollBar,
    scrollRef,
    scrollValue,
    setScrollValue,
    maxScrollValue,
  };
};
