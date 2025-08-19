import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../components/Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );
    
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  test('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );
    
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  test('renders title when provided', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );
    
    expect(screen.getByTestId('modal-title')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  test('does not render title when not provided', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );
    
    expect(screen.queryByTestId('modal-title')).not.toBeInTheDocument();
  });

  test('renders close button by default', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );
    
    expect(screen.getByTestId('modal-close-btn')).toBeInTheDocument();
  });

  test('does not render close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} showCloseButton={false}>
        <p>Modal content</p>
      </Modal>
    );
    
    expect(screen.queryByTestId('modal-close-btn')).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );
    
    const closeButton = screen.getByTestId('modal-close-btn');
    await user.click(closeButton);
    
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }, { timeout: 300 });
  });

  test('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );
    
    const backdrop = screen.getByTestId('modal-backdrop');
    await user.click(backdrop);
    
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }, { timeout: 300 });
  });

  test('does not call onClose when modal content is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );
    
    const modalContent = screen.getByTestId('modal');
    await user.click(modalContent);
    
    // Wait a bit to ensure onClose is not called
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('applies correct size class', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} size="large">
        <p>Modal content</p>
      </Modal>
    );
    
    const modal = screen.getByTestId('modal');
    expect(modal).toHaveClass('modal-large');
  });

  test('applies default medium size when no size is specified', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );
    
    const modal = screen.getByTestId('modal');
    expect(modal).toHaveClass('modal-medium');
  });

  test('has correct accessibility attributes', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Accessible Modal">
        <p>Modal content</p>
      </Modal>
    );
    
    const modal = screen.getByTestId('modal');
    expect(modal).toHaveAttribute('role', 'dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  test('close button has correct aria-label', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );
    
    const closeButton = screen.getByTestId('modal-close-btn');
    expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
  });

  test('renders children content correctly', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>
          <h3>Custom Content</h3>
          <p>This is custom modal content</p>
          <button>Action Button</button>
        </div>
      </Modal>
    );
    
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
    expect(screen.getByText('This is custom modal content')).toBeInTheDocument();
    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });
});