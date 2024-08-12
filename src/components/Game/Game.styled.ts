import styled from "styled-components";

export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  color: #3f3f3f
`;

export const Title = styled.h1`
  font-size: 36px;
`;

export const SubTitle = styled.h2`
  font-size: 24px;
  height: 27px;
  margin: 0;
`;

export const Footer = styled.footer`
  margin-top: 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ResetButton = styled.button`
  padding: 9px 40px;
  background: #fff;
  font-size: 15px;
`;