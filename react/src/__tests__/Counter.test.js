import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../components/Counter';

describe('Counter Component', () => {
  test('renders with initial value', () => {
    render(<Counter />);
    expect(screen.getByText('Counter: 0')).toBeInTheDocument();
    expect(screen.getByText('Current value: 0')).toBeInTheDocument();
  });

  test('renders with custom initial value', () => {
    render(<Counter initialValue={5} />);
    expect(screen.getByText('Counter: 5')).toBeInTheDocument();
    expect(screen.getByText('Current value: 5')).toBeInTheDocument();
  });

  test('increments counter when increment button is clicked', () => {
    render(<Counter />);
    const incrementBtn = screen.getByTestId('increment-btn');
    
    fireEvent.click(incrementBtn);
    expect(screen.getByText('Counter: 1')).toBeInTheDocument();
    
    fireEvent.click(incrementBtn);
    expect(screen.getByText('Counter: 2')).toBeInTheDocument();
  });

  test('decrements counter when decrement button is clicked', () => {
    render(<Counter initialValue={5} />);
    const decrementBtn = screen.getByTestId('decrement-btn');
    
    fireEvent.click(decrementBtn);
    expect(screen.getByText('Counter: 4')).toBeInTheDocument();
    
    fireEvent.click(decrementBtn);
    expect(screen.getByText('Counter: 3')).toBeInTheDocument();
  });

  test('resets counter to initial value when reset button is clicked', () => {
    render(<Counter initialValue={10} />);
    const incrementBtn = screen.getByTestId('increment-btn');
    const resetBtn = screen.getByTestId('reset-btn');
    
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    expect(screen.getByText('Counter: 12')).toBeInTheDocument();
    
    fireEvent.click(resetBtn);
    expect(screen.getByText('Counter: 10')).toBeInTheDocument();
  });

  test('works with custom step value', () => {
    render(<Counter step={5} />);
    const incrementBtn = screen.getByTestId('increment-btn');
    const decrementBtn = screen.getByTestId('decrement-btn');
    
    fireEvent.click(incrementBtn);
    expect(screen.getByText('Counter: 5')).toBeInTheDocument();
    
    fireEvent.click(decrementBtn);
    expect(screen.getByText('Counter: 0')).toBeInTheDocument();
  });

  test('displays correct button labels with step value', () => {
    render(<Counter step={3} />);
    expect(screen.getByText('+ 3')).toBeInTheDocument();
    expect(screen.getByText('- 3')).toBeInTheDocument();
  });
});