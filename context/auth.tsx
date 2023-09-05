import { router, useNavigation, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

export type User = {
  id: string;
  username: string;
  name: string;
  image: string;
};

type AuthContextType = {
  user?: User;
  signIn: (username: string) => void;
  signOut: () => void;
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
    const newUser = {
      id: "1",
      username: "loggedin",
      name: "Logged In",
      image: "https://cdn141.picsart.com/321556657089211.png",
    }; // TODO: Replace with actual
    console.log(newUser);
    setUser(newUser);
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
