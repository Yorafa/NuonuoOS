import { basename, dirname } from "path";
import { basicSetup } from "codemirror";
import { vim, Vim } from "@replit/codemirror-vim";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { memo, useEffect, useRef, useState } from "react";
import StyledVim from "components/apps/Vim/StyledVim";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import useFileDrop from "components/system/Files/FileManager/useFileDrop";
import useTitle from "components/system/Window/useTitle";
import { useFileSystem } from "contexts/fileSystem";
import { useProcesses } from "contexts/process";
import { DEFAULT_TEXT_FILE_SAVE_PATH } from "utils/constants";

const VimEditor: FC<ComponentProcessProps> = ({ id }) => {
  const {
    closeWithTransition,
    processes: { [id]: process },
  } = useProcesses();
  const { readFile, updateFolder, writeFile } = useFileSystem();
  const { prependFileToTitle } = useTitle(id);
  const { url = "" } = process || {};
  const editorElementRef = useRef<HTMLDivElement>(undefined);
  const editorViewRef = useRef<EditorView>(undefined);
  const dirtyRef = useRef(false);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState("Loading...");
  const [error, setError] = useState("");
  const fileDrop = useFileDrop({ id });

  useEffect(() => {
    let disposed = false;
    const saveUrl = url || DEFAULT_TEXT_FILE_SAVE_PATH;

    dirtyRef.current = false;
    setDirty(false);
    setError("");
    setStatus("Loading...");

    const setEditorDirty = (value: boolean): void => {
      dirtyRef.current = value;
      setDirty(value);
    };

    const save = async (content: string): Promise<boolean> => {
      if (disposed) return false;

      setStatus("Saving...");

      try {
        if (!(await writeFile(saveUrl, Buffer.from(content), true))) {
          throw new Error("Unable to save file.");
        }

        await updateFolder(dirname(saveUrl), basename(saveUrl));

        if (!disposed) {
          setEditorDirty(false);
          setStatus("Saved");
          prependFileToTitle(basename(saveUrl));
        }

        return true;
      } catch {
        if (!disposed) {
          setStatus("Save failed");
          setError("Unable to save this file.");
        }

        return false;
      }
    };

    const loadEditor = async (): Promise<void> => {
      try {
        const content = url ? (await readFile(saveUrl)).toString() : "";

        if (disposed || !editorElementRef.current) return;

        Vim.defineEx("write", "w", (cm) => {
          save(cm.getValue()).catch(() => false);
        });
        Vim.defineEx("quit", "q", (_cm, params) => {
          if (!dirtyRef.current || params.input.includes("!")) {
            closeWithTransition(id);
          } else {
            setStatus("No write since last change");
            setError("Use :q! to discard changes.");
          }
        });
        Vim.defineEx("wq", "wq", (cm) => {
          save(cm.getValue())
            .then((saved) => {
              if (saved) closeWithTransition(id);
            })
            .catch(() => false);
        });
        Vim.defineEx("xit", "x", (cm) => {
          const saveAndQuit = dirtyRef.current
            ? save(cm.getValue())
            : Promise.resolve(true);

          saveAndQuit
            .then((saved) => {
              if (saved) closeWithTransition(id);
            })
            .catch(() => false);
        });

        const view = new EditorView({
          parent: editorElementRef.current,
          state: EditorState.create({
            doc: content,
            extensions: [
              vim({ status: true }),
              basicSetup,
              EditorView.updateListener.of(({ docChanged }) => {
                if (docChanged && !disposed) {
                  setEditorDirty(true);
                  setStatus("Modified");
                  prependFileToTitle(basename(saveUrl), true);
                }
              }),
              EditorView.domEventHandlers({
                keydown: (event, currentView) => {
                  if (
                    (event.ctrlKey || event.metaKey) &&
                    event.key.toLowerCase() === "s"
                  ) {
                    event.preventDefault();
                    save(currentView.state.doc.toString()).catch(() => false);
                    return true;
                  }

                  return false;
                },
              }),
            ],
          }),
        });

        editorViewRef.current = view;
        view.focus();
        setStatus("Ready");
        prependFileToTitle(basename(saveUrl));
      } catch (loadError: unknown) {
        if (!disposed) {
          const message =
            loadError instanceof Error ? ` (${loadError.message})` : "";

          setStatus("Load failed");
          setError(`Unable to open this file.${message}`);
        }
      }
    };

    loadEditor().catch(() => false);

    return () => {
      disposed = true;
      editorViewRef.current?.destroy();
      editorViewRef.current = undefined;
    };
  }, [
    closeWithTransition,
    id,
    prependFileToTitle,
    readFile,
    updateFolder,
    url,
    writeFile,
  ]);

  return (
    <StyledVim>
      <div
        ref={(element) => {
          editorElementRef.current = element ?? undefined;
        }}
        aria-label="Vim editor"
        className="vim-editor"
        {...fileDrop}
      />
      <div aria-live="polite" className="vim-status">
        <span>{error || status}</span>
        <span>
          {dirty
            ? "Modified · :w save · :q! discard"
            : "Ctrl-S / :w save · :q quit"}
        </span>
      </div>
    </StyledVim>
  );
};

export default memo(VimEditor);
