import { memo } from "react";
import { Button } from "@/components/ui/button";
import homePrincipal from "@/assets/home-principal.webp";

const Hero = () => {
  return (
    <header id="inicio" className="bg-brand text-brand-foreground h-full flex items-center pt-16">
      <div className="container py-16 md:py-20">
        <section className="grid gap-12 md:grid-cols-2 items-center">
          <article className="space-y-6 animate-enter">
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl leading-tight font-bold">
              Transformamos vidas con educación y lectura
            </h1>
            <p className="text-base/7 md:text-xl/8 max-w-prose opacity-95">
              Con Alma para Crear, niños y niñas cumplen sus sueños a través de programas de aprendizaje que inspiran curiosidad y abren oportunidades.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button
                variant="default"
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                asChild
              >
                <a href="/donar">Dona ahora</a>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                asChild
              >
                <a href="/conocenos">Conócenos</a>
              </Button>
            </div>
          </article>
          <div className="relative animate-enter">
            <img
              src={homePrincipal}
              alt="Niños leyendo en aula – Alma para Crear"
              loading="eager"
              width="800"
              height="600"
              className="w-full h-auto object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </section>
      </div>
    </header>
  );
};

export default memo(Hero);