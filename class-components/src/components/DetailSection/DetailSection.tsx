'use client';
import React from 'react';
import { useRouter } from 'next/router';
import { useGetPersonQuery } from '../../store/apiSlice';

const DetailSection: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useGetPersonQuery((id as string) || '');

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
