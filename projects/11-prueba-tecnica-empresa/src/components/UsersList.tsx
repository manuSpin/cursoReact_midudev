import { SortBy, type User } from "../types.d";

interface Props {
    users: User[];
    showColors: boolean;
    deleteUser: (uuid: string) => void;
    changeSorting: (sort: SortBy) => void;
}

export function UsersLists({ users, showColors, deleteUser, changeSorting }: Props) {

    return (
        <table width='100%'>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th className="pointerHeader" onClick={() => { changeSorting(SortBy.NAME) }}>Nombre</th>
                    <th className="pointerHeader" onClick={() => { changeSorting(SortBy.LAST) }}>Apellidos</th>
                    <th className="pointerHeader" onClick={() => { changeSorting(SortBy.COUNTRY) }}>País</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody className={showColors ? 'table--showColors' : ''}>
                {
                    users.map((user: User, index: number) => {
                        // const backgroundColor = index % 2 == 0 ? '#333' : '#555';
                        // const color = showColors ? backgroundColor : 'transparent';

                        return (
                            // <tr key={user.login.uuid} style={{ backgroundColor: color }}>
                            <tr key={user.login.uuid}>
                                <td><img src={user.picture.thumbnail} alt={user.name.title + ' ' + user.name.first + ' ' + user.name.last} /></td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td>
                                    <button onClick={() => deleteUser(user.login.uuid)}>Borrar</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}