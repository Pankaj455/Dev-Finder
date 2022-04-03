import "./App.css";
import { useState } from "react";
import Notifier from "./components/Notifier";
import Loader from "./components/Loader";
import UserContainer from "./components/UserContainer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.error("Something went wrong...");
        setLoaded(false);
        setUser({});
      });
  }

  return (
    <div className="container">
      <Notifier />
      <h1>devfinder</h1>
      <form className="search-box" onSubmit={getUserData}>
        <input
          type="text"
          placeholder="Search Github Username..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <span
          className="close-btn"
          style={{ display: !input.length && "none" }}
          onClick={() => setInput("")}
        ></span>
        <button type="submit" className="search-btn" disabled={loaded}>
          {loaded ? "..." : "search"}
        </button>
      </form>

      <div className="user-container-wrapper">
        {loaded ? (
          <Loader />
        ) : user !== null ? (
          <UserContainer user={user} />
        ) : null}
      </div>
    </div>
  );
}
