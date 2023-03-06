import { screen, render } from 'tests';

import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders children correctly', () => {
    render(
      <Navbar>Navbar</Navbar>,
    );

    const element = screen.getByText('Navbar');

    expect(element).toBeInTheDocument();
  });
});
