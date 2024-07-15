export interface SearchState {
  searchTerm: string;
}

export interface SearchProps {
  onSearch: (searchTerm: string) => void;
}
