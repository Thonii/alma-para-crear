import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, User, Users, Trophy, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-alma-final.webp";
import anaMendozaFoto from "@/assets/ana-mendoza-foto.webp";
import ronaldSerranoFoto from "@/assets/ronald-serrano-foto.webp";
import walterAlvaradoFoto from "@/assets/walter-alvarado-foto.webp";
import marsiHumanFoto from "@/assets/marsi-human-foto.webp";
import wennyVillalobosFoto from "@/assets/wenny-villalobos-foto.webp";
import jehryMendoza from "@/assets/jehry-mendoza.webp";
import Footer from "@/components/layout/Footer";
import placeholderImage from "@/assets/placeholder-about.png";

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

        {/* Section 1: Conoce a Alma para Crear (Text Left, Image Right) */}
        <section className="py-8 md:py-12">
          <div className="bg-[#4DD0E1] rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-5xl text-white font-bold leading-tight">
                  Conoce a Alma<br />para crear
                </h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Somos una organización sin fines de lucro ubicada en Ancón, Lima, comprometida con el desarrollo integral de niños y jóvenes a través de la educación, el arte y la creatividad.
                </p>
              </div>
              <div className="h-full">
                <img
                  src={placeholderImage}
                  alt="Niños en Alma para Crear"
                  className="w-full h-64 md:h-full object-cover rounded-2xl shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Nuestra Historia (Image Left, Text Right) */}
        <section className="py-8 md:py-12">
          <div className="bg-brand-foreground/5 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-last md:order-first h-full">
                <img
                  src={placeholderImage}
                  alt="Nuestra Historia"
                  className="w-full h-64 md:h-full object-cover rounded-2xl shadow-sm"
                />
              </div>
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-5xl text-brand-foreground font-bold leading-tight">
                  Nuestra Historia
                </h2>
                <p className="text-brand-foreground/80 text-lg leading-relaxed">
                  Fundada en 2018, Alma para Crear nació del sueño de transformar vidas a través de la educación. Comenzamos con un pequeño grupo de voluntarios y hoy impactamos directamente a más de 200 niños cada año, ofreciendo programas de lectura temprana, clubes de lectores y talleres creativos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Nuestra Misión (Text Left, Image Right) */}
        <section className="py-8 md:py-12">
          <div className="bg-[#4DD0E1] rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-5xl text-white font-bold leading-tight">
                  Nuestra Misión
                </h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Somos una organización que trabaja para reducir las brechas de desigualdad, asegurando que niñas, niños, adolescentes y adultos tengan acceso a una educación inclusiva, equitativa y de calidad. Colaboramos con comunidades y organizaciones para lograr cambios positivos y duraderos.
                </p>
              </div>
              <div className="h-full">
                <img
                  src={placeholderImage}
                  alt="Nuestra Misión"
                  className="w-full h-64 md:h-full object-cover rounded-2xl shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Nuestros Logros (Stats Grid) */}
        <section className="py-16 md:py-24 bg-brand-foreground/5">
          <div className="text-center max-w-3xl mx-auto mb-16 px-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-foreground mb-6">
              Nuestros <span className="text-accent">Logros</span>
            </h2>
            <p className="text-brand-foreground/80 text-lg leading-relaxed">
              Transformando vidas a través de la educación y el compromiso comunitario.
              Cada número representa una historia de éxito y un futuro mejor.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                  <User size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold text-gray-900">1,500+</h3>
                  <p className="text-gray-600 font-medium">
                    Niños beneficiados con programas escolares
                  </p>
                </div>
                <div className="absolute -bottom-4 -right-4 text-gray-100 transform -rotate-12">
                  <User size={100} />
                </div>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                  <ArrowUpRight size={24} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold text-gray-900">85%</h3>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-accent w-[85%] rounded-full" />
                    </div>
                    <p className="text-gray-600 font-medium">
                      Mejora en comprensión lectora
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 text-gray-100 transform -rotate-12">
                  <ArrowUpRight size={100} />
                </div>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                  <Users size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold text-gray-900">50+</h3>
                  <p className="text-gray-600 font-medium">
                    Voluntarios activos en la comunidad
                  </p>
                </div>
                <div className="absolute -bottom-4 -right-4 text-gray-100 transform -rotate-12">
                  <Users size={100} />
                </div>
              </CardContent>
            </Card>

            {/* Card 4 */}
            <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 text-yellow-600">
                  <Trophy size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold text-gray-900">2023</h3>
                  <p className="text-gray-600 font-medium">
                    Reconocimiento Municipal por impacto social
                  </p>
                </div>
                <div className="absolute -bottom-4 -right-4 text-gray-100 transform -rotate-12">
                  <Trophy size={100} />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sección Nuestro Directorio */}
        <section className="py-16 md:py-24">
          <div className="text-center mb-12">
            <div className="inline-block bg-accent px-12 py-4 mb-8 rounded-full">
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
            <div className="inline-block bg-accent px-12 py-4 mb-8 rounded-full">
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