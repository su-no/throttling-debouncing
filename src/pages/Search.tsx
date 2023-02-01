import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';

type ControlDelay = (
  callback: (inputText?: string) => void,
  delay: number
) => void;
type LodashControlDelay = (
  callback: (inputText?: string) => void,
  delay: number
) => void;

export default function Search() {
  const navigate = useNavigate();

  const [isLodash, setIsLodash] = useState<boolean>(false);
  const [checked, setChecked] = useState<string>('throttling');

  const [inputText, setInputText] = useState<string | undefined>('');
  const [searchText, setSearchText] = useState<string | undefined>('');

  const delay = 1000;
  let timer: NodeJS.Timeout | null = null;

  const throttling: ControlDelay = (callback, delay) => {
    if (timer) return;

    timer = setTimeout(() => {
      callback();
      timer = null;
    }, delay);
  };

  const debouncing: ControlDelay = (callback, delay) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      callback();
      timer = null;
    }, delay);
  };

  // lodash 사용한 throttling
  const lodashThrottling: LodashControlDelay = useCallback(
    (callback, delay) => {
      _.throttle(callback, delay);
    },
    []
  );

  // lodash 사용한 debouncing
  const lodashDebouncing: LodashControlDelay = useCallback(
    (callback, delay) => {
      _.debounce(callback, delay);
    },
    []
  );

  // checkbox, radio 선택 값에 따라서 throttling, debouncing 함수를 선택한다.
  const handleEvent = useCallback(
    (callback: () => void, delay: number) => {
      switch (checked) {
        case 'throttling':
          if (isLodash) {
            return lodashThrottling(callback, delay);
          }
          return throttling(callback, delay);
        case 'debouncing':
          if (isLodash) {
            return lodashDebouncing(callback, delay);
          }
          return debouncing(callback, delay);
        default:
          break;
      }
    },
    [checked, isLodash, lodashThrottling, lodashDebouncing]
  );

  // input에 텍스트를 입력했을 때, handleEvent 함수를 실행한다.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    handleEvent(() => {
      setSearchText(e.target.value);
    }, delay);
  };

  // window resize 이벤트가 발생했을 때, handleEvent 함수를 실행한다.
  const handleResize = useCallback(
    () => handleEvent(() => console.log('reszied'), delay),
    [handleEvent, delay]
  );

  useEffect(() => {
    // window resize 이벤트 리스너를 등록한다.
    window.addEventListener('resize', handleResize);

    // cleanup 함수로 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거한다.
    // 제거하지 않으면 timer가 계속 동작해 메모리 누수가 발생한다.
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timer) clearTimeout(timer);
    };
  }, [handleEvent, handleResize, delay, timer]);

  return (
    <Container>
      <Button onClick={() => navigate(-1)}>뒤로가기</Button>
      {/* lodash 사용여부 체크 */}
      <label>
        <input
          type='checkbox'
          name='lodash'
          onChange={() => setIsLodash(!isLodash)}
          checked={isLodash}
        />
        lodash 사용하기
      </label>
      {/* throttling, debouncing 선택 */}
      {['throttling', 'debouncing'].map((name) => (
        <label key={name}>
          <input
            type='radio'
            name={name}
            onChange={() => setChecked(name)}
            checked={checked === name}
          />
          {name}
        </label>
      ))}
      <Input type='inputText' onChange={handleInputChange} />
      <p>text: {inputText}</p>
      <p>searchText: {searchText}</p>
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
  cursor: pointer;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const Input = styled.input`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #000;
  border-radius: 4px;
  font-size: large;
`;
