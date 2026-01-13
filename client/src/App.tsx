import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import UserDetailsPage from "./pages/UserDetails";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UsersPage from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar />

        <Box sx={{ flex: 1, p: 2 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />

            <Route path="/users" element={<UsersPage />} />
            <Route path="/course-results/:userId" element={<UserDetailsPage />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
