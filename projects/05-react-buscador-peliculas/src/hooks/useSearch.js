import { useEffect, useRef, useState } from "react";

export function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
        isFirstInput.current = search === '';
        return;
    }
    if (search === '') {
      setError('No se puede buscar una peícula sin ningún término');
      return;
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar película con un número');
      return;
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 carateres');
      return;
    }

    setError(null);

  }, [search])

  return { search, updateSearch, error }
}