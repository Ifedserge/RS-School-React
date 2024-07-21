import React, { useEffect, useState } from 'react';
import { People } from './DetailSection.type';

const DetailSection: React.FC<{ selectedItemId: string }> = ({ selectedItemId }) => {
  const [selectedItem, setSelectedItem] = useState<People | null>(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${selectedItemId}/`);
        const data = await response.json();
        setSelectedItem(data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    if (selectedItemId) {
      fetchItemDetails();
    }
  }, [selectedItemId]);

  if (!selectedItem) {
    return <p>Loading...</p>;
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
