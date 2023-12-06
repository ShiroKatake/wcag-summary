import { createContext, useEffect, useState } from "react";
import { Sitemap } from "../types/sitemap.types";
import { getSitemap } from "../utils/getSitemap";

export const AppContext = createContext<Sitemap>([]);
export const AppContextConsumer = AppContext.Consumer;

type AppContextProviderProps = {
  children?: React.ReactNode;
};

export const SitemapProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [sitemap, setSitemap] = useState([]);

  useEffect(() => {
    getSitemap(setSitemap);
  }, []);

  console.log(sitemap);

  return <AppContext.Provider value={sitemap}>{children}</AppContext.Provider>;
};
