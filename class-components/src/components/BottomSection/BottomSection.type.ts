import { apiLink } from '../../api/api';
export interface SearchState {
  searchTerm: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiError {
  detail: string;
}

export interface Item {
  name: string;
  description: string;
  eyeColor?: string;
  height?: string;
  skinColor?: string;
  model?: string;
  climate?: string;
  diameter?: string;
  url: string;
}

export interface BottomSectionState {
  items: Item[];
  error: boolean;
}

export interface People {
  name: string;
  birth_year: string;
  skin_color: string;
  height: string;
  eye_color: string;
  url: string;
}

export interface Films {
  title: string;
  opening_crawl: string;
}

export interface Starships {
  name: string;
  model: string;
}
export interface Vehicles {
  name: string;
  model: string;
}

export interface Species {
  name: string;
  clasification: string;
}

export interface Planets {
  name: string;
  climate: string;
  diameter: string;
}

export enum ApiLink {
  People = `${apiLink}/people/`,
  Films = `${apiLink}/films/`,
  Starships = `${apiLink}/starships/`,
  Vehicles = `${apiLink}/vehicles/`,
  Species = `${apiLink}/species/`,
  Planets = `${apiLink}/planets/`,
}

export type ItemType = People | Films | Starships | Species | Planets;

export enum PeopleProps {
  birth_year = 'birth_year',
  skin_color = 'skin_color',
  height = 'height',
  eye_color = 'eye_color',
}

export enum FilmProps {
  opening_crawl = 'opening_crawl',
  title = 'title',
}

export enum StarshipsProps {
  model = 'model',
}

export enum SpeciesProps {
  classsification = 'classification',
}

export enum PlanetProps {
  climate = 'climate',
  diameter = 'diameter',
}
