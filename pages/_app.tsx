import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";

interface AppContextType {
  fieldSize: number;
}

const CurrentUserContext = createContext<AppContextType | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [settings, setSettings] = useState<AppContextType>({
    fieldSize: 22,
  });

  return (
    <CurrentUserContext.Provider value={settings}>
      <Component {...pageProps} />
    </CurrentUserContext.Provider>
  );
}
