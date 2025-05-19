import { configureStore, type Middleware } from "@reduxjs/toolkit";
import usersReducer, { rollbackUser, type UserWithId } from './users/slice';
import { toast } from "sonner";

const persistanceLocalStorage: Middleware = (store) => (next) => (action) => {
    next(action);
    localStorage.setItem("_redux_state_", JSON.stringify(store.getState()));
}

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
    const { type, payload } = action;
    const previousState = store.getState();

    next(action);

    if (type === 'users/deleteUserById') {
        const userIdToRemove = payload;
        const userToRemove = previousState.users.find((user: UserWithId) => user.id === userIdToRemove);
        fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    toast.success(`Usuario ${userIdToRemove} borrado`);
                } else {
                    throw new Error('Error al eliminar el usuario')
                }
            })
            .catch(() => {
                toast.error(`Error eliminando al usuario ${userIdToRemove}`);
                if (userToRemove) {
                    store.dispatch(rollbackUser(userToRemove));
                }
            });
    }
}

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistanceLocalStorage, syncWithDatabase)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;