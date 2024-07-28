import CartItem from "@/components/CartItem";
import {CartItemType} from "@/types/product";



type CartItemsProps = {
    items: CartItemType[]
    removeFromCart: (productId: number) => void
    clearCart: () => void
};
const CartItems = ({items, removeFromCart, clearCart}: CartItemsProps) => {
    return (
        <ul className={'list-none space-y-7'}>
            {items.map((item) => {
                return (
                    <CartItem key={item.id} item={item}/>
                )
            })}
        </ul>
    );
};
export default CartItems;
