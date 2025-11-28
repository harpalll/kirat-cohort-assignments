//#region Backend Implementation
// let currentClock;
// let count = 0;

import { useEffect, useRef, useState } from "react";

// const searchBackend = () => {
//   console.log("request sent to search API");
// };

// const debouncedSearch = () => {
//   count++;
//   console.log("called debouncedSearch:", count);
//   clearTimeout(currentClock);
//   currentClock = setTimeout(searchBackend, 30);
// };

// debouncedSearch();
// debouncedSearch();
// debouncedSearch();
// debouncedSearch();
// debouncedSearch();
// debouncedSearch();
// debouncedSearch();
// debouncedSearch();
// debouncedSearch();
// debouncedSearch();
// debouncedSearch();
// debouncedSearch();
// debouncedSearch();
// debouncedSearch(); // this shoukd be called only
//#endregion

//#region React Implementaion
// useRef Implementaion
// export const useDebounce = (func, delay) => {
//   const currentClockRef = useRef(null);

//   const debouncedFn = () => {
//     clearTimeout(currentClockRef.current);
//     currentClockRef.current = setTimeout(func, delay);
//   };

//   return debouncedFn;
// };
// useEffect Implementaion
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
//#endregion
