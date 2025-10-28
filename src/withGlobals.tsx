import type {
  Renderer,
  StoryContext,
  PartialStoryFn as StoryFunction,
} from "storybook/internal/types";
import { useEffect, useGlobals } from "storybook/preview-api";

import React from "react";
import { createRoot } from "react-dom/client";
import { KEY } from "./constants";
import FontInspectorPanel from "./components/FontInspectorPanel";

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
    if (myAddon && !isInDocs) {
      const rootDiv =
        canvas.querySelector(`[data-id="${KEY}"]`) ||
        canvas.appendChild(document.createElement("div"));
      rootDiv.setAttribute("data-id", KEY);
      const newRoot = createRoot(rootDiv);
      newRoot.render(<FontInspectorPanel />);

      return () => newRoot.unmount();
    }
  }, [myAddon, context, isInDocs]);

  return StoryFn();
};
