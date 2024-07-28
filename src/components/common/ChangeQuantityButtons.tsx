import {Button} from "@/components/ui/button";
import {MinusIcon, PlusIcon} from "lucide-react";
import React from "react";

type ChangeQuantityButtonsProps = {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    minQuantity?: number;
    maxQuantity?: number;
    isPending: boolean;
};

const ChangeQuantityButtons: React.FC<ChangeQuantityButtonsProps> = ({
                                                                         quantity,
                                                                         isPending,
                                                                         onIncrease,
                                                                         onDecrease,
                                                                         minQuantity = 1,
                                                                         maxQuantity = 10,
                                                                     }) => {
    return (
        <div className="flex items-center">
            <div className="grid gap-1 bg-muted/70 rounded-full p-0.5">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        className="size-8 rounded-full p-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                        onClick={onDecrease}
                        disabled={quantity <= minQuantity}
                    >
                        <MinusIcon className="h-3 w-3"/>
                        <span className="sr-only">Уменьшить количество</span>
                    </Button>
                    <span className="text-sm font-bold">{quantity}</span>
                    <Button
                        variant="outline"
                        className="size-8 rounded-full p-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                        onClick={onIncrease}
                        disabled={quantity >= maxQuantity || isPending}
                    >
                        <PlusIcon className="h-3 w-3"/>
                        <span className="sr-only">Увеличить количество</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChangeQuantityButtons;