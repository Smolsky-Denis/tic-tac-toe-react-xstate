import React from 'react';
import {useMachine} from '@xstate/react';
import {ticTacToeMachine} from "../../machines/ticTacToeMachine";
import Board from "../Board/Board";

import {GameWrapper, Title, SubTitle, Footer, ResetButton} from './Game.styled'

const Game: React.FC = () => {
  const [state, send] = useMachine(ticTacToeMachine);
  const {board, player, winner} = state.context;

  const handlePlay = (index: number) => {
    send({type: 'PLAY', value: index});
  };

  const handleResetGame = () => send({type: 'RESET'})

  return (
    <GameWrapper>
      <Title>Tic-Tac-Toe</Title>
      <SubTitle>
        {state.matches('idle') && 'Click any tile to start the game'}
        {state.matches('gameOver') && state.hasTag('winner') && `The winner is ${winner.toUpperCase()}`}
        {state.matches('gameOver') && state.hasTag('draw') && 'Draw'}
      </SubTitle>
      <Board
        xIsNext={player === 'x'}
        squares={board}
        onPlay={handlePlay}
      />
      <Footer>
        {
          state.matches('gameOver') &&
          (
            <ResetButton
              onClick={handleResetGame}
            >
              Reset
            </ResetButton>
          )
        }
      </Footer>
    </GameWrapper>
  );
};

export default Game;