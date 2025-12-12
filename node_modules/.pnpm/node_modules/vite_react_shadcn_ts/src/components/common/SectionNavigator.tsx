import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Inicio" },
  { id: "impact", label: "Impacto" },
  { id: "gallery", label: "Galería" },
  { id: "programs", label: "Programas" },
  { id: "get-involved", label: "Participa" },
  { id: "allies", label: "Aliados" },
  { id: "videos", label: "Videos" },
  { id: "contact", label: "Contacto" },
];

const SectionNavigator = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const mainContainer = document.getElementById('main-container');
    if (!mainContainer) return;

    const handleScroll = () => {
      const scrollPosition = mainContainer.scrollTop + mainContainer.clientHeight / 2;
      
      let currentSection = sections[0].id;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            currentSection = section.id;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    handleScroll();
    mainContainer.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      mainContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <nav 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
      aria-label="Navegación de secciones"
    >
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className="group relative cursor-pointer p-1 hover:scale-110 transition-transform"
          aria-label={`Ir a ${label}`}
          aria-current={activeSection === id ? "true" : "false"}
          type="button"
        >
          <span
            className={`block w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              activeSection === id
                ? "bg-brand border-brand scale-125 shadow-lg shadow-brand/50"
                : "bg-transparent border-foreground/40 hover:border-brand hover:bg-brand/20"
            }`}
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-foreground/95 text-background text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg">
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default SectionNavigator;
