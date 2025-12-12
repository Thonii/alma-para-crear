import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Heart, Loader2, ShieldCheck, ShieldX } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react"; // <-- Añadir useRef y useEffect
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// CAMBIO 1: Actualizar la declaración global para la nueva instancia
declare global {
  interface Window {
    // La clase constructora que nos da el script de Culqi
    CulqiCheckout: new (publicKey: string, config: any) => any;
  }
}

const API_URL = "http://localhost:5000";

const CULQI_PUBLIC_KEY = import.meta.env.VITE_CULQI_PUBLIC_KEY;
const CULQI_RSA_ID = import.meta.env.VITE_CULQI_RSA_ID;
const CULQI_RSA_PUBLIC_KEY = import.meta.env.VITE_CULQI_RSA_PUBLIC_KEY;

type PaymentStatus = 'ready' | 'processing' | 'success' | 'error';

const Donar = () => {
  const [amount, setAmount] = useState("20.00");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('ready');

  // CAMBIO 2: Estados para manejar el flujo del checkout custom
  const [orderId, setOrderId] = useState<string | null>(null);
  const culqiInstanceRef = useRef<any>(null); // Para guardar la instancia de Culqi

  // CAMBIO 3: useEffect para inicializar Culqi cuando tengamos una orderId
  useEffect(() => {
    // Solo se ejecuta si tenemos una orderId y el formulario de Culqi no ha sido creado aún.
    if (orderId && !culqiInstanceRef.current) {
      
      // Función que se ejecutará cuando Culqi termine (con token o error)
      const handleCulqiResult = () => {
        const culqiResult = culqiInstanceRef.current; // Obtenemos el resultado desde la instancia

        if (culqiResult.token) {
          // ÉXITO: Se creó un token
          fetch(`${API_URL}/api/payments/create-charge`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tokenId: culqiResult.token.id,
              amount: parseFloat(amount),
              email,
              orderId: orderId, // Usamos la orderId del estado
            }),
          })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setPaymentStatus('success');
            } else {
              setError(data.message || 'Error al procesar el cargo.');
              setPaymentStatus('error');
            }
          })
          .catch(() => {
            setError('Error de conexión al crear el cargo.');
            setPaymentStatus('error');
          });
        } else if (culqiResult.error) {
          // ERROR: Culqi reportó un error
          setError(culqiResult.error.user_message || 'Ocurrió un error inesperado.');
          setPaymentStatus('error');
        }
      };

      // --- Configuración completa para Culqi Checkout Custom ---
      const settings = {
        title: 'Alma para Crear',
        currency: 'PEN',
        amount: Math.round(parseFloat(amount) * 100),
        order: orderId,
        xculqirsaid: CULQI_RSA_ID,
        rsapublickey: CULQI_RSA_PUBLIC_KEY,
      };

      const client = {
        email: email, // Usamos el email del formulario
      };
      
      const options = {
        lang: 'es',
        installments: false, // Opcional: Desactivar cuotas para donaciones
        modal: false, // MUY IMPORTANTE: false para que se embeba
        container: "#culqi-container", // El ID del div donde se renderizará
        paymentMethods: {
          tarjeta: true,
          yape: true,
        },
      };

      const appearance = {
        theme: "default",
        logo: 'https://storage.googleapis.com/gpt-engineer-file-uploads/8aDbpL6fMNjKnGgMUWLBCDTlt1/uploads/1760017704309-logo-alma-final.webp',
        menuType: "sidebar", // El estilo de menú que estás usando
        variables: { 
          fontFamily: "inherit", 
          borderRadius: "8px",
          // Puedes añadir más variables aquí si quieres
        },
        
        // --- REGLAS DE ESTILO PARA AGRANDAR EL FORMULARIO ---
        rules: {
          // Aumenta el padding general del área donde van los campos del formulario
          ".Culqi-Main-Method": {
            padding: "1.5rem", // Más espacio alrededor de los campos
          },

          // Hace que las pestañas del menú (Tarjeta, Yape) sean más altas
          ".Culqi-Menu-Item": {
            padding: "1.25rem 1rem", // Aumenta el padding vertical de cada item
            "font-size": "1rem",     // Aumenta el tamaño de la fuente del menú
          },

          // Aumenta el tamaño de la fuente de los títulos de los campos (labels)
          ".Culqi-Label": {
            "font-size": "0.875rem",  // 14px
            "margin-bottom": "0.5rem",// Más espacio debajo del label
            "font-weight": "500",
          },

          // LA REGLA MÁS IMPORTANTE: Agranda los campos de texto
          ".Culqi-Input": {
            height: "3.5rem",         // ¡Campo de texto mucho más alto! (aprox 56px)
            "font-size": "1.125rem",  // Texto dentro del input más grande (18px)
            padding: "0 1rem",        // Padding interno horizontal
          },

          // Hace que el botón de pago (que aparecerá después) coincida con el tamaño de los inputs
          ".Culqi-Button": {
            height: "3.5rem",
            "font-size": "1rem",
            "font-weight": "600",
          },
        },
      };
      
      const config = { settings, client, options, appearance };

      // Creamos la instancia y la guardamos en la ref
      const culqi = new window.CulqiCheckout(CULQI_PUBLIC_KEY, config);
      culqi.culqi = handleCulqiResult; // Asignamos el callback
      culqi.open(); // Renderizamos el formulario en el container
      
      culqiInstanceRef.current = culqi;
    }

    // Función de limpieza para destruir la instancia si el componente se desmonta
    return () => {
      if (culqiInstanceRef.current && typeof culqiInstanceRef.current.destroy === 'function') {
        culqiInstanceRef.current.destroy();
        culqiInstanceRef.current = null;
      }
    };
  }, [orderId, amount, email]); // Dependencias del efecto


  const handleDonate = async () => {
    // 1. Validaciones
    if (paymentStatus === 'processing') return;

    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      setError("Por favor, ingresa un monto válido.");
      return;
    }
    if (!firstName || !lastName || !email || !phone) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    
    setError("");
    setPaymentStatus('processing');

    try {
      // 2. Crear la orden en el backend
      const orderResponse = await fetch(`${API_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: donationAmount, firstName, lastName, email, phone }),
      });
      const orderData = await orderResponse.json();
      if (!orderResponse.ok || !orderData.orderId) {
        throw new Error(orderData.message || "Error al crear la orden de pago.");
      }
      
      // CAMBIO 4: En lugar de abrir Culqi, solo guardamos la orderId.
      // El useEffect se encargará del resto.
      setOrderId(orderData.orderId);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ocurrió un error inesperado.";
      setError(errorMessage);
      setPaymentStatus('ready');
    }
  };

  // Vistas de éxito y error (sin cambios)
  if (paymentStatus === 'success') {
    
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4">
        <ShieldCheck className="w-16 h-16 text-green-500 mb-4" />
        <h1 className="font-display text-3xl text-gray-800 mb-4">¡Donación exitosa!</h1>
        <p className="text-gray-600 max-w-md mb-8">
          Gracias por tu generosidad. Tu apoyo nos ayuda a seguir creando un impacto positivo.
        </p>
        <Button asChild>
          <Link to="/">
            <Heart className="mr-2 h-4 w-4" /> Volver al Inicio
          </Link>
        </Button>
      </div>
    );

  }

  if (paymentStatus === 'error') {
    // Modificamos el botón para reiniciar el flujo completo
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4">
        <ShieldX className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="font-display text-3xl text-gray-800 mb-4">Ocurrió un error</h1>
        <p className="text-gray-600 max-w-md mb-8">{error}</p>
        <Button onClick={() => {
          setError("");
          setOrderId(null); // Reiniciar la orden
          culqiInstanceRef.current = null; // Limpiar la instancia
          setPaymentStatus('ready');
        }}>
          Intentar de Nuevo
        </Button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 pt-20">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} />
            <span>Volver al inicio</span>
          </Link>
          <div className="max-w-md mx-auto">
            {/* CAMBIO 5: Lógica de renderizado condicional */}
            
            {/* Si aún no tenemos orden, mostramos el formulario de datos */}
            {!orderId && (
              <>
                <div className="text-center mb-8">
                  <h1 className="font-display text-3xl text-gray-800 mb-4">Haz una donación única</h1>
                  <p className="text-gray-600">Tu contribución apoya nuestros programas.</p>
                </div>
                <div className="space-y-4">
                    <Card>
                        <div className="p-4">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                                Monto de la donación (PEN)
                            </label>
                            <div className="flex items-center">
                                <span className="text-gray-500 mr-2">S/</span>
                                <Input
                                    id="amount"
                                    type="text"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="20.00"
                                    className="text-lg"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                <Button variant="outline" onClick={() => setAmount("20.00")}>S/ 20</Button>
                                <Button variant="outline" onClick={() => setAmount("50.00")}>S/ 50</Button>
                                <Button variant="outline" onClick={() => setAmount("100.00")}>S/ 100</Button>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Juan" />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Pérez" />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="juan.perez@example.com" />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
                                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="987654321" />
                            </div>
                        </div>
                    </Card>

                    <Button variant="default" size="lg" className="w-full" onClick={handleDonate} disabled={paymentStatus === 'processing'}>
                        {paymentStatus === 'processing' ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando...</> : <>Continuar al Pago</>}
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-600 mt-4">
                  <p>Tu donación es libre de impuestos</p>
                </div>

                <div className="mt-6 text-sm text-gray-600">
                  <h3 className="font-semibold text-center mb-2">Otras formas de donar:</h3>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="font-semibold">Transferencia Bancaria</p>
                    <p><strong>CCI:</strong> 00312345678901234567</p>
                    <p><strong>Cuenta:</strong> 123-456789-012</p>
                    <p className="font-semibold mt-2">Yape / Plin</p>
                    <p><strong>Número:</strong> 987 654 321</p>
                  </div>
                </div>
              </>
            )}

            {/* Cuando ya tenemos la orden, mostramos el contenedor para Culqi */}
            {orderId && (
              <div className="w-full">
                <h2 className="text-center font-display text-2xl text-gray-800 mb-6">Completa tu donación</h2>
                
                {/*
                  AQUÍ ESTÁ EL CAMBIO CLAVE:
                  Le damos una altura mínima y estilos visuales al contenedor de Culqi.
                */}
                <div 
                  id="culqi-container" 
                  className="w-full min-h-[550px] border rounded-lg shadow-lg overflow-hidden"
                >
                  {/* Culqi se renderizará aquí. No hay nada más. */}
                </div>
              </div>
            )}
            
            {error && <p className="text-sm text-red-600 text-center mt-4">{error}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Donar;