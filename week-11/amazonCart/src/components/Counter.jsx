import { useRecoilState, useRecoilValue } from "recoil";
import { counter, isEvenSelector } from "../store/atoms/counter";

export const Counter = () => {
  const count = useRecoilValue(counter);

  return (
    <div>
      <h3>Context API: </h3>
      {count}
      {/* <br /> */}
      {/* <button onClick={() => setCount((count) => count + 1)}>inc</button> */}
    </div>
  );
};
