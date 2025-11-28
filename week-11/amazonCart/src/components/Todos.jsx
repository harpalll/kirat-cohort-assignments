import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  todoAtomFamily,
  todoSelectorFamily,
} from "../store/atoms/todosAtomFamily";

export const Todos = () => {
  return (
    <div>
      {/* <Todo id={1} />
      <Todo id={2} /> */}
      <TodoFromAPI id={1} />
    </div>
  );
};

const TodoFromAPI = ({ id }) => {
  const { state, contents: todo } = useRecoilValueLoadable(
    todoSelectorFamily(id)
  );

  if (state === "loading") {
    return <h3>Loading...</h3>;
  }

  return (
    <div key={todo.id}>
      <h3>{todo.title}</h3>
      <p>{todo.userId}</p>
      <p>{todo.completed ? "Done" : "Remaining"}</p>
    </div>
  );
};

const Todo = ({ id }) => {
  const todo = useRecoilValue(todoAtomFamily(id));
  return (
    <div key={todo.id}>
      <h3>{todo.todo}</h3>
      <p>{todo.desc}</p>
      <p>{todo.completed ? "Done" : "Remaining"}</p>
    </div>
  );
};
