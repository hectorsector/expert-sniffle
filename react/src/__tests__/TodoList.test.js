import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders empty todo list initially', () => {
    render(<TodoList />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
  });

  test('adds a new todo when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    await user.type(input, 'Buy groceries');
    await user.click(addButton);
    
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.queryByText('No todos yet. Add one above!')).not.toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  test('adds a new todo when Enter is pressed', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    
    await user.type(input, 'Walk the dog{enter}');
    
    expect(screen.getByText('Walk the dog')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  test('does not add empty todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const addButton = screen.getByTestId('add-button');
    
    await user.click(addButton);
    
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
  });

  test('trims whitespace from todo text', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    await user.type(input, '   Clean room   ');
    await user.click(addButton);
    
    expect(screen.getByText('Clean room')).toBeInTheDocument();
  });

  test('deletes todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    await user.type(input, 'Task to delete');
    await user.click(addButton);
    
    expect(screen.getByText('Task to delete')).toBeInTheDocument();
    
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    await user.click(deleteButton);
    
    expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
  });

  test('toggles todo completion when text is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    await user.type(input, 'Task to complete');
    await user.click(addButton);
    
    const todoText = screen.getByText('Task to complete');
    expect(todoText).toHaveStyle('text-decoration: none');
    
    await user.click(todoText);
    expect(todoText).toHaveStyle('text-decoration: line-through');
    
    await user.click(todoText);
    expect(todoText).toHaveStyle('text-decoration: none');
  });

  test('handles multiple todos correctly', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    await user.type(input, 'First todo');
    await user.click(addButton);
    
    await user.type(input, 'Second todo');
    await user.click(addButton);
    
    expect(screen.getByText('First todo')).toBeInTheDocument();
    expect(screen.getByText('Second todo')).toBeInTheDocument();
    
    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons).toHaveLength(2);
  });
});