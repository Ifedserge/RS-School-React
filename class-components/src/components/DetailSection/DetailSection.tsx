import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { People } from './DetailSection.type';

const DetailSection: React.FC = () => {
  const { selectedItem } = useOutletContext<{ selectedItem: People | null }>();

  if (!selectedItem) {
    return <p>No details available</p>;
  }

  return (
    <div className='item-details'>
      <h2>{selectedItem.name}</h2>
      <p>Birth Year: {selectedItem.birth_year}</p>
      <p>Height: {selectedItem.height}</p>
      <p>Eye Color: {selectedItem.eye_color}</p>
      <p>Skin Color: {selectedItem.skin_color}</p>
    </div>
  );
};

export default DetailSection;
