import { screen, render } from 'tests';

import { GenericLoader } from './GenericLoader';

describe('GenericLoader', () => {
  it('renders children correctly', () => {
    render(
      <GenericLoader>GenericLoader</GenericLoader>,
    );

    const element = screen.getByText('GenericLoader');

    expect(element).toBeInTheDocument();
  });
});
