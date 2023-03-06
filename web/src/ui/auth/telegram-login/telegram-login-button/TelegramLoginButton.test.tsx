import { screen, render } from 'tests';

import { TelegramLoginButton } from './TelegramLoginButton';

describe('TelegramLoginButton', () => {
  it('renders children correctly', () => {
    render(
      <TelegramLoginButton>TelegramLoginButton</TelegramLoginButton>,
    );

    const element = screen.getByText('TelegramLoginButton');

    expect(element).toBeInTheDocument();
  });
});
