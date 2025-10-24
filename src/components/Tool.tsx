import React, { memo, useCallback, useEffect } from "react";
import { useGlobals, type API } from "storybook/manager-api";
import { IconButton } from "storybook/internal/components";
import { ADDON_ID, KEY, TOOL_ID } from "../constants";
import { ParagraphIcon } from "@storybook/icons";

export const Tool = memo(function MyAddonSelector({ api }: { api: API }) {
  const [globals, updateGlobals, storyGlobals] = useGlobals();

  const isLocked = KEY in storyGlobals;
  const isActive = !!globals[KEY];

  const toggle = useCallback(() => {
    updateGlobals({
      [KEY]: !isActive,
    });
  }, [isActive]);

  useEffect(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: "Inspect font [O]",
      defaultShortcut: ["O"],
      actionName: "Inspect font",
      showInMenu: false,
      action: toggle,
    });
  }, [toggle, api]);

  return (
    <IconButton
      key={TOOL_ID}
      active={isActive}
      disabled={isLocked}
      title="Enable font inspector"
      onClick={toggle}
    >
      <ParagraphIcon />
    </IconButton>
  );
});
