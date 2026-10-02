import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import * as api from "../src/index.ts";
import { repoRoot } from "./repo-root.ts";

const pkg = JSON.parse(readFileSync(join(repoRoot, "package.json"), "utf8")) as {
  exports: Record<string, string | Record<string, string>>;
};

/** Components documented for consumers in the README. */
const publicComponents = [
  "Desktop",
  "Workspace",
  "Split",
  "Window",
  "Button",
  "Input",
  "Select",
  "TextArea",
  "Field",
  "Checkbox",
  "Radio",
  "Badge",
  "Toast",
  "ToastContainer",
  "ToastActions",
  "Tabs",
  "TabList",
  "Tab",
  "TabPanel",
  "Progress",
  "Taskbar",
  "Overlay",
  "Modal",
  "ContentModal",
  "Menu",
  "MenuItem",
  "OverflowMenu",
  "Group",
  "StatusBar",
  "TitleBar",
] as const;

function exportTargets(value: string | Record<string, string>): string[] {
  if (typeof value === "string") return [value];
  return Object.values(value);
}

describe("package exports", () => {
  it("resolves every export target to a file on disk", () => {
    const targets = Object.values(pkg.exports).flatMap(exportTargets);
    expect(targets.length).toBeGreaterThan(0);

    for (const target of targets) {
      expect(target.startsWith("./"), target).toBe(true);
      expect(existsSync(join(repoRoot, target)), target).toBe(true);
    }
  });

  it("maps the CSS entry points at the source stylesheets", () => {
    expect(pkg.exports["./pc-ui.css"]).toBe("./src/pc-ui.css");
    expect(pkg.exports["./style.css"]).toBe("./src/pc-ui.css");
    expect(pkg.exports["./tokens.css"]).toBe("./src/tokens.css");
    expect(pkg.exports["./primitives.css"]).toBe("./src/primitives.css");
    expect(pkg.exports["."]).toEqual({
      types: "./dist/index.d.ts",
      import: "./dist/index.js",
    });
  });

  it("exports the documented React primitives", () => {
    const surface = api as Record<string, { displayName?: string }>;

    for (const name of publicComponents) {
      expect(surface[name], name).toBeTruthy();
      expect(surface[name].displayName, name).toBe(name);
    }
  });
});
