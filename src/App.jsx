import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((user) => setUser(user))
      .catch((error) => setError(error.message));
  }, []);
  console.log(user);
  if (error) {
    return <span>{error}</span>;
  }

  return <div>{user ? <User user={user} /> : <span>Loading...</span>}</div>;
}

function User({ user }) {
  const { name, email } = user;

  return (
    <div className="person">
      <h3>{name}</h3>
      <span>{email}</span>
    </div>
  );
}

export default App;
