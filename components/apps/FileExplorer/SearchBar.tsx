import { basename, extname } from "path";
import { memo, useEffect, useRef, useState } from "react";
import { Search } from "components/apps/FileExplorer/NavigationIcons";
import StyledSearch from "components/apps/FileExplorer/StyledSearch";
import {
  getIconByFileExtension,
  getProcessByFileExtension,
  getShortcutInfo,
} from "components/system/Files/FileEntry/functions";
import { useFileSystem } from "contexts/fileSystem";
import { useMenu } from "contexts/menu";
import { type MenuItem } from "contexts/menu/useMenuContextState";
import { useProcesses } from "contexts/process";
import { useSession } from "contexts/session";
import { SHORTCUT_EXTENSION } from "utils/constants";
import { preloadLibs } from "utils/functions";
import {
  FILE_INDEX,
  SEARCH_INPUT_PROPS,
  SEARCH_LIB,
  useSearch,
} from "utils/search";

type SearchBarProps = {
  id: string;
};

const MAX_ENTRIES = 10;

const SearchBar: FCWithRef<HTMLInputElement, SearchBarProps> = ({
  id,
  ref: searchBarRef,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const hasUsedSearch = useRef(false);
  const {
    processes: {
      [id]: { url = "" },
    },
    open,
    url: changeUrl,
  } = useProcesses();
  const { contextMenu } = useMenu();
  const { lstat, readFile } = useFileSystem();
  const { updateRecentFiles } = useSession();
  const results = useSearch(searchTerm);

  useEffect(() => {
    const searchInput = searchBarRef?.current;

    if (!searchInput || !hasUsedSearch.current) return;

    const searchText = searchInput.value;
    const getItems = async (): Promise<MenuItem[]> => {
      const paths = [
        ...results.filter(({ ref: path }) => path.startsWith(url)),
        ...results.filter(({ ref: path }) => !path.startsWith(url)),
      ].slice(0, MAX_ENTRIES);

      return Promise.all(
        paths.map(async ({ ref: path }) => {
          const stats = await lstat(path);
          const isDirectory = stats.isDirectory();
          let pid = getProcessByFileExtension(extname(path));
          let targetUrl = path;

          if (isDirectory) {
            pid = "FileExplorer";
          } else if (extname(path) === SHORTCUT_EXTENSION) {
            const shortcut = getShortcutInfo(await readFile(path));

            pid = shortcut.pid;
            targetUrl = shortcut.url;
          }

          return {
            action: () => {
              if (isDirectory) {
                changeUrl(id, targetUrl);
              } else if (pid) {
                open(pid, { url: targetUrl });
                if (targetUrl) updateRecentFiles(targetUrl, pid);
              }
              searchInput.value = "";
              setSearchTerm("");
              searchInput.blur();
            },
            icon: getIconByFileExtension(extname(path)),
            label: basename(path, SHORTCUT_EXTENSION),
            tooltip: path,
          };
        })
      );
    };

    getItems()
      .then((items) => {
        if (searchInput.value !== searchText) return;

        const searchRect = searchInput.getBoundingClientRect();

        contextMenu?.(() => items).onContextMenuCapture(undefined, searchRect, {
          staticY: searchRect.y + searchRect.height,
        });
      })
      .catch(() => {
        // Ignore failure to complete search
      });
  }, [
    changeUrl,
    contextMenu,
    id,
    lstat,
    open,
    readFile,
    results,
    searchBarRef,
    updateRecentFiles,
    url,
  ]);

  useEffect(() => {
    const searchInput = searchBarRef?.current;

    if (searchInput) {
      searchInput.value = "";
      setSearchTerm("");
    }
    // eslint-disable-next-line react-hooks-addons/no-unused-deps
  }, [searchBarRef, url]);

  return (
    <StyledSearch>
      <input
        ref={searchBarRef}
        onChange={({ target }) => {
          hasUsedSearch.current = true;
          setSearchTerm(target.value);
        }}
        onFocus={() => preloadLibs([SEARCH_LIB, FILE_INDEX])}
        placeholder="Search"
        {...SEARCH_INPUT_PROPS}
      />
      <Search />
    </StyledSearch>
  );
};

export default memo(SearchBar);
