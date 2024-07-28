import {Product} from "@/types/product";
import Image from "next/image";
import {formatPrice} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {ShoppingCart, Star} from "lucide-react";

type ProductItemProps = {
    product: Product
    onAdd: (product: Product) => void;
};
const ProductItem = ({product, onAdd}: ProductItemProps) => {
    return (
        <div className={'space-y-3 group'}>
            <div className={'relative'}>
                <div className={'absolute top-0 right-0 p-2 gap-2 flex opacity-0 group-hover:opacity-100'}>
                    <Button name={'В корзину'} variant={"outline"} onClick={() => onAdd(product)} className={'gap-2'}>
                        <ShoppingCart size={14}/> В корзину
                    </Button>

                    <Button name={'В избранное'}>
                        <Star size={14}/>
                    </Button>
                </div>
                <Image priority={true} src={product.image || ''} width={600} height={200} className={'rounded-xl'}
                       alt={product.name}/>
            </div>

            <h4>{product.name}</h4>

            <p className={'text-sm text-muted-foreground'}>{product.description}</p>
            <h5>{formatPrice(product?.price)}</h5>

        </div>
    );
};
export default ProductItem;
