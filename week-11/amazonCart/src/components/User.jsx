import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { user } from "../store/atoms/counter";

export const User = () => {
  //   const userData = useRecoilValueLoadable(user);
  const { state, contents } = useRecoilValueLoadable(user);

  if (state === "loading") {
    return <h5>Loading...</h5>;
  }

  return <div>User: {JSON.stringify(contents)}</div>;
};
