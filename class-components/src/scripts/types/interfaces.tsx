export interface SearchState {
  searchTerm: string;
}

export interface Item {
  name: string;
  description: string;
}

export interface BottomSectionState {
  items: Item[];
}

export interface SearchProps {
  onSearch: (searchTerm: string) => void;
}
