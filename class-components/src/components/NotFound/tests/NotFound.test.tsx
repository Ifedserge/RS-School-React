import { render, screen } from '@testing-library/react';
import NotFound from '../NotFound';

describe('NotFount component', () => {
  it(`show 404`, () => {
    render(<NotFound />);
    expect(screen.getByText('404 - PAGE NOT FOUND')).toBeInTheDocument();
  });
});
