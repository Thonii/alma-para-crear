import { useEffect } from "react";
import DonationForm from "@/components/donations/DonationForm";
import Footer from "@/components/layout/Footer";
import { Heart } from "lucide-react";

export default function Donar() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <section className="flex-grow pt-32 pb-20 px-4 bg-gradient-to-br from-brand/5 via-background to-brand/10">
                <div className="container mx-auto max-w-4xl text-center mb-12">
                    <div className="mx-auto w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                        <Heart className="w-8 h-8 text-brand fill-brand" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                        Dona Ahora
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                        Tu generosidad es la semilla de un futuro brillante. Gracias por ser parte del cambio.
                    </p>
                </div>

                <div className="container mx-auto px-4">
                    <DonationForm />
                </div>
            </section>
            <Footer />
        </div>
    );
}
