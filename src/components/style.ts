import { dedent } from "ts-dedent";

export const style = dedent/* css */ `

.font-inspector--panel {
  position: fixed;
  z-index: 1000;
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
  filter: drop-shadow(rgba(0, 0, 0, 0.1) 0px 1px 3px);
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
  border: 1px solid #cfcfcf;
}

.font-inspector--highlight {
  outline: 2px solid rgba(30, 167, 253, 1) !important;
}

`;
