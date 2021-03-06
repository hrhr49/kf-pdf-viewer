import {CSSProperties, memo} from 'react';

import {
  Outline,
} from 'react-pdf';

import {
  OutlineNode,
} from '../pdf';

const MemorizedOutline = memo(Outline);

interface SideBarProps {
  onItemClick: ({pageNumber}: {pageNumber: string}) => void;
  onLoadSuccess: (outline: OutlineNode[]) => void;
  isOpen: boolean;
}

const SideBarStyle: CSSProperties = {
  position: 'fixed',
  zIndex: 999,
};

const SideBar = ({
  onItemClick,
  onLoadSuccess,
  isOpen,
}: SideBarProps) => {
  return (
    <div
      style={{
        ...SideBarStyle,
        display: isOpen ? 'block' : 'none',
      }}
    >
      <MemorizedOutline
        onItemClick={onItemClick}
        onLoadSuccess={onLoadSuccess}
      />
    </div>
  );
};

export {
  SideBar,
};
