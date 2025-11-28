import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const API_URL = "https://randomuser.me/api";

const RandomUser = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [results, setResults] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  // * https://randomuser.me/api?page=2&results=100
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axios(`${API_URL}?page=${page}&results=${results}`);
        console.log(res.data.results);

        setUsers(res.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [page, results]);

  const loadMoreUsers = () => {
    setPage((page) => page + 1);
  };

  const handleChange = (e) => {
    console.log("Selected value:", e.target.value); // Optional: log the value
    setResults(Number(e.target.value));
  };

  const User = ({ name, picture }) => {
    return (
      <div
        style={{
          border: "1px solid black",
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img src={picture.thumbnail} alt={name} />

        <h3>{`${name.first} ${name.last}`}</h3>
      </div>
    );
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Random Users
      </h1>

      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Loading...</h3>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {users.map((user) => (
            <User key={user.email} name={user.name} picture={user.picture} />
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <button onClick={loadMoreUsers}>Load More Users</button>
        <select value={results} onChange={handleChange}>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
        </select>
      </div>
    </div>
  );
};

export default RandomUser;
