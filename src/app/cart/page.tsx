'use client'
import CartItems from "@/components/CartItems";
import CheckoutBlock from "@/components/CheckoutBlock";
import {Separator} from "@/components/ui/separator";
import {useCart} from "@/lib/context/CartContext";
import {Button} from "@/components/ui/button";
import {MoveRight} from "lucide-react";
import {useRouter} from "next/navigation";

type Props = {};
const Page = (props: Props) => {
    const {cartState, removeFromCart, clearCart} = useCart()
    const router = useRouter()

    return (
        <section className={'md:flex gap-20 space-y-6'}>
            <div className={'w-full space-y-7'}>
                <div className={'flex justify-between'}>
                    <h4>Товар</h4>
                    <h4>Количество</h4>
                </div>
                <Separator/>

                <div>
                    <CartItems items={cartState.items} removeFromCart={removeFromCart} clearCart={clearCart}/>
                </div>
                <div className={'flex gap-3'}>
                    <Button variant={"link"} onClick={clearCart}>Очистить корзину</Button>
                    <Button className={'gap-2'} onClick={() => router.push('/')}>Продолжить покупки <MoveRight size={14} /></Button>
                </div>
            </div>
            <div className={'md:w-2/3 lg:w-2/3'}>
                <CheckoutBlock/>
            </div>
        </section>
    );
};
export default Page;
