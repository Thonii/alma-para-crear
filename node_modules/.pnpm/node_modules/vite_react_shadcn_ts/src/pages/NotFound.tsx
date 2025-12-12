import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import logo from "@/assets/logo-alma-final.webp";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand/30 blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-accent/30 blur-[100px]" />
      </div>

      <div className="text-center max-w-md mx-auto space-y-8 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="Alma para Crear"
            className="h-24 md:h-32 w-auto object-contain drop-shadow-sm"
          />
        </div>

        {/* 404 Content */}
        <div className="space-y-4">
          <h1 className="font-display text-8xl md:text-9xl font-bold text-brand/20 select-none">
            404
          </h1>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
            Página no encontrada
          </h2>
          <p className="text-muted-foreground text-lg">
            Parece que te has perdido. La página que buscas no existe o ha sido movida.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a href="/">
            <Button size="lg" className="w-full sm:w-auto gap-2 bg-brand hover:bg-brand/90 text-brand-foreground">
              <Home size={18} />
              Ir al Inicio
            </Button>
          </a>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} />
            Volver atrás
          </Button>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="absolute bottom-6 text-sm text-muted-foreground/60">
        &copy; {new Date().getFullYear()} Alma para Crear
      </footer>
    </div>
  );
};

export default NotFound;
