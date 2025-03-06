import "./App.css";
import { AuthProvider } from "./Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Components/Layouts/PrivateRoute";
import PublicPageLayout from "./Components/Layouts/PublicPageLayout";
import DashboardLayout from "./Components/Layouts/DashboardLayout";
import AuthLayout from "./Components/Layouts/AuthLayout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin/*"
            element={<PrivateRoute component={DashboardLayout} />}
          />
          <Route path="/login" element={<AuthLayout />} />
          <Route path="/*" element={<PublicPageLayout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
