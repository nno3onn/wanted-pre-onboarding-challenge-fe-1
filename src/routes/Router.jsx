import { Route, Routes } from "react-router-dom";
import TodoDetail from "../components/Todo/TodoDetail";
import ProtectAuth from "../components/ProtectRoute/ProtectAuth";
import ProtectHome from "../components/ProtectRoute/ProtectHome";
import Auth from "../pages/Auth";
import Home from "../pages/Home";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectHome>
            <Home />
          </ProtectHome>
        }
      >
        <Route path="/todos/:id" element={<TodoDetail />} />
      </Route>
      <Route
        path="/auth"
        element={
          <ProtectAuth>
            <Auth />
          </ProtectAuth>
        }
      />
    </Routes>
  );
};

export default Router;
