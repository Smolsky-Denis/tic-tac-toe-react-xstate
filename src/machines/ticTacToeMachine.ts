import { assign, setup } from 'xstate';

type Player = 'x' | 'o';

interface TicTacToeContext {
  board: Array<Player | null>;
  moves: number;
  player: Player;
  winner: Player | undefined;
}

type TicTacToeEvent =
  | { type: 'PLAY'; value: number }
  | { type: 'RESET' };

export const ticTacToeMachine = setup({
  types: {
    context: {} as TicTacToeContext,
    events: {} as TicTacToeEvent,
  },
  guards: {
    checkWin: ({ context }) => {
      const { board } = context;
      const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let line of winningLines) {
        const xWon = line.every((index) => board[index] === 'x');
        if (xWon) return true;

        const oWon = line.every((index) => board[index] === 'o');
        if (oWon) return true;
      }

      return false;
    },
    checkDraw: ({ context }) => context.moves === 9,
    isValidMove: ({ context, event }) => {
      if (event.type !== 'PLAY') return false;
      return context.board[event.value] === null;
    },
  },
  actions: {
    updateBoard: assign({
      board: ({ context, event }) => {
        if (event.type !== 'PLAY') return context.board;
        const updatedBoard = [...context.board];
        updatedBoard[event.value] = context.player;
        return updatedBoard;
      },
      moves: ({ context }) => context.moves + 1,
      player: ({ context }) => (context.player === 'x' ? 'o' : 'x'),
    }),
    resetGame: assign({
      board: () => Array(9).fill(null),
      moves: () => 0,
      player: () => 'x',
      winner: () => undefined,
    }),
    setWinner: assign({
      winner: ({ context }) => (context.player === 'x' ? 'o' : 'x'),
    }),
  },
}).createMachine({
  id: 'ticTacToe',
  initial: 'idle',
  context: {
    board: Array(9).fill(null),
    moves: 0,
    player: 'x',
    winner: undefined,
  },
  states: {
    idle: {
      on: {
        PLAY: {
          target: 'playing',
          actions: 'updateBoard',
        },
      },
    },
    playing: {
      always: [
        { target: 'gameOver.winner', guard: 'checkWin' },
        { target: 'gameOver.draw', guard: 'checkDraw' },
      ],
      on: {
        PLAY: {
          target: 'playing',
          guard: 'isValidMove',
          actions: 'updateBoard',
        },
      },
    },
    gameOver: {
      initial: 'winner',
      states: {
        winner: {
          tags: 'winner',
          entry: 'setWinner',
        },
        draw: {
          tags: 'draw',
        },
      },
      on: {
        RESET: {
          target: 'idle',
          actions: 'resetGame',
        },
      },
    },
  },
});