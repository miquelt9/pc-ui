import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Badge,
  Button,
  Desktop,
  Field,
  Input,
  ContentModal,
  Modal,
  Progress,
  Split,
  Window,
} from "../src/index.ts";

describe("React primitives", () => {
  it("maps Button variant, active, and default type", () => {
    const primary = renderToStaticMarkup(<Button variant="primary">Save</Button>);
    expect(primary).toContain('class="pc-button pc-button--primary"');
    expect(primary).toContain('type="button"');
    expect(primary).toContain("Save");

    const active = renderToStaticMarkup(
      <Button active className="extra">
        Go
      </Button>
    );
    expect(active).toContain('class="pc-button active extra"');

    const submit = renderToStaticMarkup(<Button type="submit">Send</Button>);
    expect(submit).toContain('type="submit"');
  });

  it("maps Badge variants onto modifier classes", () => {
    expect(renderToStaticMarkup(<Badge>New</Badge>)).toContain('class="pc-badge"');
    expect(renderToStaticMarkup(<Badge variant="error">Fail</Badge>)).toContain(
      'class="pc-badge pc-badge--error"'
    );
    expect(renderToStaticMarkup(<Badge variant="success">Ok</Badge>)).toContain(
      "pc-badge--success"
    );
  });

  it("sets Desktop tiled layout and theme attribute", () => {
    expect(renderToStaticMarkup(<Desktop>home</Desktop>)).toBe(
      '<div class="pc-desktop">home</div>'
    );

    const dark = renderToStaticMarkup(
      <Desktop tiled theme="dark">
        home
      </Desktop>
    );
    expect(dark).toContain('class="pc-desktop pc-desktop--tiled"');
    expect(dark).toContain('data-pc-theme="dark"');

    expect(
      renderToStaticMarkup(
        <Desktop theme="system">
          home
        </Desktop>
      )
    ).toContain('data-pc-theme="system"');
  });

  it("sets Split direction and tile grow", () => {
    const html = renderToStaticMarkup(
      <Split direction="col" grow={2}>
        pane
      </Split>
    );
    expect(html).toContain('class="pc-split pc-split--col"');
    expect(html).toContain("--pc-tile-grow:2");
  });

  it("clamps Progress and exposes progressbar semantics", () => {
    const half = renderToStaticMarkup(<Progress value={25} max={50} />);
    expect(half).toContain('role="progressbar"');
    expect(half).toContain('aria-valuenow="25"');
    expect(half).toContain('aria-valuemin="0"');
    expect(half).toContain('aria-valuemax="50"');
    expect(half).toContain("width:50%");

    expect(renderToStaticMarkup(<Progress value={150} />)).toContain("width:100%");
    expect(renderToStaticMarkup(<Progress value={-10} />)).toContain("width:0%");
    expect(renderToStaticMarkup(<Progress variant="blocks" />)).toContain(
      "pc-progress--blocks"
    );
  });

  it("marks invalid fields and inputs", () => {
    const input = renderToStaticMarkup(<Input invalid placeholder="Name" />);
    expect(input).toContain("pc-input--error");
    expect(input).toContain('aria-invalid="true"');

    const field = renderToStaticMarkup(
      <Field label="Name" error="Required">
        <Input />
      </Field>
    );
    expect(field).toContain('class="pc-field-label"');
    expect(field).toContain("Name");
    expect(field).toContain('class="pc-field-error"');
    expect(field).toContain('role="alert"');
    expect(field).toContain("Required");
  });

  it("composes Window chrome classes", () => {
    const html = renderToStaticMarkup(
      <Window fill variant="dark" contentVariant="plain" title="Main" grow={3}>
        body
      </Window>
    );
    expect(html).toContain("pc-window pc-window--dark pc-window--fill");
    expect(html).toContain("pc-window-content pc-window-content--plain");
    expect(html).toContain("--pc-tile-grow:3");
    expect(html).toContain("Main");
    expect(html).toContain("body");
  });

  it("renders Modal only while open, with variant chrome", () => {
    expect(
      renderToStaticMarkup(
        <Modal open={false} title="Hidden">
          no
        </Modal>
      )
    ).toBe("");

    const html = renderToStaticMarkup(
      <Modal title="Delete" variant="danger" onConfirm={() => {}} onCancel={() => {}}>
        Sure?
      </Modal>
    );
    expect(html).toContain("pc-window--modal");
    expect(html).toContain("pc-window--modal-danger");
    expect(html).toContain("pc-modal-icon--danger");
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain("Delete");
    expect(html).toContain("Sure?");
    expect(html).toContain(">OK<");
    expect(html).toContain(">Cancel<");
  });

  it("renders ContentModal as a free-form window without confirm actions", () => {
    expect(
      renderToStaticMarkup(
        <ContentModal open={false} title="Hidden" onClose={() => {}}>
          no
        </ContentModal>
      )
    ).toBe("");

    const html = renderToStaticMarkup(
      <ContentModal title="Create a deck" onClose={() => {}} className="max-w-3xl">
        <p>Name</p>
      </ContentModal>
    );
    expect(html).toContain("pc-overlay pc-overlay--print-hidden");
    expect(html).toContain("pc-window pc-window--freeform max-w-3xl");
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain('aria-label="Create a deck"');
    expect(html).toContain("Create a deck");
    expect(html).toContain("Name");
    expect(html).not.toContain("pc-modal-actions");
    expect(html).not.toContain(">OK<");
  });
});
