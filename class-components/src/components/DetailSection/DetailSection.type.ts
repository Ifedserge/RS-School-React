export interface Item {
  name: string;
  description: string;
  eyeColor?: string;
  height?: string;
  skinColor?: string;
  model?: string;
  climate?: string;
  diameter?: string;
}

export interface DetailSectionProps {
  item: Item;
  onClose: () => void;
}
