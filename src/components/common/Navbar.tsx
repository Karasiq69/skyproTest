'use client'
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

const navbarItems = [
    {
        name: 'Каталог',
        href: '/'
    },
    {
        name: 'Корзина',
        href: '/cart'
    }
]

type Props = {};
const Navbar = (props: Props) => {
    const pathname = usePathname()

    return (
        <section className={'h-20 bg-muted rounded-sm'}>
            <div className={'flex h-full justify-between items-center px-5'}>
                <h1 className={'text-4xl'}>
                    Каталог
                </h1>
                <div>
                    <ul className={'flex gap-5'}>
                        {navbarItems.map((item) => {
                            return (
                                <li key={item.name}>
                                    <Button asChild variant={'link'} className={cn('text-black', pathname === item.href && 'underline')}>
                                        <Link href={item.href}>{item.name}</Link>
                                    </Button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
};
export default Navbar;
