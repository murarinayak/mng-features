import { IMenuItem } from 'mng-features/shared';

export interface IDragDropItem {
  label: string;
  value?: string;
  data?: unknown;
  // IDs if this becomes a DropList
  dropListID?: string;
  connectedTo?: Array<string>;
  // State of expansion
  isExpanded?: boolean;
  children?: Array<IDragDropItem>;
  isDragDisabled?: boolean;
  isSortingDisabled?: boolean;
  canToggle?: boolean;
  onToggle?: (opened: boolean, item: IDragDropItem) => void;
  // flyoutMenu
  actions?: Array<IMenuItem>;
}