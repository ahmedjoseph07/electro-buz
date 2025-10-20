import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
    _id: string;
    title: string;
    description?: string;
    price: number;
    image?: string;
    category?: string;
}

// cart item stored in Redux (serializable)
export interface CartItem extends Product {
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

// helper: load initial cart from localStorage (if any)
const loadCart = (): CartItem[] => {
    try {
        const raw = typeof window !== "undefined" ? localStorage.getItem("cart_v1") : null;
        if (!raw) return [];
        const parsed = JSON.parse(raw) as CartItem[];
        // optional: validate shape minimally
        if (Array.isArray(parsed)) return parsed;
        return [];
    } catch {
        return [];
    }
};

const initialState: CartState = {
    items: loadCart(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const { _id, title, description, price, image, category } = action.payload;
            const existing = state.items.find((it) => it._id === _id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({
                    _id,
                    title,
                    description,
                    price,
                    image,
                    category,
                    quantity: 1,
                });
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((it) => it._id !== action.payload);
        },
        setQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const existing = state.items.find((it) => it._id === id);
            if (existing) {
                existing.quantity = Math.max(1, Math.floor(quantity));
            }
        },
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find((i) => i._id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter((i) => i._id !== action.payload);
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, setQuantity, clearCart, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
