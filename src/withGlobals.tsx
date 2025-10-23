import type {
  Renderer,
  StoryContext,
  PartialStoryFn as StoryFunction,
} from "storybook/internal/types";
import { useEffect, useGlobals } from "storybook/preview-api";

import React from "react";
import { createRoot } from "react-dom/client";
import FontInspectorPanel from "./components/FontInspectorPanel";
import { KEY } from "./constants";

export const withGlobals = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>,
) => {
  const [globals] = useGlobals();
  const myAddon = globals[KEY];
  const canvas = context.canvasElement as ParentNode;

  // Is the addon being used in the docs panel
  const isInDocs = context.viewMode === "docs";

  useEffect(() => {
    if (!isInDocs) {
      addExtraContentToStory(canvas, {
        myAddon,
      });
    }
  }, [myAddon, isInDocs]);

  return StoryFn();
};

function addExtraContentToStory(
  canvas: ParentNode,
  state: { myAddon: boolean },
) {
  const rootDiv =
    canvas.querySelector(`[data-id="${KEY}"]`) ||
    canvas.appendChild(document.createElement("div"));

  rootDiv.setAttribute("data-id", KEY);

  const root = createRoot(rootDiv);

  if (state.myAddon === true) root.render(<FontInspectorPanel />);
  else root.unmount();
}
