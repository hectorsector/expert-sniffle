import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchFilter from '../components/SearchFilter';

const mockItems = [
  { id: 1, name: 'Laptop', description: 'High-performance laptop for work', category: 'electronics' },
  { id: 2, name: 'Coffee Mug', description: 'Ceramic mug for hot beverages', category: 'kitchenware' },
  { id: 3, name: 'Running Shoes', description: 'Comfortable shoes for jogging', category: 'sports' },
  { id: 4, name: 'Smartphone', description: 'Latest model smartphone', category: 'electronics' },
  { id: 5, name: 'Yoga Mat', description: 'Non-slip yoga mat', category: 'sports' }
];

describe('SearchFilter Component', () => {
  test('renders with all items initially', () => {
    render(<SearchFilter items={mockItems} />);
    
    expect(screen.getByText('Search & Filter')).toBeInTheDocument();
    expect(screen.getByText('Showing 5 of 5 items')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Coffee Mug')).toBeInTheDocument();
    expect(screen.getByText('Running Shoes')).toBeInTheDocument();
  });

  test('filters items by search term', async () => {
    const user = userEvent.setup();
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'laptop');
    
    expect(screen.getByText('Showing 1 of 5 items')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.queryByText('Coffee Mug')).not.toBeInTheDocument();
  });

  test('filters items by description', async () => {
    const user = userEvent.setup();
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'comfortable');
    
    expect(screen.getByText('Showing 1 of 5 items')).toBeInTheDocument();
    expect(screen.getByText('Running Shoes')).toBeInTheDocument();
  });

  test('filters items by category', async () => {
    const user = userEvent.setup();
    render(<SearchFilter items={mockItems} />);
    
    const categorySelect = screen.getByTestId('category-select');
    await user.selectOptions(categorySelect, 'electronics');
    
    expect(screen.getByText('Showing 2 of 5 items')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Smartphone')).toBeInTheDocument();
    expect(screen.queryByText('Coffee Mug')).not.toBeInTheDocument();
  });

  test('combines search and category filters', async () => {
    const user = userEvent.setup();
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    const categorySelect = screen.getByTestId('category-select');
    
    await user.type(searchInput, 'shoes');
    await user.selectOptions(categorySelect, 'sports');
    
    expect(screen.getByText('Showing 1 of 5 items')).toBeInTheDocument();
    expect(screen.getByText('Running Shoes')).toBeInTheDocument();
  });

  test('shows no results message when no items match', async () => {
    const user = userEvent.setup();
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'nonexistent');
    
    expect(screen.getByText('Showing 0 of 5 items')).toBeInTheDocument();
    expect(screen.getByTestId('no-results')).toBeInTheDocument();
    expect(screen.getByText('No items match your criteria')).toBeInTheDocument();
  });

  test('clears filters when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    const categorySelect = screen.getByTestId('category-select');
    const clearButton = screen.getByTestId('clear-filters-btn');
    
    await user.type(searchInput, 'laptop');
    await user.selectOptions(categorySelect, 'electronics');
    
    expect(screen.getByText('Showing 1 of 5 items')).toBeInTheDocument();
    
    await user.click(clearButton);
    
    expect(searchInput).toHaveValue('');
    expect(categorySelect).toHaveValue('all');
    expect(screen.getByText('Showing 5 of 5 items')).toBeInTheDocument();
  });

  test('renders category options correctly', () => {
    render(<SearchFilter items={mockItems} />);
    
    const categorySelect = screen.getByTestId('category-select');
    expect(categorySelect).toHaveValue('all');
    
    // Check if all unique categories are present
    expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Electronics' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Kitchenware' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Sports' })).toBeInTheDocument();
  });

  test('calls onFilter callback when filters change', async () => {
    const mockOnFilter = jest.fn();
    const user = userEvent.setup();
    
    render(<SearchFilter items={mockItems} onFilter={mockOnFilter} />);
    
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'laptop');
    
    expect(mockOnFilter).toHaveBeenCalledWith([
      { id: 1, name: 'Laptop', description: 'High-performance laptop for work', category: 'electronics' }
    ]);
  });

  test('handles empty items array', () => {
    render(<SearchFilter items={[]} />);
    
    expect(screen.getByText('Showing 0 of 0 items')).toBeInTheDocument();
    expect(screen.queryByTestId('no-results')).not.toBeInTheDocument();
  });

  test('search is case insensitive', async () => {
    const user = userEvent.setup();
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'LAPTOP');
    
    expect(screen.getByText('Showing 1 of 5 items')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
  });
});