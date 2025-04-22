import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getMe, logout } from "../api/auth";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    getMe()
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link>
      {" | "}
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          {" | "}
          {user.role === "admin" && (
            <>
              <Link to="/admin">Admin</Link> {" | "}
            </>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          {" | "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
