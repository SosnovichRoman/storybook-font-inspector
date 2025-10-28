export const getTargetProperties = (target: HTMLElement) => {
  const compStyles = window.getComputedStyle(target);

  const fontSize = compStyles.getPropertyValue("font-size");
  const fontFamily = compStyles.getPropertyValue("font-family");
  const lineHeight = compStyles.getPropertyValue("line-height");
  const color = compStyles.getPropertyValue("color");
  const fontWeight = compStyles.getPropertyValue("font-weight");

  return { fontSize, fontWeight, lineHeight, color, fontFamily };
};
