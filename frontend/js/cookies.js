// cookies.js
document.addEventListener('DOMContentLoaded', function() {
    // Comprobar si ya se han aceptado las cookies
    if (!getCookie('cookie_consent')) {
        showCookieBanner();
    } else {
        // Si ya están aceptadas, cargar los scripts según las preferencias
        loadServicesBasedOnPreferences();
    }
});

function showCookieBanner() {
    const bannerHTML = `
    <div id="cookie-banner" style="position: fixed; background: rgb(255, 255, 255); max-width: 360px; bottom: 20px; right: 20px; margin-left: 15px; color: white; padding: 20px; border-radius:14px; box-sizing: border-box; z-index: 10; display: flex; flex-direction: column; align-items: center;">
        <p style="margin: 0 0 15px 0;color: rgb(34, 34, 34); text-align:justify; font-size:14px; font-family: 'Inter', sans-serif; line-height: 1.6em;">
            Utilizamos cookies para mejorar tu experiencia, analizar el tráfico de la web y ofrecer contenido personalizado. Lee nuestra 
            <a href="politica-cookies.html" target="_blank" rel="noopener noreferrer" style="color: rgb(0, 153, 255); text-decoration: none;">Política de Cookies</a>.
        </p>
        <div style="display: flex; gap: 10px; width: 100%;  ">
            <button id="accept-all-cookies" style=" font-size: 15px; font-family: 'Inter', sans-serif; line-height: 1em; box-sizing: border-box; width:100%; padding: 8px ; background: rgb(238, 238, 238); color: black; font-weight: bold; border: none; border-radius: 8px; cursor: pointer;">Aceptar</button>
            <button id="configure-cookies" style=" font-size: 15px; font-family: 'Inter', sans-serif; line-height: 1em; box-sizing: border-box; width:100%; padding: 8px ; background:rgb(0, 0, 0); color: white; font-weight: bold; border:none; border-radius: 8px; cursor: pointer;">Configurar</button>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', bannerHTML);
    
    // Event listeners para los botones
    document.getElementById('accept-all-cookies').addEventListener('click', function() {
        setCookie('cookie_consent', 'all', 365);
        setCookie('analytics_cookies', 'true', 365);
        setCookie('ads_cookies', 'true', 365);
        document.getElementById('cookie-banner').remove();
        loadAllServices();
    });
    
    document.getElementById('configure-cookies').addEventListener('click', function() {
        showCookieSettings();
    });
}

function showCookieSettings() {
    const settingsHTML = `
    <div id="cookie-settings" style="font-family: 'Inter', sans-serif; position: fixed; margin-left: 20px; background: rgb(255, 255, 255); bottom: 20px; right: 20px; color: white; padding: 20px; border-radius:14px; box-sizing: border-box; z-index: 10; display: flex; flex-direction: column; align-items: flex-start;">
        <h3 style="margin-top: 0; color:black; text-align:center; width:100%; ">Configuración de cookies</h3>
        
        <div style="margin-bottom: 15px;">
            <label style="color: black; display: flex; align-items: center; font-size: 19px; cursor: pointer;">
                <input type="checkbox" id="necessary-cookies" checked disabled style="color: black; margin-right: 10px;">
                Estrictamente necesarias (siempre activado)
            </label>
            <p style="margin: 0 0 0 25px; text-align: justify; font-size: 16px; box-sizing: border-box; max-width: 400px; color: rgb(117, 117, 117);">
                Estas cookies son esenciales para que el sitio web funcione correctamente.
            </p>
        </div>
        
        <div style="margin-bottom: 15px;">
            <label style="color: black; display: flex; align-items: center; font-size: 19px; cursor: pointer;">
                <input type="checkbox" id="analytics-cookies" style=" accent-color: black; margin-right: 10px;">
                Rendimiento y análisis
            </label>
            <p style="margin: 0 0 0 25px; text-align: justify; font-size: 16px; box-sizing: border-box; max-width: 400px; color: rgb(117, 117, 117);">
                Permitir el uso de datos de comportamiento para optimizar el rendimiento, revisar cómo interactúas con nuestros sitios web.
            </p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <label style="color: black; display: flex; align-items: center; font-size: 19px; cursor: pointer;">
                <input type="checkbox" id="ads-cookies" style=" accent-color: black; margin-right: 10px;">
                Experiencia personalizada
            </label>
            <p style="margin: 0 0 0 25px; text-align: justify; font-size: 16px; box-sizing: border-box; max-width: 400px; color: rgb(117, 117, 117);">
                Mediante cookies y otras tecnologías se permite el uso de datos de comportamiento para mejorar tu experiencia 
                y ofrecerte contenido relevante en la plataforma.
            </p>
        </div>
        
        <div style="display: flex; gap: 10px; align-items: center; width: 100%;">
            <button id="save-settings" style="font-size: 15px; font-family: 'Inter', sans-serif; line-height: 1em; box-sizing: border-box; width:100%; padding: 8px ; background: rgb(238, 238, 238); color: black; font-weight: bold; border: none; border-radius: 8px; cursor: pointer;">Guardar preferencias</button>
            <button id="accept-all-in-settings" style="font-size: 15px; font-family: 'Inter', sans-serif; line-height: 1em; box-sizing: border-box; width:100%; padding: 8px ; background:rgb(0, 0, 0); color: white; font-weight: bold; border:none; border-radius: 8px; cursor: pointer;">Aceptar todas</button>
        </div>
    </div>
    `;
    
    // Reemplazar el banner con la configuración
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.remove();
    
    document.body.insertAdjacentHTML('beforeend', settingsHTML);
    
    // Event listeners para los botones de configuración
    document.getElementById('save-settings').addEventListener('click', function() {
        const analytics = document.getElementById('analytics-cookies').checked;
        const ads = document.getElementById('ads-cookies').checked;
        
        setCookie('cookie_consent', 'custom', 365);
        setCookie('analytics_cookies', analytics.toString(), 365);
        setCookie('ads_cookies', ads.toString(), 365);
        
        document.getElementById('cookie-settings').remove();
        loadServicesBasedOnPreferences();
    });
    
    document.getElementById('accept-all-in-settings').addEventListener('click', function() {
        setCookie('cookie_consent', 'all', 365);
        setCookie('analytics_cookies', 'true', 365);
        setCookie('ads_cookies', 'true', 365);
        document.getElementById('cookie-settings').remove();
        loadAllServices();
    });
}

function loadServicesBasedOnPreferences() {
    // Siempre cargar las cookies necesarias (ya están cargadas)
    
    // Cargar Google Analytics si está aceptado
    if (getCookie('analytics_cookies') === 'true') {
        loadGoogleAnalytics();
    }
    
    // Cargar Google Ads si está aceptado
    if (getCookie('ads_cookies') === 'true') {
        loadGoogleAds();
    }
}

function loadAllServices() {
    loadGoogleAnalytics();
    loadGoogleAds();
}

function loadGoogleAnalytics() {
    // 1. Cargar el script de gtag.js dinámicamente
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-5QER3ELVCS';
    document.head.appendChild(gtagScript);

    // 2. Configurar dataLayer y función gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-5QER3ELVCS');

    console.log('Google Analytics cargado correctamente'); // Para depuración
}

function loadGoogleAds() {
    // Asegúrate de que el script de Google Ads solo se carga si está aceptado
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7982978132653173';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
    console.log('Google Ads cargado');
}

// Funciones auxiliares para manejar cookies
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
}

function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}