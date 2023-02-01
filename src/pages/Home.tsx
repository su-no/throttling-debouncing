import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Home() {
  const [state, setState] = useState<number>(0);

  const delay = 2000;
  let timer: NodeJS.Timeout | null = null;

  const throttling = (delay: number): void => {
    if (timer) return;

    setState(1);
    console.log('throttling');

    timer = setTimeout(() => {
      console.log(`${delay}ms 지남. 추가 요청 받을 수 있음.`);
      timer = null;
    }, delay);
  };

  const debouncing = (delay: number): void => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      console.log(`${delay}ms 지남. 추가 요청 받을 수 있음.`);
      timer = null;
    }, delay);
  };

  return (
    <div>
      <Button onClick={() => throttling(delay)}>throttling</Button>
      <Button onClick={() => debouncing(delay)}>debouncing</Button>
      <Link to='/search'>
        <h1>Search</h1>
      </Link>
    </div>
  );
}

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 4px;
  font-size: large;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;
