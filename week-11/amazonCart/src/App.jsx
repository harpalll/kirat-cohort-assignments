import { useEffect, useState } from "react";
import "./App.css";
import { usePrev } from "./hooks/usePrev";
import { useFetch } from "./hooks/useFetch";
import { useDebounce } from "./hooks/useDebounce";
import { Counter } from "./components/Counter";
import { RecoilRoot, useRecoilState } from "recoil";
import { Buttons } from "./components/Buttons";
import { IsEven } from "./components/IsEven";
import { User } from "./components/User";
import { Todos } from "./components/Todos";

const searchFn = () => {
  console.log("request sent to search API");
};

function App() {
  const [count, setCount] = useState(0);
  const [todoId, setTodoId] = useState(1);
  const prev = usePrev(count);
  const [data, loading, error] = useFetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`
  );
  const [inputVal, setInputVal] = useState("");
  // const debouncedFn = useDebounce(searchFn, 1000);
  const debouncedValue = useDebounce(inputVal, 1000);
  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  useEffect(() => {
    searchFn();
  }, [debouncedValue]);

  return (
    <>
      <h2>custom hooks </h2>
      <hr />
      <h4>usePrev: </h4>
      <p>Current: {count}</p>
      <p>Prev: {prev}</p>
      <button onClick={() => setCount((count) => count + 1)}>Increment</button>
      <hr />
      <h4>useFetch: </h4>
      {loading ? <h4>loading...</h4> : data && JSON.stringify(data)}
      {error && <h4>error... {error}</h4>}
      <br />
      <button onClick={() => setTodoId((todoId) => todoId + 1)}>
        Fetch Next
      </button>
      <hr />
      <h4>useDebounce: </h4>
      <br />
      {/* useRef */}
      {/* <input
        type="text"
        onChange={debouncedFn}
        placeholder="search..."
        style={{
          padding: "1rem",
        }}
      /> */}
      {/* useEffect */}
      <input
        type="text"
        onChange={handleChange}
        placeholder="search..."
        style={{
          padding: "1rem",
        }}
      />
      <hr />
      <RecoilRoot>
        {/* <Counter />
        <Buttons />
        <IsEven /> */}
        {/* <User /> */}
        <Todos />
      </RecoilRoot>
    </>
  );
}

export default App;
