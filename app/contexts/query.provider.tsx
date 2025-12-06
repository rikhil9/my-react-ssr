"use client";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export const QueryContext = createContext<{
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}>({
  query: "",
  setQuery: () => {},
});

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
}
