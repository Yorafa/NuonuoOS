import { basename, extname } from "path";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import StyledSearch from "components/system/Taskbar/Search/StyledSearch";
import {
  getProcessByFileExtension,
  getShortcutInfo,
} from "components/system/Files/FileEntry/functions";
import {
  maybeCloseTaskbarMenu,
  SEARCH_BUTTON_TITLE,
} from "components/system/Taskbar/functions";
import { useFileSystem } from "contexts/fileSystem";
import { useProcesses } from "contexts/process";
import { useSession } from "contexts/session";
import { SHORTCUT_EXTENSION, PREVENT_SCROLL } from "utils/constants";
import { SEARCH_INPUT_PROPS, useSearch } from "utils/search";

type SearchProps = {
  toggleSearch: (showMenu?: boolean) => void;
};

const MAX_RESULTS = 12;

const Search: FC<SearchProps> = ({ toggleSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const results = useSearch(searchTerm).slice(0, MAX_RESULTS);
  const { lstat, readFile } = useFileSystem();
  const { open } = useProcesses();
  const { updateRecentFiles } = useSession();

  useEffect(() => {
    inputRef.current?.focus(PREVENT_SCROLL);
  }, []);

  const openResult = useCallback(
    async (path: string): Promise<void> => {
      let pid = getProcessByFileExtension(extname(path));
      let url = path;

      try {
        if ((await lstat(path)).isDirectory()) {
          toggleSearch(false);
          open("FileExplorer", { url: path });
          return;
        }
      } catch {
        // Continue with file-extension handling when metadata is unavailable.
      }

      if (extname(path) === SHORTCUT_EXTENSION) {
        const shortcut = getShortcutInfo(await readFile(path));

        pid = shortcut.pid;
        url = shortcut.url;
      }

      toggleSearch(false);

      if (pid) {
        open(pid, { url });
        if (url) updateRecentFiles(url, pid);
      } else {
        open("OpenWith", { url: path });
      }
    },
    [lstat, open, readFile, toggleSearch, updateRecentFiles]
  );

  const onKeyDown: React.KeyboardEventHandler<HTMLElement> = useCallback(
    (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        toggleSearch(false);
      } else if (event.key === "Enter" && results[0]) {
        event.preventDefault();
        openResult(results[0].ref).catch(() => false);
      }
    },
    [openResult, results, toggleSearch]
  );

  return (
    <StyledSearch
      ref={panelRef}
      aria-label="Full-text search"
      id="searchMenu"
      onBlurCapture={(event) =>
        maybeCloseTaskbarMenu(
          event,
          panelRef.current,
          toggleSearch,
          inputRef.current,
          SEARCH_BUTTON_TITLE,
          true
        )
      }
      onKeyDown={onKeyDown}
    >
      <input
        ref={inputRef}
        onChange={({ target }) => setSearchTerm(target.value)}
        placeholder="Type here to search"
        {...SEARCH_INPUT_PROPS}
      />
      <div className="results">
        {searchTerm && results.length === 0 && (
          <div className="empty">No matching files</div>
        )}
        {!searchTerm && <div className="empty">Type to search all files</div>}
        {results.map(({ ref }) => {
          const path = ref;

          return (
            <button
              key={path}
              className="result"
              onClick={() => openResult(path).catch(() => false)}
              title={path}
              type="button"
            >
              <span className="result-title">{basename(path)}</span>
              <span className="result-path">{path}</span>
            </button>
          );
        })}
      </div>
    </StyledSearch>
  );
};

export default memo(Search);
