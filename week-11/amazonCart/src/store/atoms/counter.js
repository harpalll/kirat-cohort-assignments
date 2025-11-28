import { atom, selector } from "recoil";

export const counter = atom({
  key: "counter",
  default: 0,
});

export const isEvenSelector = selector({
  key: "isEvenSelector",
  get: ({ get }) => get(counter) % 2 === 0,
});

export const user = atom({
  key: "user",
  default: selector({
    key: "fetchUser",
    get: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await res.json();
      return data;
    },
  }),
});
