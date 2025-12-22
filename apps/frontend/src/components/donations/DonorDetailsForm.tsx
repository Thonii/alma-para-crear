import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import imgChild from "@/assets/voluntarios-2.webp"; // Using an existing image as placeholder like the reference

const formSchema = z.object({
    firstName: z.string().min(2, "El nombre es requerido"),
    lastName: z.string().min(2, "El apellido es requerido"),
    email: z.string().email("Correo inválido"),
    phone: z.string().min(9, "Celular inválido"),
    documentId: z.string().min(8, "DNI/CE inválido"),
    certificate: z.boolean().default(false),
    privacyPolicy: z.boolean().refine(val => val === true, "Debes aceptar la política de privacidad"),
});

interface DonorDetailsFormProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: z.infer<typeof formSchema>) => void;
    amount: number;
    currency: "PEN" | "USD";
    recurrence: boolean;
    isLoading: boolean;
    isReady: boolean;
}

export const DonorDetailsForm = ({
    isOpen,
    onClose,
    onConfirm,
    amount,
    currency,
    recurrence,
    isLoading,
    isReady
}: DonorDetailsFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            documentId: "",
            certificate: false,
            privacyPolicy: false,
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        onConfirm(data);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white p-0 gap-0 rounded-2xl">
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <DialogTitle className="text-3xl font-bold text-center w-full">Tu donación</DialogTitle>
                    </div>

                    <Card className="mb-8 border rounded-xl overflow-hidden shadow-sm">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-brand/10 shrink-0 overflow-hidden">
                                <img src={imgChild} alt="Niño estudiando" className="h-full w-full object-cover mix-blend-multiply opacity-80" />
                            </div>
                            <p className="text-sm md:text-base font-medium text-foreground">
                                Estás dando educación a niños de <span className="text-brand font-bold">Alma para Crear</span> con <span className="font-bold">{currency === 'PEN' ? 'S/' : '$'}{amount}</span> {recurrence ? 'mensuales' : 'una sola vez'}
                            </p>
                        </CardContent>
                    </Card>

                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-4">Déjanos tus datos</h3>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Nombre" className="bg-gray-50 border-gray-200 h-12" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Apellido" className="bg-gray-50 border-gray-200 h-12" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 border-r pr-2 mr-2">
                                                    <img src="https://flagcdn.com/pe.svg" width="20" alt="Peru flag" />
                                                </div>
                                                <FormControl>
                                                    <Input placeholder="Celular" className="pl-16 bg-gray-50 border-gray-200 h-12" {...field} />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Ingresa tu correo" className="bg-gray-50 border-gray-200 h-12" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="documentId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Ingresa tu DNI, CE o PA" className="bg-gray-50 border-gray-200 h-12" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="pt-2 space-y-3">
                                <FormField
                                    control={form.control}
                                    name="certificate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="font-normal">
                                                    ¿Desea Certificado de donación?
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="privacyPolicy"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="font-normal">
                                                    He leído y acepto la política de privacidad para tipo de donación.
                                                </FormLabel>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 text-lg font-bold bg-black text-white hover:bg-black/90 mt-6 rounded-lg"
                                disabled={isLoading || !isReady}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Procesando...
                                    </>
                                ) : (
                                    "Continuar"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};
