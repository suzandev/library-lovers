import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AppLayout from "./components/Applayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AllBooks from "./pages/AllBooks";
import BorrowedBooks from "./pages/BorrowedBooks";
import Environment from "./pages/Environment";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryBooks from "./pages/CategoryBooks";

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
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/books/:category" element={<CategoryBooks />} />
          <Route path="/borrowed-Books" element={<BorrowedBooks />} />
          <Route path="/book-details" element={<h1>Book details</h1>} />
          <Route path="/book-reading" element={<h1>Book reading</h1>} />
          <Route path="/environment/:environment" element={<Environment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
