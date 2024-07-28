import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useCart} from "@/lib/context/CartContext";
import {formatPrice} from "@/lib/utils";

type Props = {};
const CheckoutBlock = (props: Props) => {
    const {cartState} = useCart()
    const totals = cartState.total
    return (
        <div className={'bg-muted/60 rounded-2xl p-5 space-y-7'}>
            <h3>Оформление заказа</h3>
            <div className={'space-y-3'}>
                <Input placeholder={'Имя Фамилия'}/>
                <Input type={'tel'} placeholder={'Телефон'}/>
                <Input type={'text'} placeholder={'Адрес доставки'}/>
            </div>

            <div className={'text-center mt-5 space-y-3'}>
                <h3>Итого: {formatPrice(totals)}</h3>
                <Button variant={'outline'} size={'lg'} className={'w-full'}>Оформить заказ</Button>
            </div>
        </div>
    );
};
export default CheckoutBlock;
