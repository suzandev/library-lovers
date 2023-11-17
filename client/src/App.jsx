import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AddBook from "./pages/AddBook";
import AllBooks from "./pages/AllBooks";
import BookDetails from "./pages/BookDetails";
import BorrowedBooks from "./pages/BorrowedBooks";
import Environment from "./pages/Environment";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

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

        <Route
          element={
            <ProtectedRoute>
              <AppLayout>
                <Outlet />
              </AppLayout>
            </ProtectedRoute>
          }
        >
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/books/edit/:id" element={<AddBook editBook={true} />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/books/:category" element={<AllBooks />} />
          <Route path="/borrowed-Books" element={<BorrowedBooks />} />
          <Route path="/books/details/:id" element={<BookDetails />} />
          <Route path="/books/reading/:id" element={<Environment />} />
          <Route path="/environment/:environment" element={<Environment />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="*"
          element={
            <AppLayout>
              <h1>Ops this page not found</h1>
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
