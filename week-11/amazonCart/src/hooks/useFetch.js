import { useEffect, useState } from "react";

export const useFetch = (url) => {
  // console.log("got: ", url);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.log("err: ", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log(`refetching with url: ${url}`);
    fetchData();
  }, [url]);

  return [data, loading, error];
};
