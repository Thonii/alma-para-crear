import { memo, useState, useRef, useEffect } from "react";
import Footer from "@/components/layout/Footer";

const LazyVideo = ({ embedId, title }: { embedId: string; title: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={videoRef} className="group animate-enter">
      <div className="aspect-video bg-muted rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
        {isVisible ? (
          <iframe
            src={`https://www.youtube.com/embed/${embedId}`}
            title={title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Cargando video...</div>
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold mt-4 text-foreground group-hover:text-brand transition-colors">
        {title}
      </h3>
    </div>
  );
};

const Videos = () => {
  const videos = [
    {
      id: "video1",
      title: "Crea, aprende, crece: La historia de Alma",
      embedId: "SK8EWn5DkYc"
    },
    {
      id: "video2", 
      title: "Educación con Alma Para Crear",
      embedId: "wuaJx3U73Rc"
    },
    {
      id: "video3",
      title: "Alma Para Crear - Transformando vidas",
      embedId: "csALF4-gKT8"
    }
  ];

  return (
    <section className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center px-4 bg-accent/5">
        <div className="container mx-auto py-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 font-bold">
              Descubre Nuestras Historias
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conoce cómo transformamos vidas a través de la educación y el arte
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <LazyVideo key={video.id} embedId={video.embedId} title={video.title} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default memo(Videos);