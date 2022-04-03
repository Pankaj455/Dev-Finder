import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import { MutatingDots } from "react-loader-spinner";
import UserContainer from "./components/UserContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, []);

  function handleConnectionChange() {
    if (navigator.onLine) setIsConnected(true);
    else setIsConnected(false);
  }

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
        toast.error("Something went wrong...");
        setLoaded(false);
        setUser({});
      });
  }

  return (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={true}
        limit={1}
        closeOnClick
        pauseOnHover
        toastClassName={() => "toast-wrapper"}
        style={{ background: "transparent" }}
      />
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
          <MutatingDots
            wrapperStyle={{ height: "250px", alignItems: "center" }}
            color="#3333d4"
            secondaryColor="#6666d4"
            height={100}
            width={100}
            ariaLabel="loading-indicator"
          />
        ) : user !== null ? (
          <UserContainer user={user} />
        ) : null}
      </div>
    </div>
  );
}
