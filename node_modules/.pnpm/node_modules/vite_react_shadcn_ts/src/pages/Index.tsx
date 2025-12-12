import { lazy, Suspense, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SectionNavigator from "@/components/common/SectionNavigator";

// Lazy load sections for better performance
const Hero = lazy(() => import("@/components/sections/Hero"));
const Impact = lazy(() => import("@/components/sections/Impact"));
const GalleryTriple = lazy(() => import("@/components/sections/GalleryTriple"));
const Programs = lazy(() => import("@/components/sections/Programs"));
const GetInvolved = lazy(() => import("@/components/sections/GetInvolved"));
const StrategicAllies = lazy(() => import("@/components/sections/StrategicAllies"));
const Videos = lazy(() => import("@/components/sections/Videos"));
const Contact = lazy(() => import("@/components/sections/Contact"));

const SectionSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Skeleton className="h-96 w-full max-w-4xl" />
  </div>
);

const Index = () => {
  useEffect(() => {
    // Forzar scroll al inicio con múltiples intentos para asegurar que funcione
    const scrollToTop = () => {
      const mainContainer = document.getElementById('main-container');
      if (mainContainer) {
        mainContainer.scrollTop = 0;
        window.scrollTo(0, 0);
      }
    };

    // Ejecutar inmediatamente
    scrollToTop();
    
    // Ejecutar después de que los componentes lazy se carguen
    const timeouts = [0, 100, 300, 500].map(delay => 
      setTimeout(scrollToTop, delay)
    );

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);
 
  return (
    <main id="main-container" className="scroll-smooth md:snap-y md:snap-mandatory md:h-screen md:overflow-y-scroll">
      <SectionNavigator />
      <Suspense fallback={<SectionSkeleton />}>
        <section id="hero" className="min-h-screen md:h-screen md:snap-start scroll-mt-16">
          <Hero />
        </section>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <section id="impact" className="min-h-screen md:h-screen md:snap-start scroll-mt-16">
          <Impact />
        </section>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <section id="gallery" className="min-h-screen md:h-screen md:snap-start scroll-mt-16">
          <GalleryTriple />
        </section>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <section id="programs" className="min-h-screen md:h-screen md:snap-start scroll-mt-16">
          <Programs />
        </section>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <section id="get-involved" className="min-h-screen md:h-screen md:snap-start scroll-mt-16">
          <GetInvolved />
        </section>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <section id="allies" className="min-h-screen md:h-screen md:snap-start scroll-mt-16">
          <StrategicAllies />
        </section>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <section id="videos" className="min-h-screen md:h-screen md:snap-start scroll-mt-16">
          <Videos />
        </section>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <section id="contact" className="min-h-screen md:h-screen md:snap-start scroll-mt-16">
          <Contact />
        </section>
      </Suspense>
    </main>
  );
};

export default Index;
