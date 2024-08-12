import React from 'react';
import styled from 'styled-components';
import Tile from "../Tile/Tile";

const BoardWrapper = styled.div`
  display: grid;
  height: 50vmin;
  width: 50vmin;
  margin-top: 40px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0.25rem;
  grid-row-gap: 0.25rem;
  background: #ddd;
`;

interface BoardProps {
  squares: (string | null)[];
  onPlay: (index: number) => void;
}

function range(start: number, end: number) {
  return Array(end - start)
    .fill(null)
    .map((_, i) => i + start);
}

const Board: React.FC<BoardProps> = ({squares, onPlay}) => {
  return (
    <BoardWrapper>
      {range(0, 9).map((index) => (
        <Tile
          key={index}
          index={index}
          onClick={() => onPlay(index)}
          player={squares[index]}
        />
      ))}
    </BoardWrapper>
  );
};

export default Board;