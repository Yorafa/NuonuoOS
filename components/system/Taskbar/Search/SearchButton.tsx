import { memo, useCallback } from "react";
import { Search as SearchIcon } from "components/apps/FileExplorer/NavigationIcons";
import StyledTaskbarButton from "components/system/Taskbar/StyledTaskbarButton";
import {
  SEARCH_BUTTON_TITLE,
  importSearch,
} from "components/system/Taskbar/functions";
import useTaskbarContextMenu from "components/system/Taskbar/useTaskbarContextMenu";
import { DIV_BUTTON_PROPS } from "utils/constants";
import { label } from "utils/functions";
import { useMenuPreload } from "hooks/useMenuPreload";

type SearchButtonProps = {
  searchVisible: boolean;
  toggleSearch: (showMenu?: boolean) => void;
};

const SearchButton: FC<SearchButtonProps> = ({
  searchVisible,
  toggleSearch,
}) => {
  const onClick = useCallback(() => toggleSearch(), [toggleSearch]);

  return (
    <StyledTaskbarButton
      $active={searchVisible}
      $left={36}
      onClick={onClick}
      {...DIV_BUTTON_PROPS}
      {...label(SEARCH_BUTTON_TITLE)}
      {...useTaskbarContextMenu()}
      {...useMenuPreload(importSearch)}
    >
      <SearchIcon />
    </StyledTaskbarButton>
  );
};

export default memo(SearchButton);
