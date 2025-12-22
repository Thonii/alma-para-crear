import { useEffect, useState } from 'react';

declare global {
    interface Window {
        Culqi: any;
        culqi: any;
    }
}

interface UseCulqiProps {
    publicKey: string;
    onTokenGenerated: (token: string) => void;
    onError?: (error: any) => void;
}

export const useCulqi = ({ publicKey, onTokenGenerated, onError }: UseCulqiProps) => {
    const [isReady, setIsReady] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        // 1. Check if script exists, if not inject it
        const scriptId = 'culqi-checkout-js';
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        if (!script) {
            // Check if it was loaded without ID (e.g. from index.html)
            const scripts = document.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
                if (scripts[i].src.includes('culqi.com/checkout-js')) {
                    script = scripts[i];
                    break;
                }
            }
        }

        if (!script) {
            console.log("Injecting Culqi script...");
            script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://js.culqi.com/checkout-js';
            script.async = true;
            document.body.appendChild(script);
        }

        const initCulqi = () => {
            if (window.Culqi) {
                console.log("Culqi global found. Initializing...");
                try {
                    window.Culqi.publicKey = publicKey;
                    // Force init if method exists, just in case
                    if (typeof window.Culqi.init === 'function') {
                        window.Culqi.init();
                    }
                    setIsReady(true);
                    setScriptLoaded(true);
                    console.log("Culqi ready.");
                } catch (e) {
                    console.error("Error setting public key or init", e);
                }
            } else {
                console.warn("Culqi script loaded event fired, but window.Culqi is undefined");
            }
        };

        if (window.Culqi) {
            initCulqi();
        } else {
            // Listener for load event
            script.addEventListener('load', initCulqi);

            // Fallback polling
            const interval = setInterval(() => {
                if (window.Culqi) {
                    initCulqi();
                    clearInterval(interval);
                }
            }, 500);

            return () => {
                script.removeEventListener('load', initCulqi);
                clearInterval(interval);
            };
        }
    }, [publicKey]);

    useEffect(() => {
        // Define the global culqi callback
        window.culqi = () => {
            console.log("Culqi callback triggered");
            if (window.Culqi.token) {
                onTokenGenerated(window.Culqi.token.id);
                window.Culqi.close();
            } else if (window.Culqi.error) {
                console.error('Culqi Error:', window.Culqi.error);
                if (onError) onError(window.Culqi.error);
                else alert(window.Culqi.error.user_message);
            }
        };
    }, [onTokenGenerated, onError]);

    const openCheckout = (amount: number, currency: string = 'PEN', description: string = 'Donación a Alma para Crear', email?: string) => {
        if (!window.Culqi) {
            console.error('Culqi not loaded when openCheckout called');
            // Last ditch attempt/check
            return;
        }

        // Ensure config is set
        window.Culqi.publicKey = publicKey;

        const settings = {
            title: 'Alma para Crear',
            currency: currency,
            description: description,
            amount: Math.round(amount * 100), // Culqi expects amount in cents
            ...(email && { email }),
        };

        window.Culqi.settings(settings);
        window.Culqi.options({
            style: {
                logo: 'https://storage.googleapis.com/gpt-engineer-file-uploads/8aDbpL6b0FMNjKnGgMUWLBCDTlt1/uploads/1760017704309-logo-alma-final.webp',
                maincolor: '#FF6B6B',
            }
        });
        window.Culqi.open();
    };

    return { isReady, openCheckout };
};
