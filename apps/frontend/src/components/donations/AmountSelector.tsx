import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AmountSelectorProps {
    selectedAmount: number | null;
    customAmount: string;
    currency: "PEN" | "USD";
    onSelectAmount: (amount: number) => void;
    onCustomAmountChange: (value: string) => void;
    onCurrencyChange: (currency: "PEN" | "USD") => void;
}

const PREDEFINED_AMOUNTS = {
    PEN: [20, 50, 100, 200],
    USD: [10, 25, 50, 100],
};

export const AmountSelector = ({
    selectedAmount,
    customAmount,
    currency,
    onSelectAmount,
    onCustomAmountChange,
    onCurrencyChange,
}: AmountSelectorProps) => {
    const amounts = PREDEFINED_AMOUNTS[currency];

    return (
        <div className="space-y-6">
            <div className="flex justify-center gap-4 mb-4">
                <Button
                    variant={currency === "PEN" ? "default" : "outline"}
                    onClick={() => onCurrencyChange("PEN")}
                    className={cn(
                        "w-24 transition-all duration-300",
                        currency === "PEN"
                            ? "bg-brand text-white shadow-lg scale-105"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    S/ Soles
                </Button>
                <Button
                    variant={currency === "USD" ? "default" : "outline"}
                    onClick={() => onCurrencyChange("USD")}
                    className={cn(
                        "w-24 transition-all duration-300",
                        currency === "USD"
                            ? "bg-brand text-white shadow-lg scale-105"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    $ USD
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {amounts.map((amount) => (
                    <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => onSelectAmount(amount)}
                        className={cn(
                            "h-16 text-lg font-semibold transition-all duration-300",
                            selectedAmount === amount
                                ? "bg-brand text-white shadow-lg scale-105 border-brand"
                                : "hover:border-brand/50 hover:bg-brand/5"
                        )}
                    >
                        {currency === "PEN" ? "S/" : "$"} {amount}
                    </Button>
                ))}
            </div>

            <div className="relative">
                <label className="text-sm text-muted-foreground mb-2 block">
                    O ingresa otro monto:
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                        {currency === "PEN" ? "S/" : "$"}
                    </span>
                    <Input
                        type="number"
                        min="1"
                        placeholder="0.00"
                        value={customAmount}
                        onChange={(e) => onCustomAmountChange(e.target.value)}
                        className={cn(
                            "pl-10 h-12 text-lg font-medium transition-all duration-300",
                            selectedAmount === null && customAmount
                                ? "border-brand ring-2 ring-brand/20"
                                : ""
                        )}
                    />
                </div>
            </div>
        </div>
    );
};
