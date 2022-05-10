import { createContext } from 'react';

interface userInterface {
  user: null | any;
  setUser: any;
}

const user: userInterface = { user: {}, setUser: () => {} };

export const UserContext = createContext(user);
