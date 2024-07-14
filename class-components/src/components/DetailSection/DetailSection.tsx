import React, { useEffect, useState } from 'react';
import { DetailSectionProps, Item } from './DetailSection.type';

const DetailsSection: React.FC<DetailSectionProps> = ({ item, onClose }) => {
  const [details, setDetails] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(item.url);
        const data = await response.json();
        setDetails({
          name: data.name,
          description: data.description,
          // Добавьте другие поля, необходимые для отображения деталей
        });
      } catch (error) {
        console.error('Error fetching item details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [item]);

  return (
    <div className='details-section'>
      <button onClick={onClose}>Close</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        details && (
          <div>
            <h2>{details.name}</h2>
            <p>{details.description}</p>
            {/* Добавьте отображение других полей */}
          </div>
        )
      )}
    </div>
  );
};

export default DetailsSection;
