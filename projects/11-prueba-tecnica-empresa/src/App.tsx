import { useMemo, useState } from 'react';
import './App.css'
import { SortBy, type User } from './types.d';
import { UsersLists } from './components/UsersList';
import { useUsers } from './hooks/useUsers';
import { Results } from './components/Results';



function App() {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers();

  const [showColor, setShowColor] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const toggleColors = () => {
    setShowColor(!showColor);
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (uuid: string) => {
    // const filteredUsers = users.filter((user) => user.login.uuid !== uuid);
    // setUsers(filteredUsers);
  }

  const handleReset = async () => {
    await refetch();
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  }


  // const filteresUsers = (typeof filterCountry === 'string' && filterCountry.length > 0) ? users.filter((user => {
  const filteredUsers = useMemo(() => {
    return (filterCountry !== null && filterCountry.length > 0) ? users.filter((user => {
      return user.location.country.toLowerCase().includes(filterCountry.toLocaleLowerCase())
    })) : users;
  }, [users, filterCountry]);


  // const sortedUsers = useMemo(() => {
  //   // const sortedUsers = sortByCountry ? [...users].sort((a, b) => { 
  //   return sorting === SortBy.COUNTRY ? filteredUsers.toSorted((a, b) => {
  //     return a.location.country.localeCompare(b.location.country)
  //   }) : filteredUsers;
  // }, [filteredUsers, sorting]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) {
      return filteredUsers;
    }

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user: User) => user.location.country,
      [SortBy.NAME]: (user: User) => user.name.first,
      [SortBy.LAST]: (user: User) => user.name.last,
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);


  return (
    <>
      <h1>Prueba tecnica</h1>

      <Results />

      <header style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px', alignItems: 'center' }}>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>Resetear estado</button>
        <input placeholder="Filtra por país" type='text' onChange={(event) => setFilterCountry(event.currentTarget.value)} />
      </header>

      <main>
        {users.length > 0 && <UsersLists changeSorting={handleChangeSort} users={sortedUsers} showColors={showColor} deleteUser={handleDelete} />}
        {isLoading && <strong>Cargando...</strong>}
        {isError && <p>Ha habido un error</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
        {!isLoading && !isError && hasNextPage === true && <button onClick={() => fetchNextPage()}>Cargar más resultados</button>}
        {!isLoading && !isError && hasNextPage === false && <p>No hay más resultados</p>}
      </main>

    </>
  )
}

export default App
