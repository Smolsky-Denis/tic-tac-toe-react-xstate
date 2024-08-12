import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {useMachine} from '@xstate/react';
import Game from './Game';

jest.mock('@xstate/react', () => ({useMachine: jest.fn(),}));

const mockUseMachine = useMachine as jest.Mock;

describe("Game Component", () => {
  test('renders Game component', () => {
    mockUseMachine.mockReturnValue([
      {
        context: {board: Array(9).fill(null), player: 'x', winner: null},
        matches: jest.fn(),
        hasTag: jest.fn()
      }, jest.fn(),]);
    render(<Game/>);
    const gameElement = screen.getByText(/Tic-Tac-Toe/i);
    expect(gameElement).toBeInTheDocument();
  });

  test('Game displays idle state message', () => {
    mockUseMachine.mockReturnValue([{
      context: {board: Array(9).fill(null), player: 'x', winner: null},
      matches: jest.fn((state: any) => state === 'idle'),
      hasTag: jest.fn()
    }, jest.fn(),]);
    render(<Game/>);
    const idleMessage = screen.getByText(/Click any tile to start the game/i);
    expect(idleMessage).toBeInTheDocument();
  });

  test('Game displays winner', () => {
    mockUseMachine.mockReturnValue([{
      context: {board: Array(9).fill(null), player: 'x', winner: 'x'},
      matches: jest.fn(() => true),
      hasTag: jest.fn(() => true)
    }, jest.fn(),]);
    render(<Game/>);
    const winnerElement = screen.getByText(/The winner is X/i);
    expect(winnerElement).toBeInTheDocument();
  });

  test('Game reset button works', () => {
    const send = jest.fn();
    mockUseMachine.mockReturnValue([{
      context: {board: Array(9).fill(null), player: 'x', winner: 'x'},
      matches: jest.fn(() => true),
      hasTag: jest.fn(() => true)
    }, send,]);
    render(<Game/>);
    const resetButton = screen.getByText(/Reset/i);
    fireEvent.click(resetButton);
    expect(send).toHaveBeenCalledWith({type: 'RESET'});
  });
});