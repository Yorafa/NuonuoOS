import { act, type RefObject } from "react";
import { createRoot } from "react-dom/client";
import useSelection, {
  type Selection,
} from "components/system/Files/FileManager/Selection/useSelection";

jest.mock("contexts/menu", () => ({
  useMenu: () => ({ menu: {}, setMenu: jest.fn() }),
}));

describe("useSelection", () => {
  const replaceFocusedEntries = jest.fn(
    (_entries: string[]): void => undefined
  );
  let container: HTMLDivElement;
  let containerRef: RefObject<HTMLDivElement | null> | undefined;
  let hookValues: Selection | undefined;
  let reactRoot: ReturnType<typeof createRoot>;
  let renderCount: number;

  const mockEntry = (index: number, left: number): void => {
    const element =
      container.querySelectorAll<HTMLElement>("[data-file]")[index];
    jest.spyOn(element, "getBoundingClientRect").mockReturnValue({
      bottom: 70,
      left: 10 + left,
      right: 10 + left + 50,
      top: 20,
    } as DOMRect);
  };

  const getContainerRef = (): RefObject<HTMLDivElement | null> => {
    if (!containerRef) throw new Error("Missing container ref");

    return containerRef;
  };

  const getHookValues = (): Selection => {
    if (!hookValues) throw new Error("Hook has not rendered");

    return hookValues;
  };

  const Harness = (): React.JSX.Element => {
    renderCount += 1;
    hookValues = useSelection(
      getContainerRef(),
      ["initial"],
      {
        blurEntry: jest.fn(),
        replaceFocusedEntries,
      },
      false
    );

    return (
      <div ref={getContainerRef()}>
        <div data-file="A.txt">A</div>
        <div data-file="B.txt">B</div>
        {getHookValues().isSelecting && (
          <span ref={getHookValues().selectionRef} data-testid="selection" />
        )}
      </div>
    );
  };

  const invokeMouse = (
    type: "mousedown" | "mousemove" | "mouseup",
    x: number,
    y: number
  ): void => {
    const handler =
      type === "mousedown"
        ? getHookValues().selectionEvents.onMouseDown
        : type === "mouseup"
          ? getHookValues().selectionEvents.onMouseUp
          : getHookValues().selectionEvents.onMouseMove;

    if (!handler) return;

    act(() => {
      handler({
        clientX: x,
        clientY: y,
        target: getContainerRef().current,
      } as unknown as React.MouseEvent<HTMLElement>);
    });
  };

  beforeEach(() => {
    (
      globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    renderCount = 0;
    replaceFocusedEntries.mockClear();
    container = document.createElement("div");
    document.body.append(container);
    containerRef = { current: container };
    reactRoot = createRoot(container);

    jest
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);

        return 0;
      });

    act(() => {
      reactRoot.render(<Harness />);
    });

    const renderedContainer = getContainerRef().current;
    if (!renderedContainer) throw new Error("Rendered container is missing");

    jest.spyOn(renderedContainer, "getBoundingClientRect").mockReturnValue({
      bottom: 220,
      left: 10,
      right: 210,
      top: 20,
    } as DOMRect);
    mockEntry(0, 0);
    mockEntry(1, 100);
  });

  afterEach(() => {
    act(() => reactRoot.unmount());
    container.remove();
    jest.restoreAllMocks();
  });

  test("updates selected entries and overlay without re-rendering every move", () => {
    const initialRenderCount = renderCount;

    invokeMouse("mousedown", 10, 20);
    const rendersAfterStart = renderCount;
    const selection = container.querySelector<HTMLSpanElement>(
      '[data-testid="selection"]'
    );

    invokeMouse("mousemove", 70, 80);
    invokeMouse("mousemove", 70, 80);
    invokeMouse("mousemove", 130, 80);

    expect(rendersAfterStart).toBe(initialRenderCount + 1);
    expect(renderCount).toBe(rendersAfterStart);
    expect(selection?.style.width).toBe("120px");

    invokeMouse("mouseup", 130, 80);

    expect(renderCount).toBe(rendersAfterStart + 1);
    expect(container.querySelector('[data-testid="selection"]')).toBeNull();
    expect(replaceFocusedEntries.mock.calls).toEqual([
      [["A.txt"]],
      [["A.txt", "B.txt"]],
    ]);
  });
});
