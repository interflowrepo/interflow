import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [user, setUser] = useState({
    pfpUrl:
      "https://res.cloudinary.com/ddbgaessi/image/upload/v1676909785/Group_20_jqfeqy.png",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
