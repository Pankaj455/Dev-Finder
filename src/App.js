import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import UserContainer from "./components/UserContainer";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="container">
      <Header />
      <SearchBox setUser={setUser} />
      {user ? <UserContainer user={user} /> : null}
    </div>
  );
}
