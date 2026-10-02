// @vitest-environment jsdom

import { act, type ReactElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { ContentModal, OverflowMenu } from "../src/index.ts";

function rect(x: number, y: number, width: number, height: number): DOMRect {
  return new DOMRect(x, y, width, height);
}

function mount(node: ReactElement) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root: Root = createRoot(host);
  act(() => {
    root.render(node);
  });
  return {
    host,
    unmount() {
      act(() => root.unmount());
      host.remove();
    },
  };
}

function click(element: Element) {
  act(() => {
    element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

describe("OverflowMenu", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders nothing when there are no items", () => {
    expect(renderToStaticMarkup(<OverflowMenu items={[]} />)).toBe("");
  });

  it("renders a closed trigger and opens a portaled panel", () => {
    const closed = renderToStaticMarkup(
      <OverflowMenu
        ariaLabel="More deck actions"
        triggerLabel="More"
        items={[{ label: "Share", onClick: () => {} }]}
      />
    );
    expect(closed).toContain("pc-overflow-menu");
    expect(closed).toContain("pc-button pc-overflow-menu-trigger pc-overflow-menu-trigger--labeled");
    expect(closed).toContain('aria-label="More deck actions"');
    expect(closed).toContain('aria-expanded="false"');
    expect(closed).toContain('aria-haspopup="menu"');
    expect(closed).toContain("pc-overflow-menu-trigger-icon");
    expect(closed).toContain(">More<");
    expect(closed).not.toContain("pc-overflow-menu-panel");

    const onShare = viFn();
    const view = mount(
      <OverflowMenu
        align="right"
        items={[
          { label: "Share", onClick: onShare },
          { label: "Remove", onClick: () => {}, destructive: true },
          { label: "Locked", onClick: () => {}, disabled: true, title: "Unavailable" },
        ]}
      />
    );

    const trigger = view.host.querySelector("button");
    expect(trigger).toBeTruthy();
    click(trigger!);

    const panel = document.body.querySelector(".pc-overflow-menu-panel");
    expect(panel).toBeTruthy();
    expect(panel?.className).toContain("pc-overflow-menu-panel--floating");
    expect(panel?.getAttribute("role")).toBe("menu");
    expect(trigger?.getAttribute("aria-expanded")).toBe("true");
    expect(panel?.querySelectorAll('[role="menuitem"]').length).toBe(3);
    expect(panel?.innerHTML).toContain("pc-overflow-menu-item--destructive");
    expect(panel?.innerHTML).toContain("pc-overflow-menu-item--disabled");

    const share = [...(panel?.querySelectorAll("button") ?? [])].find((button) =>
      button.textContent?.includes("Share")
    );
    click(share!);
    expect(onShare.calls).toBe(1);
    expect(document.body.querySelector(".pc-overflow-menu-panel")).toBeNull();

    view.unmount();
  });

  it("places the panel above a right-aligned trigger when there is room", () => {
    window.innerWidth = 1200;
    window.innerHeight = 800;
    const original = HTMLElement.prototype.getBoundingClientRect;
    HTMLElement.prototype.getBoundingClientRect = function () {
      if (this instanceof HTMLButtonElement) return rect(300, 400, 40, 32);
      if (this.classList.contains("pc-overflow-menu-panel")) return rect(0, 0, 180, 90);
      return original.call(this);
    };

    const view = mount(
      <OverflowMenu align="right" items={[{ label: "Share", onClick: () => {} }]} />
    );
    try {
      click(view.host.querySelector("button")!);

      const panel = document.body.querySelector(".pc-overflow-menu-panel") as HTMLElement;
      expect(panel.style.top).toBe("304px");
      expect(panel.style.left).toBe("160px");
      expect(panel.style.visibility).toBe("visible");
    } finally {
      HTMLElement.prototype.getBoundingClientRect = original;
      view.unmount();
    }
  });

  it("places the panel below the trigger when the top edge is too close", () => {
    window.innerWidth = 1200;
    window.innerHeight = 800;
    const original = HTMLElement.prototype.getBoundingClientRect;
    HTMLElement.prototype.getBoundingClientRect = function () {
      if (this instanceof HTMLButtonElement) return rect(20, 10, 32, 32);
      if (this.classList.contains("pc-overflow-menu-panel")) return rect(0, 0, 180, 90);
      return original.call(this);
    };

    const view = mount(
      <OverflowMenu align="left" items={[{ label: "Share", onClick: () => {} }]} />
    );
    try {
      click(view.host.querySelector("button")!);

      const panel = document.body.querySelector(".pc-overflow-menu-panel") as HTMLElement;
      expect(panel.style.top).toBe("48px");
      expect(panel.style.left).toBe("20px");
    } finally {
      HTMLElement.prototype.getBoundingClientRect = original;
      view.unmount();
    }
  });

  it("closes on Escape and on an outside pointer down", () => {
    const view = mount(<OverflowMenu items={[{ label: "Share", onClick: () => {} }]} />);
    const trigger = view.host.querySelector("button")!;
    click(trigger);
    expect(document.body.querySelector(".pc-overflow-menu-panel")).toBeTruthy();

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    expect(document.body.querySelector(".pc-overflow-menu-panel")).toBeNull();

    click(trigger);
    expect(document.body.querySelector(".pc-overflow-menu-panel")).toBeTruthy();
    act(() => {
      document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(document.body.querySelector(".pc-overflow-menu-panel")).toBeNull();

    view.unmount();
  });

  it("uses a caller-supplied trigger icon", () => {
    const html = renderToStaticMarkup(
      <OverflowMenu
        triggerIcon={<span data-testid="custom-icon">*</span>}
        triggerClassName="extra-trigger"
        items={[{ label: "Share", onClick: () => {}, icon: <span>i</span> }]}
      />
    );
    expect(html).toContain('data-testid="custom-icon"');
    expect(html).toContain("extra-trigger");
    expect(html).not.toContain("pc-overflow-menu-trigger-icon");
  });
});

describe("ContentModal behavior", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("closes from Escape, the backdrop, and the title-bar close control", () => {
    const onClose = viFn();
    const view = mount(
      <ContentModal title="Create a deck" onClose={onClose}>
        <p>Name the deck</p>
      </ContentModal>
    );

    const dialog = document.body.querySelector('[role="dialog"]')!;
    click(dialog);
    expect(onClose.calls).toBe(0);

    click(dialog.querySelector("p")!);
    expect(onClose.calls).toBe(0);

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(onClose.calls).toBe(1);

    click(document.body.querySelector(".pc-overlay")!);
    expect(onClose.calls).toBe(2);

    click(dialog.querySelector('[aria-label="Close"]')!);
    expect(onClose.calls).toBe(3);

    view.unmount();
  });
});

function viFn() {
  const fn = () => {
    fn.calls += 1;
  };
  fn.calls = 0;
  return fn;
}
