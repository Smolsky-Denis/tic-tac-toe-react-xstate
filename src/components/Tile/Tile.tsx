import React from 'react';
import styled from 'styled-components';

const TileWrapper = styled.button<{ player: 'x' | 'o' | null }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10vmin;
  line-height: 10vmin;
  background: white;
  border: none;

  &:before {
    content: attr(data-player);
    color: ${({player}) => player === 'x' ? 'red' : 'blue'};
  }
`;

interface TileProps {
  index: number;
  onClick: () => void;
  player: 'x' | 'o' | null;
}

const Tile: React.FC<TileProps> = ({index, onClick, player}) => {
  return (
    <TileWrapper
      key={index}
      onClick={onClick}
      data-player={player}
      player={player}
      data-testid={`tile-${index}`}
    />
  );
};

export default Tile;