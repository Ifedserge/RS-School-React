import {
  Films,
  FilmProps,
  People,
  PeopleProps,
  Starships,
  StarshipsProps,
  ItemType,
  Species,
  SpeciesProps,
  Planets,
  PlanetProps,
  Item,
} from './BottomSection.type';

export function isItemPeople(item: ItemType): item is People {
  return (
    PeopleProps.birth_year in item &&
    PeopleProps.eye_color in item &&
    PeopleProps.height in item &&
    PeopleProps.skin_color in item
  );
}

export function isItemFilms(item: ItemType): item is Films {
  return FilmProps.opening_crawl in item && FilmProps.title in item;
}

export function isItemStarship(item: ItemType): item is Starships {
  return StarshipsProps.model in item;
}

export function isItemSpecies(item: ItemType): item is Species {
  return SpeciesProps.classsification in item;
}

export function isItemPlanets(item: ItemType): item is Planets {
  return PlanetProps.climate in item && PlanetProps.diameter in item;
}

export function formatPeople(item: People): Item {
  return {
    name: `Name: ${item.name}`,
    description: `Birth Year: ${item.birth_year}`,
    height: `Height: ${item.height}`,
    eyeColor: `Eye color: ${item.eye_color}`,
    skinColor: `Skin color: ${item.skin_color}`,
  };
}

export function formatFilms(item: Films): Item {
  return {
    name: `Movie title: ${item.title}`,
    description: `Opening Crawl: ${item.opening_crawl}`,
  };
}

export function formatStarship(item: Starships): Item {
  return {
    name: `Name: ${item.name}`,
    description: `Model: ${item.model}`,
  };
}

export function formatSpecies(item: Species): Item {
  return {
    name: `Name: ${item.name}`,
    description: `Classification: ${item.clasification}`,
  };
}

export function formatPlanets(item: Planets): Item {
  return {
    name: `Planet: ${item.name}`,
    description: `Climate: ${item.climate}`,
    diameter: `Diameter: ${item.diameter}`,
  };
}
