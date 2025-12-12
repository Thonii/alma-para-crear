import { ArrowLeft, BookOpen, GraduationCap, Sparkles, User, Lightbulb, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage1 from "@/assets/alma-hero-1.jpg";
import heroImage2 from "@/assets/alma-hero-2.jpg";
import heroImage3 from "@/assets/alma-hero-3.jpg";
import { Link } from "react-router-dom";
import Footer from "@/components/layout/Footer";

const Programas = () => {
  return (
    <main className="min-h-screen bg-hero pt-20">
      <div className="container">
        <Link to="/" className="inline-flex items-center gap-2 mb-4 text-brand-foreground hover:opacity-80">
            <ArrowLeft size={20} />
            <span>Volver al inicio</span>
        </Link>
      </div>
      {/* Reforzamiento Escolar - Texto izquierda, imagen derecha */}
      <section id="reforzamiento-escolar" className="min-h-screen flex items-center py-7 md:py-10">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <BookOpen className="text-brand-foreground" size={48} aria-hidden="true" />
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-foreground">
                  REFORZAMIENTO ESCOLAR
                </h1>
              </div>
              <p className="text-lg md:text-xl text-brand-foreground/90 leading-relaxed">
                Lectura y matemática un programa subvencionado por los padres de familia y donaciones, dirigido a niños y niñas de nivel primaria.
              </p>
              <p className="text-brand-foreground/80">
                Nuestro programa de Lectura y Matemática se desarrolla en dos sedes con el apoyo de docentes capacitados y recursos pedagógicos lúdicos. 
                Esta iniciativa es posible gracias al compromiso de las familias, quienes contribuyen mediante una cuota social, y al valioso respaldo de donaciones.
              </p>
              <p className="text-brand-foreground/80">
                A través de este modelo de reforzamiento escolar con costo accesible, no solo brindamos 
                acompañamiento educativo de calidad, sino que también sostenemos y ampliamos nuestros 
                talleres gratuitos en comunidades vulnerables.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Inscribir a mi hijo/a
                </Button>
                <Button variant="outline" size="lg">
                  Ver sedes
                </Button>
              </div>
            </div>
            <div className="lg:order-last">
              <img 
                src={heroImage1} 
                alt="Niños participando en reforzamiento escolar"
                className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sembrando Pequeños Lectores - Texto derecha, imagen izquierda */}
      <section id="sembrando-lectores" className="min-h-screen flex items-center py-7 md:py-10 bg-brand-foreground/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-first">
              <img 
                src={heroImage2} 
                alt="Niños participando en Sembrando Pequeños Lectores"
                className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <GraduationCap className="text-brand-foreground" size={48} aria-hidden="true" />
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-foreground">
                  SEMBRANDO PEQUEÑOS LECTORES
                </h1>
              </div>
              <p className="text-lg md:text-xl text-brand-foreground/90 leading-relaxed">
                El cual busca incentivar el hábito lector de niños y niñas de nivel primaria en el distrito de Ancón.
              </p>
              <p className="text-brand-foreground/80">
                Diseñamos una metodología educativa innovadora que integra el aprendizaje a través del uso de recursos tecnológicos. 
                Para desarrollar las habilidades lectoras y digitales preparando a los estudiantes para un mundo cada vez más tecnológico.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Conocer más
                </Button>
                <Button variant="outline" size="lg">
                  Ver detalles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Metodología - Sección con fondo */}
      <section id="metodologia" className="min-h-screen flex items-center py-16 md:py-20 relative bg-brand-foreground/5">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroImage1})` 
          }}
        />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-6 font-bold">
              Metodología
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Creemos que los niños aprenden mejor cuando juegan, exploran y se sienten protagonistas. 
                Por eso, nuestra metodología une la gamificación, el aprendizaje significativo y el enfoque centrado en el estudiante, 
                potenciando la lectura a través de experiencias vivas, tecnológicas y con sentido.
              </p>
              <p className="text-xl md:text-2xl text-white font-semibold italic">
                "Jugamos, sentimos y comprendemos... porque leer también es una aventura."
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <User className="text-white" size={64} aria-hidden="true" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Centrado en el estudiante
              </h3>
            </div>
            
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <Lightbulb className="text-white" size={64} aria-hidden="true" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Aprendizaje significativo
              </h3>
            </div>
            
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <Monitor className="text-white" size={64} aria-hidden="true" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Gamificación
              </h3>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Programas;