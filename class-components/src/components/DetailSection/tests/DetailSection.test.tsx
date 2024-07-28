import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { useGetPersonQuery } from '../../../store/apiSlice';
import DetailSection from '../DetailSection';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

jest.mock('../../../store/apiSlice', () => ({
  useGetPersonQuery: jest.fn(),
}));

describe('DetailSection', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render loading state', () => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('?details=1')]);
    (useGetPersonQuery as jest.Mock).mockReturnValue({ data: null, error: false, isLoading: true });

    render(<DetailSection />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error state', () => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('?details=1')]);
    (useGetPersonQuery as jest.Mock).mockReturnValue({ data: null, error: true, isLoading: false });

    render(<DetailSection />);
    expect(screen.getByText('Error loading data')).toBeInTheDocument();
  });

  it('should render no details available state', () => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('?details=1')]);
    (useGetPersonQuery as jest.Mock).mockReturnValue({
      data: null,
      error: false,
      isLoading: false,
    });

    render(<DetailSection />);
    expect(screen.getByText('No details available')).toBeInTheDocument();
  });

  it('should render person details', () => {
    const personData = {
      name: 'Luke Skywalker',
      birth_year: '19BBY',
      height: '172',
      eye_color: 'blue',
      skin_color: 'fair',
    };
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('?details=1')]);
    (useGetPersonQuery as jest.Mock).mockReturnValue({
      data: personData,
      error: false,
      isLoading: false,
    });

    render(<DetailSection />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Eye Color: blue')).toBeInTheDocument();
    expect(screen.getByText('Skin Color: fair')).toBeInTheDocument();
  });
});
