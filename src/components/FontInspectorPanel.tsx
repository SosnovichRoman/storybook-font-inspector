import React, { useEffect, useState } from "react";

export default function FontInspectorPanel() {
  const [target, setTarget] = useState<HTMLElement | undefined>(undefined);

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

  const rect = target.getBoundingClientRect();
  const panelTop = rect.y + rect.height;
  const panelLeft = rect.x;

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

  pointer-events: all;
  width: 280px;
  background-color: white;
  font-size: 13px;
  line-height: 20px;
  border: 1px solid #cfcfcf;
}

.font-inspector--panel__row {
  padding: 10px 20px;
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
        <div className="font-inspector--panel">
          <div className="font-inspector--panel__row">
            <strong>Font size:</strong>
            <span>{fontSize}</span>
          </div>
          <div className="font-inspector--panel__row">
            <strong>Line height:</strong>
            <span>{lineHeight}</span>
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
