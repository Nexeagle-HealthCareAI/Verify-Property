import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Property } from "@/components/property/PropertyCard";

interface FavouritesState {
  favourites: Property[];
  addFavourite:    (property: Property) => void;
  removeFavourite: (id: string) => void;
  isFavourite:     (id: string) => boolean;
  clearAll:        () => void;
}

export const useFavourites = create<FavouritesState>()(
  persist(
    (set, get) => ({
      favourites: [],

      addFavourite: (property) =>
        set((state) => ({
          favourites: state.favourites.some((p) => p.id === property.id)
            ? state.favourites
            : [...state.favourites, property],
        })),

      removeFavourite: (id) =>
        set((state) => ({
          favourites: state.favourites.filter((p) => p.id !== id),
        })),

      isFavourite: (id) => get().favourites.some((p) => p.id === id),

      clearAll: () => set({ favourites: [] }),
    }),
    {
      name: "buysafe-favourites",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/* Compare store — max 3 properties */
interface CompareState {
  compareList: Property[];
  addToCompare:      (property: Property) => boolean; // returns false if already at max
  removeFromCompare: (id: string) => void;
  isInCompare:       (id: string) => boolean;
  clearCompare:      () => void;
}

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      compareList: [],

      addToCompare: (property) => {
        const { compareList } = get();
        if (compareList.length >= 3) return false;
        if (compareList.some((p) => p.id === property.id)) return true;
        set({ compareList: [...compareList, property] });
        return true;
      },

      removeFromCompare: (id) =>
        set((state) => ({
          compareList: state.compareList.filter((p) => p.id !== id),
        })),

      isInCompare: (id) => get().compareList.some((p) => p.id === id),

      clearCompare: () => set({ compareList: [] }),
    }),
    {
      name: "buysafe-compare",
      storage: createJSONStorage(() => sessionStorage), // session-scoped
    }
  )
);
