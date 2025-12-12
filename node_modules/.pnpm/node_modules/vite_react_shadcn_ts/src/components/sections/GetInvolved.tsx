import { memo } from "react";
import { Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const ways = [
  {
    title: "Sumar mi empresa",
    icon: Building2,
    description:
      "Alianzas con impacto: programas corporativos, voluntariado y responsabilidad social.",
    cta: "Quiero sumar mi empresa",
    aria: "Quiero sumar mi empresa",
  },
  {
    title: "Ser voluntario",
    icon: Users,
    description:
      "Formá parte como facilitador o mentor y acompañá el aprendizaje desde adentro.",
    cta: "Inscribirme",
    aria: "Inscribirme como voluntario",
  },
];

const GetInvolved = () => {
  return (
    <section id="dona" aria-labelledby="ayudar" className="flex items-center justify-center h-full py-16 md:py-20 bg-accent/5">
      <div className="container">
        <h2 id="ayudar" className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 text-center font-bold">
          Cómo ayudar a la causa
        </h2>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Tu apoyo hace posible que más niños y niñas accedan a una educación de calidad
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {ways.map((w) => (
            <article
              key={w.title}
              className="rounded-xl border border-border p-8 bg-card hover:shadow-xl transition-all animate-enter group flex flex-col"
            >
              <w.icon className="mb-4 text-accent group-hover:scale-110 transition-transform" size={48} aria-hidden="true" />
              <h3 className="text-xl md:text-2xl font-bold mb-3">{w.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">{w.description}</p>
              <a href={w.title === "Donar" ? "/donar" : "/sumate"}>
                <Button variant="default" size="lg" aria-label={w.aria} className="bg-brand hover:bg-brand/90 text-brand-foreground w-full font-semibold">
                  {w.cta}
                </Button>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(GetInvolved);
