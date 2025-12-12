import { memo } from "react";
import { BookOpen, BookMarked, Users, HeartHandshake } from "lucide-react";
import Counter from "@/components/common/Counter";

const stats = [
  {
    label: "Estudiantes beneficiados",
    icon: Users,
    value: 1400,
  },
  {
    label: "Beneficiarios indirectos",
    icon: HeartHandshake,
    value: 5100,
  },
  {
    label: "Libros leídos anualmente",
    icon: BookOpen,
    value: 30,
  },
  {
    label: "Lectores activos",
    icon: BookMarked,
    value: 80,
  },
];

const Impact = () => {
  return (
    <section aria-labelledby="impacto" className="flex items-center justify-center h-full py-16 md:py-20 bg-background">
      <div className="container">
        <h2 id="impacto" className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 text-center font-bold">
          Nuestro impacto
        </h2>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Cada día transformamos vidas a través de la educación y la lectura
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s) => (
            <article key={s.label} className="rounded-xl border border-border p-8 text-center bg-card hover:shadow-lg transition-shadow animate-enter">
              <s.icon className="mx-auto mb-4 text-brand" size={48} />
              <Counter to={s.value} />
              <p className="mt-3 text-sm/6 text-muted-foreground font-medium">{s.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Impact);
