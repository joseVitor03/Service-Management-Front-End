import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FormLogin from '@/components/login/FormLogin/FormLogin';

// Crie um mock do useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({}),
}));
describe('Page', () => {
  it('renders a heading', () => {
    render(<FormLogin />);

    const inputEmail = screen.getByLabelText('Email:');

    expect(inputEmail).toBeInTheDocument();
  });
});
