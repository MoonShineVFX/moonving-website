import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Auth";

// 添加類型定義
interface AuthContextType {
  currentUser: any;
}

const PrivateRoute = ({
  component: Component,
}: {
  component: React.ComponentType;
}) => {
  // 修改 useAuth 調用
  const { currentUser } = useAuth() as AuthContextType;
  const location = useLocation();

  if (!currentUser) {
    // 如果用戶未登入，重定向到登入頁面，並保存當前位置
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 如果用戶已登入，渲染請求的組件
  return <Component />;
};

export default PrivateRoute;
