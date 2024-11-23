import { ReactNode, createContext, useState } from 'react';
import { removeAuth, saveAuth } from '../lib/data';

export type User = {
  userId: number;
  username: string;
};

export type UserContextValues = {
  user: User | undefined;
  token: string | undefined;
  handleSignIn: (user: User, token: string) => void;
  handleSignOut: () => void;
  toggleUserBox: () => void;
  userBoxOpen: boolean;
};
export const UserContext = createContext<UserContextValues>({
  user: undefined,
  token: undefined,
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
  toggleUserBox: () => undefined,
  userBoxOpen: false,
});

type Props = {
  children: ReactNode;
};
export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  function handleSignIn(user: User, token: string) {
    setUser(user);
    setToken(token);
    saveAuth(user, token);
  }

  function handleSignOut() {
    setUser(undefined);
    setToken(undefined);
    removeAuth();
  }

  function toggleUserBox() {
    setIsOpen(!isOpen);
  }

  const contextValue = {
    user,
    token,
    handleSignIn,
    handleSignOut,
    toggleUserBox,
    userBoxOpen: isOpen,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
