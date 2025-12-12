import { memo } from "react";
import { BookOpen, GraduationCap, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const programs = [
  {
    title: "REFORZAMIENTO ESCOLAR",
    icon: BookOpen,
    description:
      "Programa de lectura y matemática para niños de primaria, subvencionado por padres y donaciones.",
    cta: "Conocer más",
    link: "/programas",
    isExternal: false,
  },
  {
    title: "SEMBRANDO PEQUEÑOS LECTORES",
    icon: GraduationCap,
    description:
      "Incentivamos el hábito lector con metodología innovadora que integra tecnología y desarrolla habilidades digitales.",
    cta: "Conocer más",
    link: "/programas",
    isExternal: false,
  },
  {
    title: "CONOCE MAS SOBRE NUESTROS TALLERES",
    icon: Facebook,
    description:
      "Enterate de las últimas noticias en nuestra página de Facebook.",
    cta: "Visitar Facebook",
    link: "https://www.facebook.com/almaparacrear",
    isExternal: true,
  },
];

const Programs = () => {
  return (
    <section id="programas" aria-labelledby="programas" className="flex items-center justify-center h-full py-16 md:py-20 bg-background">
      <div className="container">
        <h2 id="programas" className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 text-center font-bold">
          Nuestros programas
        </h2>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Descubre cómo transformamos vidas a través de la educación
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((p) => (
            <article
              key={p.title}
              className="rounded-xl border border-border p-8 bg-card hover:shadow-xl transition-all animate-enter flex flex-col h-full group"
            >
              <p.icon className="mb-4 text-brand group-hover:scale-110 transition-transform" size={48} aria-hidden="true" />
              <h3 className="text-xl md:text-2xl font-bold mb-3">{p.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">{p.description}</p>
              {p.isExternal ? (
                <Button 
                  variant="default" 
                  size="lg" 
                  aria-label={`${p.cta} del programa ${p.title}`} 
                  className="mt-auto bg-accent hover:bg-accent/90 text-accent-foreground"
                  asChild
                >
                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                    {p.cta}
                  </a>
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  size="lg" 
                  aria-label={`${p.cta} del programa ${p.title}`} 
                  className="mt-auto bg-accent hover:bg-accent/90 text-accent-foreground"
                  asChild
                >
                  <Link to={p.link}>
                    {p.cta}
                  </Link>
                </Button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Programs);
