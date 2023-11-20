import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
            <Route
              path="/books/edit/:bookId"
              element={<AddBook editBook={true} />}
            />
            <Route path="/books-all" element={<AllBooks />} />
            <Route path="/books/category/:category" element={<AllBooks />} />
            <Route path="/borrowed-Books" element={<BorrowedBooks />} />
            <Route path="/books/details/:bookId" element={<BookDetails />} />
            <Route path="/books/reading/:bookId" element={<Environment />} />
            <Route path="/environment/:environment" element={<Environment />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="*"
            element={
              <AppLayout>
                <NotFound />
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
