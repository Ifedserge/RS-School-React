import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { unselectAll } from '../../store/searchSlice';
import { People } from './Flyout.type';
import './Flyout.css';

const Flyout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedItems = useSelector((state: RootState) => state.search.selectedItems);
  const items = useSelector((state: RootState) => state.search.items);

  const handleUnselectedAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    const selectedPeople = items.filter((item: People) => selectedItems.includes(item.url));
    const csvHeaders = ['Name', 'Details URL', 'Height', 'Eye color', 'Skin color'];
    const csvRows = [
      csvHeaders,
      ...selectedPeople.map((item) => [
        item.name,
        item.url,
        item.height,
        item.eye_color,
        item.skin_color,
      ]),
    ];
    const csvString = csvRows.map((row) => row.join(', ')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedItems.length}_person(s).csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='flout'>
      <p>{selectedItems.length} item(s) selected</p>
      <button onClick={handleUnselectedAll}>Unselect All</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
