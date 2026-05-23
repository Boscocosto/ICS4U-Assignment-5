import { createContext } from "react";
import type { ImageCell } from "@/core";

export type UserContextType = {
  userName: string;
  favorites: Map<number, ImageCell>;
  setUserName: (userName: string) => void;
  toggleFavorite: (image: ImageCell) => void;
  movieGenres: string[];
  TvGenres: string[];
  toggleGenre: (mediaType: "movie" | "tv", genre: string) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
