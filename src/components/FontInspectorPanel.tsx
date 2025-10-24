import React, { useEffect, useRef, useState } from "react";

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

  const compStyles = window.getComputedStyle(target);
  const fontSize = compStyles.getPropertyValue("font-size");
  const fontFamily = compStyles.getPropertyValue("font-family");
  const lineHeight = compStyles.getPropertyValue("line-height");
  const color = compStyles.getPropertyValue("color");
  const fontWeight = compStyles.getPropertyValue("font-weight");

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
      <style>
        {`
.font-inspector--wrapper {
  position: fixed;
  left: 0;
  right: 0;
  pointer-events: none;
  display: flex;
}

.font-inspector--wrapper__offset {
  flex-shrink: 1;
}

.font-inspector--panel {
  flex-shrink: 0;
  font-family:
    "Nunito Sans",
    -apple-system,
    ".SFNSText-Regular",
    "San Francisco",
    BlinkMacSystemFont,
    "Segoe UI",
    "Helvetica Neue",
    Helvetica,
    Arial,
    sans-serif;
  color: rgb(46, 52, 56);

  width: 280px;
  background-color: white;
  font-size: 12px;
  line-height: 16px;
  border: 1px solid #cfcfcf;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 4px;
}

.font-inspector--panel__row {
  padding: 8px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.font-inspector--panel__row:not(:last-child) {
  border-bottom: 1px solid #cfcfcf;
}

.font-inspector--color {
  display: flex;
  gap: 4px;
  align-items: center;
}

.font-inspector--color__preview {
  width: 12px;
  height: 12px;
}

.font-inspector--highlight {
  outline: 2px solid rgba(30, 167, 253, 1) !important;
}

      `}
      </style>
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
