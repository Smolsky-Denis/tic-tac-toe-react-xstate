import {createActor} from 'xstate';
import {ticTacToeMachine} from './ticTacToeMachine';

describe('ticTacToeMachine', () => {
  let service;

  beforeEach(() => {
    service = createActor(ticTacToeMachine).start();
  });

  afterEach(() => {
    service.stop();
  });

  test('initial state is idle', () => {
    expect(service.getSnapshot().matches('idle')).toBe(true);
  });

  test('transitions to playing state on PLAY event', () => {
    service.send({type: 'PLAY', value: 0});
    expect(service.getSnapshot().matches('playing')).toBe(true);
  });

  test('updates board on PLAY event', () => {
    service.send({type: 'PLAY', value: 0});
    expect(service.getSnapshot().context.board[0]).toBe('x');
  });

  test('transitions to gameOver.winner state when a player wins', () => {
    service.send({type: 'PLAY', value: 0}); // x
    service.send({type: 'PLAY', value: 3}); // o
    service.send({type: 'PLAY', value: 1}); // x
    service.send({type: 'PLAY', value: 4}); // o
    service.send({type: 'PLAY', value: 2}); // x wins
    expect(service.getSnapshot().matches('gameOver.winner')).toBe(true);
    expect(service.getSnapshot().context.winner).toBe('x');
  });

  test('transitions to gameOver.draw state when the game is a draw', () => {
    service.send({type: 'PLAY', value: 0}); // x
    service.send({type: 'PLAY', value: 1}); // o
    service.send({type: 'PLAY', value: 2}); // x
    service.send({type: 'PLAY', value: 4}); // o
    service.send({type: 'PLAY', value: 3}); // x
    service.send({type: 'PLAY', value: 5}); // o
    service.send({type: 'PLAY', value: 7}); // x
    service.send({type: 'PLAY', value: 6}); // o
    service.send({type: 'PLAY', value: 8}); // x
    expect(service.getSnapshot().matches('gameOver.draw')).toBe(true);
  });

  test('resets the game on RESET event', () => {
    service.send({type: 'PLAY', value: 0}); // x
    service.send({type: 'PLAY', value: 3}); // o
    service.send({type: 'PLAY', value: 1}); // x
    service.send({type: 'PLAY', value: 4}); // o
    service.send({type: 'PLAY', value: 2}); // x wins
    service.send({type: 'RESET'});
    expect(service.getSnapshot().matches('idle')).toBe(true);
    expect(service.getSnapshot().context.board).toEqual(Array(9).fill(null));
    expect(service.getSnapshot().context.moves).toBe(0);
    expect(service.getSnapshot().context.player).toBe('x');
  });
});
