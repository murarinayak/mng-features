export interface IDragDropItem {
  label: string;
  value?: string;
  // IDs if this becomes a DropList
  dropListID?: string;
  connectedTo?: string;
  // State of expansion
  isExpanded?: boolean;
  expandedList?: Array<IDragDropItem>;
  isDragDisabled?: boolean;
  isSortingDisabled?: boolean;
  canToggle?: boolean;
  onToggle?: (opened: boolean, item: IDragDropItem) => void;
  // flyoutMenu
  data?: unknown;
}