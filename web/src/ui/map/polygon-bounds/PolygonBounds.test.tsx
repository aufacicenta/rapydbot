import { screen, render } from 'tests';

import { PolygonBounds } from './PolygonBounds';

describe('PolygonBounds', () => {
  it('renders children correctly', () => {
    render(
      <PolygonBounds>PolygonBounds</PolygonBounds>,
    );

    const element = screen.getByText('PolygonBounds');

    expect(element).toBeInTheDocument();
  });
});
