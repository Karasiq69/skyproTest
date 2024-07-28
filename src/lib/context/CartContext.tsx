'use client'
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import {CartItemType, Product} from "@/types/product";
import {createContext, useContext, useEffect, useState} from "react";
import {toast} from "sonner";


export interface CartState {
    items: CartItemType[];
    total: number;
    sortOrder: 'asc' | 'desc' | null;
}

interface CartContextType {
    cartState: CartState;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    sortItemsByPrice: () => void;
    decreaseQuantity: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const initialState: CartState = {
    items: [],
    total: 0,
    sortOrder: 'asc',
};


export const CartProvider = ({children}: { children: React.ReactNode }) => {
    const [cartState, setCartState] = useLocalStorage<CartState>('cart', initialState);
    const [isClient, setIsClient] = useState(false);

    // Проверка что мы на клиенте
    useEffect(() => {
        setIsClient(true);
    }, []);

    const addToCart = (product: Product) => {
        setCartState(prevState => {
            const existingItem = prevState.items.find(item => item.id === product.id)

            if (existingItem) {
                const updatedItems = prevState.items.map(item =>
                    item.id === product.id ? {...item, quantity: item.quantity + 1} : item
                );
                toast.success('Количество изменено')
                return {
                    ...prevState,
                    items: updatedItems,
                    total: prevState.total + product.price
                }
            } else {
                toast.success('Товар добавлен')
                return {
                    ...prevState,
                    items: [...prevState.items, {...product, quantity: 1}],
                    total: prevState.total + product.price
                }
            }
        })

    }

     const decreaseQuantity = (product: Product) => {
        setCartState(prevState => {
            const existingItem = prevState.items.find(item => item.id === product.id)

            if (existingItem) {
                if (existingItem.quantity === 1) {
                    // Если количество равно 1, удаляем товар из корзины
                    const updatedItems = prevState.items.filter(item => item.id !== product.id);
                    toast.success('Товар удален из корзины');
                    return {
                        ...prevState,
                        items: updatedItems,
                        total: prevState.total - product.price
                    }
                } else {
                    // Уменьшаем количество на 1
                    const updatedItems = prevState.items.map(item =>
                        item.id === product.id ? {...item, quantity: item.quantity - 1} : item
                    );
                    toast.success('Количество изменено');
                    return {
                        ...prevState,
                        items: updatedItems,
                        total: prevState.total - product.price
                    }
                }
            }
            return prevState; // Если товар не найден, возвращаем состояние без изменений
        })
    }
    const removeFromCart = (productId: number) => {
        setCartState(prevState => {
            const itemToRemove = prevState.items.find(item => item.id === productId)
            if (!itemToRemove) return prevState;

            const updatedItems = prevState.items.filter(item => item.id !== productId);
            return {
                ...prevState,
                items: updatedItems,
                total: prevState.total - (itemToRemove.price * itemToRemove.quantity)
            }

        })

    }
    const clearCart = () => {
        setCartState(initialState)
        toast.success('Корзина очищена успешно')
    }

    const sortItemsByPrice = () => {
        setCartState(prevState => {
            const newSortOrder = prevState.sortOrder === 'asc' ? 'desc' : 'asc';
            const sortedItems = [...prevState.items].sort((a, b) => {
                if (newSortOrder === 'asc') {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });
            return ({
                ...prevState,
                items: sortedItems,
                sortOrder: newSortOrder
            })
        })
    }

    if (!isClient) {
        return null;
    }

    return (
        <CartContext.Provider
            value={{
                cartState,
                addToCart,
                removeFromCart,
                clearCart,
                sortItemsByPrice,
                decreaseQuantity,
            }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart должен использоваться внутри CartProvider')
    }
    return context;
}