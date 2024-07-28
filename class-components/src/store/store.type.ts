export interface SearchState {
  searchTerm: string;
  selectedItemId: string | null;
  selectedItem: People | null;
  items: People[];
}

export interface People {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
}
