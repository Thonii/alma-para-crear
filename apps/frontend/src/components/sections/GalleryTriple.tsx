import { memo } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import g11 from "@/assets/alma-gallery1-1.jpg";
import g12 from "@/assets/alma-gallery1-2.jpg";
import g21 from "@/assets/alma-gallery2-1.jpg";
import g22 from "@/assets/alma-gallery2-2.jpg";
import g31 from "@/assets/alma-gallery3-1.jpg";
import g32 from "@/assets/alma-gallery3-2.jpg";

const groups = [
  { title: "Programas de Lectura", images: [g11, g12] },
  { title: "Voluntariado", images: [g21, g22] },
  { title: "Eventos y Talleres", images: [g31, g32] },
];

const GalleryTriple = () => {
  return (
    <section aria-labelledby="galerias" className="flex items-center justify-center h-full bg-brand/5">
      <div className="container">
        <h2 id="galerias" className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 text-center font-bold">
          Historias en imágenes
        </h2>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Momentos que transforman vidas
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {groups.map((g) => (
            <article key={g.title} className="animate-enter">
              <h3 className="text-xl font-bold text-foreground mb-4">{g.title}</h3>
              <Carousel opts={{ loop: true }} className="relative">
                <CarouselContent>
                  {g.images.map((img, i) => (
                    <CarouselItem key={i}>
                      <img 
                        src={img} 
                        alt={`${g.title} ${i + 1}`} 
                        loading="lazy" 
                        width="400"
                        height="300"
                        className="w-full h-56 sm:h-64 object-cover rounded-xl shadow-xl" 
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-brand-foreground/80 text-brand hover:bg-brand-foreground top-auto bottom-2 left-1/2 -translate-x-16 translate-y-0 z-10" />
                <CarouselNext className="bg-brand-foreground/80 text-brand hover:bg-brand-foreground top-auto bottom-2 left-1/2 translate-x-16 translate-y-0 z-10" />
              </Carousel>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(GalleryTriple);
