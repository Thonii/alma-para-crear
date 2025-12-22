import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import logo from "@/assets/logo-alma-final.webp";

const Header = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-sm border-b">
      <div className="container h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2" aria-label="Ir al inicio">
          <img
            src={logo}
            alt="Alma para Crear logo"
            className="h-10 w-auto"
          />
        </a>

        <nav aria-label="Menú principal">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" aria-label="Abrir menú" className="font-medium">
                <Menu className="mr-2 h-5 w-5" /> MENÚ
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-50 w-80 sm:w-96 p-6 bg-background text-foreground shadow-xl">
              <div className="space-y-6">
                <nav className="flex flex-col gap-3">
                  <a href="/" aria-label="Ir a inicio">
                    <Button variant="ghost" className="w-full justify-start text-base font-medium">Inicio</Button>
                  </a>
                  <a href="/conocenos" aria-label="Ir a conócenos">
                    <Button variant="ghost" className="w-full justify-start text-base font-medium">Sobre Nosotros</Button>
                  </a>
                  <a href="/programas" aria-label="Ir a programas">
                    <Button variant="ghost" className="w-full justify-start text-base font-medium">Programas</Button>
                  </a>
                  <a href="/sumate" aria-label="Ir a súmate">
                    <Button variant="ghost" className="w-full justify-start text-base font-medium">Súmate</Button>
                  </a>
                  <a href="/donar" aria-label="Ir a donar">
                    <Button variant="ghost" className="w-full justify-start text-base font-medium text-brand">Donar</Button>
                  </a>

                </nav>
                <div className="pt-4 border-t text-sm text-muted-foreground space-y-2">
                  <p className="font-semibold text-foreground">Contacto</p>
                  <p>
                    <a href="mailto:admin@almaparacrear.org" className="hover:text-brand transition-colors">admin@almaparacrear.org</a>
                  </p>
                  <p>
                    <a href="tel:+51963818841" className="hover:text-brand transition-colors">963818841</a>
                  </p>
                  <p className="text-muted-foreground">Ancón</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
};

export default Header;
