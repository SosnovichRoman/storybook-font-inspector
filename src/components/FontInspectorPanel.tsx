import React, { useEffect, useRef, useState } from "react";
import { style } from "./style";
import { getTargetProperties } from "./utils";

export default function FontInspectorPanel() {
  const [target, setTarget] = useState<HTMLElement | undefined>(undefined);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleMouse = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return;
    e.target.classList.add("font-inspector--highlight");
    setTarget(e.target);
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

  if (!target) return null;

  const { fontSize, fontWeight, lineHeight, color, fontFamily } =
    getTargetProperties(target);

  const rect = target.getBoundingClientRect();
  let panelTop = rect.y + rect.height + 12; // 12 - offset
  const panelLeft = rect.x;
  const calculatedPanelHeight = panelRef.current
    ? panelRef.current.getBoundingClientRect().height
    : 0;

  if (panelTop + calculatedPanelHeight > document.documentElement.clientHeight)
    panelTop = rect.y - 12 - calculatedPanelHeight; // show panel at the top if panel out of viewport

  return (
    <>
      <style>{style}</style>
      <div
        className="font-inspector--wrapper"
        style={{
          top: panelTop + "px",
        }}
      >
        <div
          className="font-inspector--wrapper__offset"
          style={{ width: panelLeft + "px" }}
        ></div>
        <div ref={panelRef} className="font-inspector--panel">
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
      </div>
    </>
  );
}
