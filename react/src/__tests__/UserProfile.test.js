import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserProfile from '../components/UserProfile';

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  bio: 'Software developer with 5 years experience'
};

describe('UserProfile Component', () => {
  test('renders no user message when user is not provided', () => {
    render(<UserProfile />);
    expect(screen.getByTestId('no-user')).toBeInTheDocument();
    expect(screen.getByText('No user data available')).toBeInTheDocument();
  });

  test('renders user profile in view mode initially', () => {
    render(<UserProfile user={mockUser} />);
    
    expect(screen.getByText('User Profile')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Software developer with 5 years experience')).toBeInTheDocument();
    expect(screen.getByTestId('edit-button')).toBeInTheDocument();
  });

  test('displays default bio message when bio is not provided', () => {
    const userWithoutBio = { ...mockUser, bio: undefined };
    render(<UserProfile user={userWithoutBio} />);
    
    expect(screen.getByText('No bio available')).toBeInTheDocument();
  });

  test('switches to edit mode when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<UserProfile user={mockUser} />);
    
    const editButton = screen.getByTestId('edit-button');
    await user.click(editButton);
    
    expect(screen.getByTestId('profile-edit')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-view')).not.toBeInTheDocument();
    expect(screen.getByTestId('name-input')).toHaveValue('John Doe');
    expect(screen.getByTestId('email-input')).toHaveValue('john@example.com');
    expect(screen.getByTestId('age-input')).toHaveValue(30);
    expect(screen.getByTestId('bio-input')).toHaveValue('Software developer with 5 years experience');
  });

  test('updates input values when typing', async () => {
    const user = userEvent.setup();
    render(<UserProfile user={mockUser} />);
    
    await user.click(screen.getByTestId('edit-button'));
    
    const nameInput = screen.getByTestId('name-input');
    await user.clear(nameInput);
    await user.type(nameInput, 'Jane Smith');
    
    expect(nameInput).toHaveValue('Jane Smith');
  });

  test('saves changes and returns to view mode when save is clicked', async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(<UserProfile user={mockUser} />);
    
    await user.click(screen.getByTestId('edit-button'));
    
    const nameInput = screen.getByTestId('name-input');
    await user.clear(nameInput);
    await user.type(nameInput, 'Jane Smith');
    
    await user.click(screen.getByTestId('save-button'));
    
    expect(screen.getByTestId('profile-view')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-edit')).not.toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith('Saving user:', expect.objectContaining({
      name: 'Jane Smith'
    }));
    
    consoleSpy.mockRestore();
  });

  test('cancels changes and returns to view mode when cancel is clicked', async () => {
    const user = userEvent.setup();
    render(<UserProfile user={mockUser} />);
    
    await user.click(screen.getByTestId('edit-button'));
    
    const nameInput = screen.getByTestId('name-input');
    await user.clear(nameInput);
    await user.type(nameInput, 'Changed Name');
    
    await user.click(screen.getByTestId('cancel-button'));
    
    expect(screen.getByTestId('profile-view')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-edit')).not.toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument(); // Original name restored
  });

  test('handles age input correctly', async () => {
    const user = userEvent.setup();
    render(<UserProfile user={mockUser} />);
    
    await user.click(screen.getByTestId('edit-button'));
    
    const ageInput = screen.getByTestId('age-input');
    await user.clear(ageInput);
    await user.type(ageInput, '35');
    
    expect(ageInput).toHaveValue(35);
  });

  test('handles empty bio correctly', async () => {
    const user = userEvent.setup();
    render(<UserProfile user={mockUser} />);
    
    await user.click(screen.getByTestId('edit-button'));
    
    const bioInput = screen.getByTestId('bio-input');
    await user.clear(bioInput);
    
    expect(bioInput).toHaveValue('');
  });
});