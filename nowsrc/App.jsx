import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login"; // 引入登入頁面組件
import SignUp from "./SignUp"; // 引入目標頁面組件
import Home from "./Home";

// 設定路由結構
const router = createBrowserRouter([
  {
    path: "/", // 根路徑
    element: <Login />, // 對應的組件
  },
  {
    path: "/SignUp", // 目標頁面路徑
    element: <SignUp />, // 對應的組件
  },
  {
    path: "/Home",
    element: <Home />,
  },
]);

const App = () => {
  return (
    <div>
      {/* 使用 RouterProvider 提供路由上下文 */}
      <RouterProvider router={router} />
    </div>
  );
};

export default App;