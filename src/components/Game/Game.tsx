import React from 'react';
import {useMachine} from '@xstate/react';
import {ticTacToeMachine} from "../../machines/ticTacToeMachine";
import styled from 'styled-components';
import Board from "../Board/Board";

const GameWrapper = styled.div`
  text-align: center;
`;

const Game: React.FC = () => {
  const [state, send] = useMachine(ticTacToeMachine);
  const {board, player, winner} = state.context;

  const handlePlay = (index: number) => {
    send({type: 'PLAY', value: index});
  };

  return (
    <GameWrapper>
      <h1>Tic-Tac-Toe</h1>
      {state.matches('idle') && <h2>Click any tile to start the game</h2>}
      {state.matches('gameOver') && (
        <div>
          {state.hasTag('winner') && <h2>Winner: {winner}</h2>}
          {state.hasTag('draw') && <h2>Draw</h2>}
          <button onClick={() => send({type: 'RESET'})}>Reset</button>
        </div>
      )}
      <Board xIsNext={player === 'x'} squares={board} onPlay={handlePlay}/>
    </GameWrapper>
  );
};

export default Game;