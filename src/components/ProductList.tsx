'use client'
import {products} from "@/lib/products";
import ProductItem from "@/components/ProductItem";
import {useCart} from "@/lib/context/CartContext";
import ProductSort from "@/components/ProductSort";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import {useMemo} from "react";

type Props = {};
const ProductList = (props: Props) => {
    const {addToCart} = useCart();
    const [sortOrder, setSortOrder] = useLocalStorage<'asc' | 'desc'>('sortOrder', 'asc')

    const sortedProducts = useMemo(() => {
        if (sortOrder === null) return products;

        return [...products].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
    }, [sortOrder]);

    const handleSortChange = (value: string) => {
        setSortOrder(value as 'asc' | 'desc')
    }
    return (
        <>


            <div className={'flex justify-end mt-10 '}>
                <ProductSort defaultValue={sortOrder} onChange={handleSortChange}/>
            </div>

            <div className={'grid lg:grid-cols-3 gap-10 grid-cols-1 md:grid-cols-2'}>
                {sortedProducts.map((product) => {
                    return (
                        <ProductItem onAdd={addToCart} key={product.id} product={product}/>
                    )
                })}
            </div>
        </>
    );
};
export default ProductList;

