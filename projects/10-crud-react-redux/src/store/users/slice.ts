import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;

export interface User {
    name: string;
    email: string;
    github: string
};

export interface UserWithId extends User {
    id: UserId;
};

const DEFAULT_STATE = [
    {
        id: "1",
        name: "Yazman Rodriguez",
        email: "yazmanito@gmail.com",
        github: "manuSpin",
    },
    {
        id: "2",
        name: "John Doe",
        email: "leo@gmail.com",
        github: "leo",
    },
    {
        id: "3",
        name: "Haakon Dahlberg",
        email: "haakon@gmail.com",
        github: "midudev",
    },
];

const initialState: UserWithId[] = (() => {
    const persistedState = localStorage.getItem('_redux_state_');

    if (persistedState) {
        return JSON.parse(persistedState).users;
    }

    return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID();
            return [...state, { id, ...action.payload }]
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter((user) => user.id !== id);
        },
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            const isUserAlredyDefined = state.some(user => user.id === action.payload.id);

            if (!isUserAlredyDefined) {
                return [...state, action.payload];
            }

        }
    }
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;

