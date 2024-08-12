import React from 'react';
import styled from 'styled-components';

const TileWrapper = styled.div<{ player: 'x' | 'o' | null }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10vmin;
  background: white;

  &:before {
    content: attr(data-player);
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
    />
  );
};

export default Tile;