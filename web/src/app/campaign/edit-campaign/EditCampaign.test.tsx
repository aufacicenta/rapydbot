import { screen, render } from 'tests';

import { EditCampaign } from './EditCampaign';

describe('EditCampaign', () => {
  it('renders children correctly', () => {
    render(
      <EditCampaign>EditCampaign</EditCampaign>,
    );

    const element = screen.getByText('EditCampaign');

    expect(element).toBeInTheDocument();
  });
});
