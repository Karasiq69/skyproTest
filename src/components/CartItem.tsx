import Image from "next/image";
import {CartItemType} from "@/types/product";
import {Button} from "@/components/ui/button";
import {formatPrice} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";
import ChangeQuantityButtons from "@/components/common/ChangeQuantityButtons";
import {useCart} from "@/lib/context/CartContext";


type CartItemProps = {
    item: CartItemType
};
const CartItem = ({item}: CartItemProps) => {
    const {addToCart, removeFromCart, decreaseQuantity} = useCart()

    const handleDecrease = () => {
        decreaseQuantity(item)
    }
    const handleIncrease = () => {
        addToCart(item)
    }

    const handleDeleteFromCart = () => {
        removeFromCart(item.id)
    }
    return (
        <>
            <li className={'flex justify-between'}>

                <div className={'flex gap-5 h-full'}>
                    <Image src={item.image || ''} width={100} height={100} className={'w-[200px] h-[200px]'}
                           alt={item.name}/>
                    <div className={'space-y-3 h-full'}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <h4>{formatPrice(item.price)}</h4>

                        <div>
                            <Button variant={'link'}>Избранные</Button>
                            <Button variant={'link'} onClick={handleDeleteFromCart}>Удалить</Button>
                        </div>
                    </div>

                </div>


                <div>
                    <ChangeQuantityButtons
                        isPending={false}
                        onDecrease={handleDecrease}
                        onIncrease={handleIncrease}
                        quantity={item.quantity}
                        maxQuantity={10}
                        minQuantity={1}/>
                </div>


            </li>
            <Separator/>
        </>
    );
};
export default CartItem;
