import { createContext, ReactNode, useState } from "react";

import { destroyCookie, setCookie, parseCookies } from "nookies";

import Router from "next/router";
import { api } from "../services/apiClient";

import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    Router.push("/");
  } catch {
    console.log("erro ao deslogar");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps): Promise<void> {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // expire in 1 month
        path: "/", // which paths will have access to the cookie
      });

      setUser({
        id,
        name,
        email,
      });

      // Pass the token to the next requests
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Login feito com sucesso");

      Router.push("/dashboard");
    } catch (err) {
      toast.error("Erro ao tentar fazer login");
      console.log("Erro ao acessar", err);
    }
  }

  async function signUp({ name, email, password }: SignUpProps): Promise<void> {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });

      toast.success("Conta criada com sucesso");

      Router.push("/");
    } catch (err) {
      toast.error("Erro ao cadastrar");
      console.log("Erro ao cadastrar", err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
