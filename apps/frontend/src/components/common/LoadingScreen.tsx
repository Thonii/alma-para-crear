import logoAlma from "@/assets/logo-alma-final.webp";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="animate-scale-in flex flex-col items-center gap-6">
        <img 
          src={logoAlma} 
          alt="Logo Alma para Crear" 
          className="w-32 h-32 md:w-40 md:h-40 object-contain animate-pulse"
        />
        <div className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-semibold text-foreground">
            Cargando
          </span>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-brand rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-brand rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-brand rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
