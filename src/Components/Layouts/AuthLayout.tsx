import { Routes, Route } from "react-router-dom";

//page
import Login from "../Login";

function AuthLayout() {
  return (
    <div className="dashboard container-fluid">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default AuthLayout;
