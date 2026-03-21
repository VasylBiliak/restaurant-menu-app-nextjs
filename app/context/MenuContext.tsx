"use client";

import React, { createContext, useReducer, ReactNode } from "react";

type State = {
    selectedItems: string[];
    isSelectedOpen: boolean;
};

type Action =
    | { type: "TOGGLE_ITEM"; payload: string }
    | { type: "SET_SELECTED_OPEN"; payload: boolean }
    | { type: "CLEAR_ITEMS" };

const initialState: State = {
    selectedItems: [],
    isSelectedOpen: false
};

const MenuContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null
});

function menuReducer(state: State, action: Action): State {
    switch (action.type) {
        case "TOGGLE_ITEM":
            const exists = state.selectedItems.includes(action.payload);
            const nextItems = exists
                ? state.selectedItems.filter(i => i !== action.payload)
                : [...state.selectedItems, action.payload];
            return {
                ...state,
                selectedItems: nextItems,
                isSelectedOpen: nextItems.length > 0 ? state.isSelectedOpen : false
            };

        case "SET_SELECTED_OPEN":
            return {
                ...state,
                isSelectedOpen: action.payload
            };
        case "CLEAR_ITEMS":
            return {
                ...state,
                selectedItems: [],
                isSelectedOpen: false
            };
        default:
            return state;
    }
}

export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(menuReducer, initialState);

    return (
        <MenuContext.Provider value={{ state, dispatch }}>
            {children}
        </MenuContext.Provider>
    );
};

export default MenuContext;
