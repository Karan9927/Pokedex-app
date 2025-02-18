import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";

import Background from "./components/Background";
import "./scss/index.scss";
import { Suspense, lazy, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { clearToasts, setUserStatus } from "./app/slices/AppSlice";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";

const Search = lazy(() => import("./pages/Search"));
const MyList = lazy(() => import("./pages/MyList"));
const Pokemon = lazy(() => import("./pages/Pokemon"));

export default function App() {
  const { toasts } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      toasts.forEach((message: string) => {
        toast(message, toastOptions);
      });
      dispatch(clearToasts());
    }
  }, [toasts, dispatch]);

  return (
    <div className="main-container">
      <Background />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <div className="app">
            <Navbar />
            <Routes>
              <Route element={<Search />} path="/search" />
              <Route element={<MyList />} path="/list" />
              <Route element={<Pokemon />} path="/pokemon/:id" />
              <Route element={<Navigate to="/pokemon/1" />} path="*" />
            </Routes>
            <Footer />
            <ToastContainer />
          </div>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
