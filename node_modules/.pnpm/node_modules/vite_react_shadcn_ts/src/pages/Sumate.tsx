import { useEffect } from "react";
import { Users, Handshake, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import donaEmpresaImg from "@/assets/dona-empresa.webp";
import voluntarios1Img from "@/assets/voluntarios-2.webp";
import voluntarios2Img from "@/assets/imagen-voluntarios.webp";
import voluntarios3Img from "@/assets/voluntarios-4.webp";
import voluntarios4Img from "@/assets/voluntarios-3.webp";
import Footer from "@/components/layout/Footer";

const volunteerImages = [
  { src: voluntarios1Img, alt: "Voluntarios de Alma" },
  { src: voluntarios2Img, alt: "Equipo de voluntarios" },
  { src: voluntarios3Img, alt: "Voluntarios en acción" },
  { src: voluntarios4Img, alt: "Comunidad de voluntarios" },
];

export default function Sumate() {
  useEffect(() => {
    const scrollToTop = () => {
      const mainContainer = document.getElementById("main-container");
      if (mainContainer) {
        mainContainer.scrollTop = 0;
      }
      window.scrollTo(0, 0);
    };

    setTimeout(scrollToTop, 0);
    setTimeout(scrollToTop, 100);
    setTimeout(scrollToTop, 300);
    setTimeout(scrollToTop, 500);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-brand/5 via-background to-brand/10">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Súmate a la Causa
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Tu apoyo transforma vidas. Descubre cómo puedes ser parte del cambio
          </p>
        </div>
      </section>

      {/* Para Empresas Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Para Empresas: Impacto que Trasciende
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-12 items-center">
            {/* Image */}
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src={donaEmpresaImg}
                alt="Dona como Empresa"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Cards */}
            <div className="space-y-6">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-brand" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Dona como Empresa
                    </h3>
                    <p className="text-muted-foreground">
                      Sé parte de sorpresas que transformas. Genera impacto en la vida de muchos niñas, niños y adolescentes.
                    </p>
                    <Button
                      size="lg"
                      variant="brand"
                      asChild
                      className="w-full"
                    >
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSd1aJN1QcqkWihTcmk10iLHBtJUo5Dd16DNASK6M6XCiEnzKw/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Más Información
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center">
                      <Handshake className="w-8 h-8 text-brand" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Voluntariado Empresarial
                    </h3>
                    <p className="text-muted-foreground">
                      Suma a tu equipo y vive Campamentos y Talleres compartiendo valiosas habilidades.
                    </p>
                    <Button
                      size="lg"
                      variant="brand"
                      asChild
                      className="w-full"
                    >
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSew1dzA9VlKLOBD69WjpPOkdfwhXW3dhsRp7b56quHtKPHvIw/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Conoce Más
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Voluntariado Individual Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-brand/5 via-background to-brand/10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Voluntariado Individual: Tu Futuro
          </h2>

          {/* Activities Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-brand-foreground rounded-full text-lg font-semibold">
              Actividades
            </div>
          </div>

          {/* Carousel */}
          <div className="mb-12 max-w-4xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {volunteerImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>

          {/* Action Cards */}
          <div className="flex justify-center">
            <Card className="border-2 hover:shadow-lg transition-shadow bg-card max-w-md w-full">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center">
                    <Users className="w-8 h-8 text-brand" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Quiero Ser Voluntario
                  </h3>
                  <Button
                    size="lg"
                    variant="brand"
                    asChild
                    className="w-full"
                  >
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfQKxqtcwafVexIxS7hfbASrqS6MXTMxpVbW4AT6mBLx_FvFg/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Inscríbete Ahora
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 px-4 bg-brand/10">
        <div className="container mx-auto max-w-6xl text-center">
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-12 py-6 h-auto border-2"
          >
            Contáctanos y Súmate
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
