import React from 'react';
import {GlobalStyle} from "./src/globalStyle/GlobalStyle";
import Game from "./src/components/Game/Game";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Game />
    </>
  );
}