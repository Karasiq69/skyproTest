import React from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"

type Props = {
    onChange?: (value: string) => void;
    defaultValue?: string;
};

const sortItems = [
    {
        label: "Сначала дешевле",
        value: "asc",
        icon: "▲",
    },
    {
        label: "Сначала дороже",
        value: "desc",
        icon: "▼",
    }
]

const ProductSort: React.FC<Props> = ({onChange, defaultValue}) => {
    return (
        <div className={'flex gap-2 items-center'}>
            Сортировка:

            <Select onValueChange={onChange} defaultValue={defaultValue}>

                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Сортировка"/>
                </SelectTrigger>
                <SelectContent>
                    {sortItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.icon} {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default ProductSort;