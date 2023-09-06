import { router, useNavigation, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../config";
import axios, { AxiosResponse } from "axios";

export type User = {
  id: string;
  access_token: string;
  refresh_token: string;
};

type AuthContextType = {
  user?: User;
  signIn: (username: string) => void;
  signOut: () => void;
};

type AuthRequestPayload = {
  device_id: string;
};

type AuthResponse = {
  session: {
    access_token: string;
    refresh_token: string;
    [key: string]: any;
  };
  user: {
    id: string;
    [key: string]: any;
  };
  [key: string]: any;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();
  const rootNavigation = useNavigation();
  const [isNavigationReady, setNavigationReady] = useState(false);

  // Temporary fix for: https://github.com/expo/router/issues/740
  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener("state", () =>
      setNavigationReady(true)
    );
    return () => unsubscribe && unsubscribe();
  }, [rootNavigation]);
}

export function AuthProvider(props) {
  const [user, setUser] = useState<User>(null);

  useProtectedRoute(user);

  const signIn = async (username: string) => {
    try {
      const response = await axios.post<
        AuthRequestPayload,
        AxiosResponse<AuthResponse>
      >(`${API_URL}/api/auth/handshake`, {
        device_id: username,
      });

      const responseData = response.data;
      const { user, session } = responseData;

      setUser({
        id: user.id,
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => setUser(null),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
