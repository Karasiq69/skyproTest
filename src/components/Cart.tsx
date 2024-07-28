import {Button} from "@/components/ui/button";
import {useCart} from "@/lib/context/CartContext";

const Cart = () => {
    const { cartState, removeFromCart, clearCart } = useCart();

    return (
        <div>

            {cartState.items.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <>
                    {cartState.items.map(item => (
                        <div key={item.id}>
                            {item.name} - {item.quantity} шт. - {item.price * item.quantity} руб.
                            <Button onClick={() => removeFromCart(item.id)}>Удалить</Button>
                        </div>
                    ))}
                    <p>Итого: {cartState.total} руб.</p>
                    <Button onClick={clearCart}>Очистить корзину</Button>
                </>
            )}
        </div>
    );
};

export default Cart;