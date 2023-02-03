import styled from 'styled-components';
import { throttle, debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';

export default function Test() {
  const navigate = useNavigate();

  const handleThrottling = throttle(
    () => console.log('handleThrottling'),
    1000
  );

  const handleDebouncing = debounce(
    () => console.log('handleDebouncing'),
    1000
  );

  return (
    <Container>
      <Button onClick={() => navigate(-1)}>뒤로가기</Button>
      <Button onClick={handleThrottling}>Lodash Throttling</Button>
      <Button onClick={handleDebouncing}>Lodash Debouncing</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  input {
    margin-top: 1rem;
  }
`;

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 4px;
  font-size: large;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;
