import { createContext, useState } from "react";

export const FiltersContext = createContext();

export function FiltersProviders({ children }) {
    const [filters, setFilters] = useState({
        category: 'all',
        minPrice: 0
    });
    
    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}