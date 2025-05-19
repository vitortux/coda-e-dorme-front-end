"use client";

import { api } from "@/service/api";
import { recoverUserData, signInRequest, signUpRequest } from "@/service/auth";
import { SignInRequestData, SignUpRequestData, User } from "@/types/auth_types";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInRequestData) => Promise<void>;
  signOut: () => void;
  signUp: (data: SignUpRequestData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "codaedorme.token": token } = parseCookies();

    if (token) {
      recoverUserData().then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInRequestData) {
    const { token, user } = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, "codaedorme.token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);
    console.log(user);

    router.push("/");
  }

  async function signUp(data: SignUpRequestData) {
    await signUpRequest(data);
    router.push("/login");
  }

  function signOut() {
    destroyCookie(undefined, "codaedorme.token");

    delete api.defaults.headers["Authorization"];

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
