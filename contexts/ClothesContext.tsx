"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface ClothingProps {
  _id: Id<"clothes">;
  imageUrl: string | null;
  alt: string;
  description: string;
  price: number;
  storageId: Id<"_storage">; // Add storageId to the interface
}

interface ClothesContextProps {
  clothes: ClothingProps[];
}

const ClothesContext = createContext<ClothesContextProps | undefined>(
  undefined
);

export const ClothesProvider = ({ children }: { children: ReactNode }) => {
  const [clothes, setClothes] = useState<ClothingProps[]>([]);

  const data = useQuery(api.clothes.getClothes);

  useEffect(() => {
    if (data) {
      setClothes(data);
    }
  }, [data]);

  return (
    <ClothesContext.Provider value={{ clothes }}>
      {children}
    </ClothesContext.Provider>
  );
};

export const useClothes = () => {
  const context = useContext(ClothesContext);
  if (!context) {
    throw new Error("useClothes must be used within a ClothesProvider");
  }
  return context;
};
