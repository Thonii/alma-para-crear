import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-alma-final.webp";
import anaMendozaFoto from "@/assets/ana-mendoza-foto.webp";
import ronaldSerranoFoto from "@/assets/ronald-serrano-foto.webp";
import walterAlvaradoFoto from "@/assets/walter-alvarado-foto.webp";
import marsiHumanFoto from "@/assets/marsi-human-foto.webp";
import wennyVillalobosFoto from "@/assets/wenny-villalobos-foto.webp";
import jehryMendoza from "@/assets/jehry-mendoza.webp";
import Footer from "@/components/layout/Footer";

const directoryMembers = [
  {
    id: 1,
    name: "Ana Reyes Mendoza",
    role: "Miembro del directorio",
    avatar: anaMendozaFoto,
    biography: "Directora de la Biblioteca Malala y graduada en Administración de Empresas por el College of The Albemarle. Con más de 6 años de experiencia en apoyo administrativo y 4 años en cuentas por pagar, aporta su conocimiento en gestión, organización y finanzas al fortalecimiento de nuestra labor. Desde su rol, colabora activamente en procesos de recaudación de fondos y en el impulso de iniciativas educativas y sociales.",
  },
  {
    id: 2,
    name: "Ronald Serrano Aldana",
    role: "Miembro del directorio",
    avatar: ronaldSerranoFoto,
    biography: "Magister y Licenciado en Ciencias de la Educación por la Universidad de Piura, con experiencia docente en centros educativos de Piura, Lima y Montevideo. Apoya a nuestra organización con su capacidad de planificación, trabajo en equipo y orientación de resultados, contribuyendo al desarrollo de actividades educativas y comunitarias.",
  },
  {
    id: 3,
    name: "Walter Alvarado Chapeyquen",
    role: "Miembro del directorio",
    avatar: walterAlvaradoFoto,
    biography: "Profesional con más de 20 años de experiencia en comunicación corporativa, sostenibilidad, marketing y proyectos sociales. Integra el mundo empresarial con el sector de impacto y la innovación tecnológica, aportando visión estratégica, creatividad y alianzas clave para el crecimiento y la sostenibilidad del proyecto.",
  },
];

const teamMembers = [
  {
    id: 1,
    name: "Marsi Humán Noa",
    role: "Directora especialista pedagógico",
    avatar: marsiHumanFoto,
    biography: "Directora especialista pedagógico, con experiencia como gestora y consultora en proyectos sociales y educativos. Experta en el diseño, implementación y evaluación de iniciativas orientadas al desarrollo social y la mejora de la calidad educativa.",
  },
  {
    id: 2,
    name: "Wenny Villalobos Flores",
    role: "Co fundadora",
    avatar: wennyVillalobosFoto,
    biography: "Co fundadora, especialista en publicidad y marketing, con experiencia en la gestión de la comunicación estratégica de proyectos sociales. Enfocada en posicionar iniciativas con propósito y generar impacto a través de campañas creativas.",
  },
  {
    id: 3,
    name: "Jehry Mendoza Cerna",
    role: "Co fundador",
    avatar: jehryMendoza,
    biography: "Co fundador con experiencia en la administración de proyectos, consultoría y optimización de procesos. Enfocado en la mejora continua, la eficiencia operativa y el logro en contextos sociales y educativos.",
  },
];

const Conocenos = () => {
  const [selectedDirectoryMember, setSelectedDirectoryMember] = useState(directoryMembers[0]);
  const [selectedTeamMember, setSelectedTeamMember] = useState(teamMembers[0]);

  return (
    <main className="min-h-screen bg-hero">
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Botón de regreso */}
        <Link to="/" className="inline-flex items-center gap-2 mb-4 text-brand-foreground hover:opacity-80">
          <ArrowLeft size={20} />
          <span>Volver al inicio</span>
        </Link>
      
        {/* Sección Sobre Alma para Crear */}
        <section className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-foreground mb-6">
                  Conoce a Alma para Crear
                </h1>
                <p className="text-lg text-brand-foreground/90 leading-relaxed">
                  Somos una organización sin fines de lucro ubicada en Ancón, Lima, comprometida con el desarrollo integral de niños y jóvenes a través de la educación, el arte y la creatividad.
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl md:text-2xl text-brand-foreground mb-3">
                    Nuestra Historia
                  </h2>
                  <p className="text-brand-foreground/80 leading-relaxed">
                    Fundada en 2018, Alma para Crear nació del sueño de transformar vidas a través de la educación. Comenzamos con un pequeño grupo de voluntarios y hoy impactamos directamente a más de 200 niños cada año, ofreciendo programas de lectura temprana, clubes de lectores y talleres creativos.
                  </p>
                </div>
                
                <div>
                  <h2 className="font-display text-xl md:text-2xl text-brand-foreground mb-3">
                    Nuestra Misión
                  </h2>
                  <p className="text-brand-foreground/80 leading-relaxed">
                    Somos una organización que trabaja para reducir las brechas de desigualdad, que todas las niñas, niños, adolescentes y adultos tengan acceso a una educación inclusiva, equitativa y de calidad, promoviendo mejores oportunidades de aprendizaje. Colaborando con sus comunidades y organizaciones públicas y privadas, con el compromiso de conseguir cambios positivos y duraderos para ellas y ellos.
                  </p>
                </div>
                
                <div>
                  <h2 className="font-display text-xl md:text-2xl text-brand-foreground mb-3">
                    Nuestros Logros
                  </h2>
                  <ul className="space-y-2 text-brand-foreground/80">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-foreground rounded-full"></div>
                      <span>Más de 1,500 niños beneficiados desde nuestra fundación</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-foreground rounded-full"></div>
                      <span>85% de mejora en comprensión lectora en nuestros participantes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-foreground rounded-full"></div>
                      <span>Red de 50+ voluntarios comprometidos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-foreground rounded-full"></div>
                      <span>Reconocimiento municipal por labor social 2023</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="bg-brand-foreground/10 border-brand-foreground/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto bg-brand-foreground/20 flex items-center justify-center p-2">
                      <img src= {logo} alt="Alma para Crear Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-brand-foreground mb-2">
                        Alma para Crear
                      </h3>
                      <p className="text-brand-foreground/70 text-sm">
                        Transformando vidas desde Ancón, Lima
                      </p>
                    </div>
                    <div className="pt-4 space-y-2 text-sm text-brand-foreground/80">
                      <div className="flex justify-between">
                        <span>Fundada:</span>
                        <span className="font-medium">2018</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ubicación:</span>
                        <span className="font-medium">Ancón, Lima</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Beneficiarios:</span>
                        <span className="font-medium">200+ niños/año</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Programas:</span>
                        <span className="font-medium">3 activos</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
  
        {/* Sección Nuestro Directorio */}
        <section className="py-16 md:py-24">
          <div className="text-center mb-12">
            <div className="inline-block bg-accent px-12 py-4 mb-8">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white">
                NUESTRO DIRECTORIO
              </h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {directoryMembers.map((member) => (
              <Card key={member.id} className="bg-white border-border">
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-48 h-48 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-muted-foreground text-sm">Imagen pendiente</div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">
                        {member.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {member.role}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed text-left">
                        {member.biography}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sección Nuestro Equipo */}
        <section className="py-16 md:py-24">
          <div className="text-center mb-12">
            <div className="inline-block bg-accent px-12 py-4 mb-8">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white">
                NUESTRO EQUIPO
              </h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <Card key={member.id} className="bg-white border-border">
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-full aspect-[3/4] bg-muted flex items-center justify-center overflow-hidden">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-muted-foreground text-sm">Imagen pendiente</div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">
                        {member.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {member.role}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed text-left">
                        {member.biography}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Conocenos;