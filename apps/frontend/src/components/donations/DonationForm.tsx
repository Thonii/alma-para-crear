import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, Heart, Loader2 } from "lucide-react";
import { AmountSelector } from "./AmountSelector";
import { useCulqi } from "@/hooks/useCulqi";
import { toast } from "sonner";
import { DonorDetailsForm } from "./DonorDetailsForm";

export default function DonationForm() {
    const [currency, setCurrency] = useState<"PEN" | "USD">("PEN");
    const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
    const [customAmount, setCustomAmount] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    // TODO: Move this to env
    const PUBLIC_KEY = import.meta.env.VITE_CULQI_PUBLIC_KEY || "pk_test_sample";

    const { isReady, openCheckout } = useCulqi({
        publicKey: PUBLIC_KEY,
        onTokenGenerated: async (token) => {
            setIsLoading(true);
            try {
                const amount = selectedAmount || Number(customAmount);

                // Call backend processing endpoint
                const response = await fetch("http://localhost:3000/api/donations/process", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        token,
                        amount,
                        currency,
                        email: "donor@example.com"
                    }),
                });

                const data = await response.json();

                if (!response.ok) throw new Error(data.message || "Error al procesar donación");

                toast.success("¡Gracias por tu donación!", {
                    description: "Tu apoyo hace la diferencia."
                });

                // Reset form
                setShowDetails(false);
                setSelectedAmount(50);
                setCustomAmount("");
            } catch (error: any) {
                console.error(error);
                toast.error("Hubo un problema", {
                    description: error.message
                });
            } finally {
                setIsLoading(false);
            }
        },
        onError: (err) => {
            toast.error("Error en Culqi", { description: err.user_message });
            setIsLoading(false);
        }
    });

    const handleSelectAmount = (val: number) => {
        setSelectedAmount(val);
        setCustomAmount("");
    };

    const handleCustomAmount = (val: string) => {
        setCustomAmount(val);
        setSelectedAmount(null);
    };

    const handleDonateClick = () => {
        const finalAmount = selectedAmount || Number(customAmount);
        if (!finalAmount || finalAmount <= 0) {
            toast.error("Por favor selecciona un monto válido");
            return;
        }
        setShowDetails(true);
    };

    const handleConfirmDetails = (data: any) => {
        const finalAmount = selectedAmount || Number(customAmount);
        const description = isRecurring
            ? `Donación Mensual - Alma para Crear`
            : `Donación Única - Alma para Crear`;

        openCheckout(finalAmount, currency, description, data.email);
    };

    return (
        <>
            <Card className="w-full max-w-lg mx-auto overflow-hidden border-0 shadow-2xl bg-white/50 backdrop-blur-sm relative z-10">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand via-purple-500 to-brand" />

                <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mb-4">
                        <Heart className="w-6 h-6 text-brand fill-brand animate-pulse" />
                    </div>
                    <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-purple-600">
                        Haz tu Donación
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Tu aporte transforma vidas hoy mismo.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8 pt-6">
                    <AmountSelector
                        currency={currency}
                        selectedAmount={selectedAmount}
                        customAmount={customAmount}
                        onCurrencyChange={setCurrency}
                        onSelectAmount={handleSelectAmount}
                        onCustomAmountChange={handleCustomAmount}
                    />

                    <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-secondary">
                        <div className="space-y-0.5">
                            <Label className="text-base font-semibold block">Hacer donación mensual</Label>
                            <p className="text-sm text-muted-foreground">
                                Conviértete en un padrino recurrente.
                            </p>
                        </div>
                        <Switch
                            checked={isRecurring}
                            onCheckedChange={setIsRecurring}
                        />
                    </div>

                    <div className="space-y-2">
                        <Button
                            size="lg"
                            className="w-full text-lg h-14 bg-gradient-to-r from-brand to-purple-600 hover:from-brand/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
                            onClick={handleDonateClick}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Procesando...
                                </>
                            ) : (
                                <>
                                    Donar {currency === 'PEN' ? 'S/' : '$'} {selectedAmount || customAmount || '0'}
                                </>
                            )}
                        </Button>
                        <p className="text-center text-sm text-muted-foreground font-medium">Libre de impuestos</p>
                    </div>

                    <div className="flex justify-center items-center gap-2 text-xs text-muted-foreground">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>Pago seguro encriptado con Culqi</span>
                    </div>
                </CardContent>
            </Card>

            <DonorDetailsForm
                isOpen={showDetails}
                onClose={() => setShowDetails(false)}
                onConfirm={handleConfirmDetails}
                amount={selectedAmount || Number(customAmount)}
                currency={currency}
                recurrence={isRecurring}
                isLoading={isLoading}
                isReady={isReady}
            />
        </>
    );
}
