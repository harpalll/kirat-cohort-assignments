import { useRecoilState, useRecoilValue } from "recoil";
import { counter, isEvenSelector } from "../store/atoms/counter";

export const IsEven = () => {
  const isEven = useRecoilValue(isEvenSelector);

  return (
    <div>
      {/* {isEven ? "EVEN" : "ODD"} */}
      <h1>Hello</h1>
      {isEven && "EVEN"}
    </div>
  );
};
