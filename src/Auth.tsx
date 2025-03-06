import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "./firebaseConfig/fireauth";
import { onAuthStateChanged, User } from "firebase/auth";

// 定義 AuthContext 的類型
interface AuthContextType {
  currentUser: any | null;
}

// 提供初始值
export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setPending(false);
    });

    // 清理函數，在組件卸載時取消訂閱
    return () => unsubscribe();
  }, []);

  if (pending) {
    return <div className="loading">載入中...</div>;
  }

  const value = {
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
