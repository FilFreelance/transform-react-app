import { render, screen } from '@testing-library/react';
import App from './App';

it("init base App", async () => {
  render(<App />);

  const titleElement = screen.getByText(/Basic TFL test app/i);
  expect(titleElement).toBeInTheDocument();
})
