import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import { LineWave } from "react-loader-spinner";
import UserContainer from "./components/UserContainer";

export default function App() {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [loaded, setLoaded] = useState(false);

  function getUserData(e) {
    e.preventDefault();
    if (input.trim().length === 0) return;
    setLoaded(true);
    fetch(`https://api.github.com/users/${input.trim()}`)
      .then((response) => {
        if (response.status === 200) return response.json();
        setLoaded(false);
        setUser({});
      })
      .then((data) => {
        setLoaded(false);
        setUser(data);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
        setLoaded(false);
        setUser({});
      });
  }

  return (
    <div className="container">
      <Header />
      <form className="search-box" onSubmit={getUserData}>
        <input
          type="text"
          placeholder="Search Github Username..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="search-btn" disabled={loaded}>
          {loaded ? "..." : "search"}
        </button>
      </form>

      <div className="user-container-wrapper">
        {loaded ? (
          <LineWave
            wrapperStyle={{ height: "250px", alignItems: "center" }}
            color="#3333d4"
            height={110}
            width={110}
            ariaLabel="three-circles-rotating"
          />
        ) : user !== null ? (
          <UserContainer user={user} />
        ) : null}
      </div>
    </div>
  );
}
