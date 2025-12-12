import { memo } from "react";
import aliadosImage from "@/assets/aliados.webp";

const StrategicAllies = () => {
  return (
    <section className="flex items-center justify-center h-full py-8 px-4 bg-background">
      <div className="container mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 font-bold">
          Aliados Estratégicos
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Juntos impulsamos el crecimiento y el impacto de nuestra iniciativa
        </p>
        
        <div className="flex items-center justify-center">
          <img 
            src={aliadosImage} 
            alt="Aliados Estratégicos de Alma para Crear" 
            className="max-w-full h-auto rounded-xl shadow-lg animate-enter"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default memo(StrategicAllies);