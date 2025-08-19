import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

describe('Button Components', () => {
  test('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByTestId('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies correct CSS classes for variants', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('btn', 'btn-secondary', 'btn-medium');
  });

  test('applies correct CSS classes for sizes', () => {
    render(<Button size="large">Large Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('btn', 'btn-primary', 'btn-large');
  });

  test('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByTestId('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn-disabled');
  });

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled</Button>);
    
    fireEvent.click(screen.getByTestId('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('applies default props correctly', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('btn', 'btn-primary', 'btn-medium');
    expect(button).not.toBeDisabled();
  });
});
