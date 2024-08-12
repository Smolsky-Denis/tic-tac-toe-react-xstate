import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Board from './Board';

describe('Board Component', () => {
  const mockOnPlay = jest.fn();
  const squares = Array(9).fill(null);

  test('renders all tiles', () => {
    render(<Board squares={squares} onPlay={mockOnPlay}/>);
    expect(screen.getAllByRole('button')).toHaveLength(9);
  });

  test('handles tile click', () => {
    render(<Board squares={squares} onPlay={mockOnPlay}/>);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(mockOnPlay).toHaveBeenCalledWith(0);
  });
});