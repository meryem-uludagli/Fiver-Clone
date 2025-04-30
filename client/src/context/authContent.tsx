import { createContext, JSX, useState } from "react";
import { IFormUser, ILoginUser, IUser } from "../types";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ContextType = {
  user: IUser | null;
  register: (user: IFormUser) => void;
  login: (user: ILoginUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<ContextType>({
  user: null,
  register: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  const register = (user: IFormUser) => {
    api
      .post("/auth/register", user, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        toast.info("Hesabiniz olusturuldu giris yapablrsiniz");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const login = () => {};

  const logout = () => {};

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
