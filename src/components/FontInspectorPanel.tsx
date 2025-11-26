import React, { useEffect, useRef, useState } from "react";
import { style } from "./style";
import { getTargetProperties } from "./utils";

export default function FontInspectorPanel() {
  const [target, setTarget] = useState<HTMLElement | undefined>(undefined);
  const [shouldAvoidCorner, setShouldAvoidCorner] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleMouse = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return;
    e.target.classList.add("font-inspector--highlight");
    setTarget(e.target);
  };

  const handleCornerTracking = (e: MouseEvent) => {
    const panelRect = panelRef.current?.getBoundingClientRect();
    const thresholdX = (panelRect?.width ?? 0) + 48;
    const thresholdY = (panelRect?.height ?? 0) + 48;
    const viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const distanceToRight = viewportWidth - e.clientX;
    const distanceToBottom = viewportHeight - e.clientY;
    const isCornerCrowded =
      distanceToRight < thresholdX && distanceToBottom < thresholdY;
    setShouldAvoidCorner(isCornerCrowded);
  };

  const clearHighlight = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return;
    e.target.classList.remove("font-inspector--highlight");
  };

  useEffect(() => {
    document.addEventListener("mouseover", handleMouse);
    return () => document.removeEventListener("mouseover", handleMouse);
  }, []);

  useEffect(() => {
    document.addEventListener("mouseout", clearHighlight);
    return () => document.removeEventListener("mouseout", clearHighlight);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleCornerTracking);
    return () =>
      document.removeEventListener("mousemove", handleCornerTracking);
  }, []);

  if (!target) return null;

  const { fontSize, fontWeight, lineHeight, color, fontFamily } =
    getTargetProperties(target);

  return (
    <>
      <style>{style}</style>

      <div
        ref={panelRef}
        className="font-inspector--panel"
        style={{
          top: shouldAvoidCorner ? "24px" : undefined,
          bottom: shouldAvoidCorner ? undefined : "24px",
          right: shouldAvoidCorner ? undefined : "24px",
          left: shouldAvoidCorner ? "24px" : undefined,
          justifyContent: "flex-end",
        }}
      >
        <div className="font-inspector--panel__row">
          <strong>Font size:</strong>
          <span>{fontSize}</span>
        </div>
        <div className="font-inspector--panel__row">
          <strong>Line height:</strong>
          <span>{lineHeight}</span>
        </div>
        <div className="font-inspector--panel__row">
          <strong>Font weight:</strong>
          <span>{fontWeight}</span>
        </div>
        <div className="font-inspector--panel__row">
          <strong>Color:</strong>
          <div className="font-inspector--color">
            <div
              className="font-inspector--color__preview"
              style={{ backgroundColor: color }}
            ></div>
            <div>{color}</div>
          </div>
        </div>
        <div className="font-inspector--panel__row">
          <strong>Font family:</strong>
          <span>{fontFamily}</span>
        </div>
      </div>
    </>
  );
}
