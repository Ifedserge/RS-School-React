import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetPersonQuery } from '../../store/apiSlice';

const DetailSection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details');
  const { data, error, isLoading } = useGetPersonQuery(id || '');

  console.log('DetailSection rendered');
  console.log('Selected item:', data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (!data) return <p>No details available</p>;

  return (
    <div className='item-details'>
      <h2>{data.name}</h2>
      <p>Birth Year: {data.birth_year}</p>
      <p>Height: {data.height}</p>
      <p>Eye Color: {data.eye_color}</p>
      <p>Skin Color: {data.skin_color}</p>
    </div>
  );
};

export default DetailSection;
