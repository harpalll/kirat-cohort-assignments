import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { TODOS } from "../../data/TODOS";

export const todoAtomFamily = atomFamily({
  key: "todoAtomFamily",
  default: (id) => TODOS.find((todo) => todo.id === id),
});

export const todoSelectorFamily = selectorFamily({
  key: "todoSelectorFamily",
  get: (id) => async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const data = await res.json();
    return data;
  },
});
