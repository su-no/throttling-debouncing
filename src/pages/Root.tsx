import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export default function Root() {
  return (
    <Container>
      <Header>Root</Header>
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`;
