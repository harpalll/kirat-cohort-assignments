import { useSetRecoilState } from "recoil";
import { counter } from "../store/atoms/counter";

export const Buttons = () => {
  const setCount = useSetRecoilState(counter);

  function increase() {
    setCount((c) => c + 2);
  }

  function decrease() {
    setCount((c) => c - 1);
  }

  return (
    <div>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  );
};
