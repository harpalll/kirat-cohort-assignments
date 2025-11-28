import { useEffect, useRef } from "react";

export const usePrev = (value) => {
  const ref = useRef();
  // console.log("got value: ", value);

  useEffect(() => {
    // console.log("setting value: ", value);
    ref.current = value;
  }, [value]);

  // console.log("returned value: ", ref.current);
  return ref.current;
};
