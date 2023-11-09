import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AppLayout from "./components/Applayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Environment from "./pages/Environment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <AppLayout>
              <Home />
            </AppLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout>
                <Outlet />
              </AppLayout>
            </ProtectedRoute>
          }
        >
          <Route path="/add-book" element={<h1>Add Book</h1>} />
          <Route path="/all-books" element={<h1>All Books</h1>} />
          <Route path="/borrowed-Books" element={<h1>Borrowed Books</h1>} />
          <Route path="/book-details" element={<h1>Book details</h1>} />
          <Route path="/book-reading" element={<h1>Book reading</h1>} />
          <Route path="/environment/:environment" element={<Environment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
