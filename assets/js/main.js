// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    /* Hero video parallax effect
    gsap.to(".hero-video video", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-video",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });*/

    // Floating text in hero
    gsap.to(".floating", {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Flip animation for service cards (solo alterna la clase .flipped)
    document.querySelectorAll('.flip-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.service-card');
            card.classList.toggle('flipped');
        });
    });

    // Partners logos animation
   document.addEventListener('DOMContentLoaded', function () {
    const partners = gsap.utils.toArray('.partner-logo');

    if (partners.length === 0) {
        console.warn("No se encontraron elementos con la clase .partner-logo");
        return;
    }

    gsap.set(partners, { x: (i) => i * 200 });

    function horizontalLoop(items, config) {
        config = config || {};
        if (!items.length) return;

        let tl = gsap.timeline({
            repeat: config.repeat,
            paused: config.paused,
            defaults: { ease: "none" },
            onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
        });

        let length = items.length;
        let times = [], widths = [], xPercents = [];

        items.forEach((el, i) => {
            widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
            xPercents[i] = parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100;
            times[i] = Math.abs((xPercents[i] - xPercents[(i + 1) % length]) / 100) * widths[i];
        });

        let totalTime = times.reduce((a, b) => a + b);
        let time = 0;
        let i = 0;

        while (time < totalTime) {
            let cycleTime = times[i];
            tl.to(items, {
                xPercent: "+=" + (xPercents[(i + 1) % length] - xPercents[i]),
                duration: cycleTime / 100
            }, time);
            time += cycleTime;
            i = (i + 1) % length;
        }

        return tl;
    }

    const loop = horizontalLoop(partners, {
        repeat: -1,
        center: false,
        speed: 1,
        paused: false
    });

    ScrollTrigger.create({
        trigger: ".partners-section",
        start: "top bottom",
        end: "bottom top",
        onEnter: () => loop && loop.play(),
        onLeave: () => loop && loop.pause(),
        onEnterBack: () => loop && loop.play(),
        onLeaveBack: () => loop && loop.pause()
    });
});



//Hash 

  document.addEventListener("DOMContentLoaded", function () {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        // Espera un poco para asegurar que todo esté cargado
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  });



    // Testimonials stagger animation
    if (document.querySelector('#testimonials-section')) {
    gsap.from(".testimonial-stagger .col-md-4", {
        scrollTrigger: {
            trigger: "#testimonials-section",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out"
    });
}

    // FAQ accordion icon animation
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('i');
            if (button.classList.contains('collapsed')) {
                gsap.to(icon, {rotation: 0, duration: 0.3});
            } else {
                gsap.to(icon, {rotation: 90, duration: 0.3});
            }
        });
    });

    // Form labels wave effect
    document.querySelectorAll('.form-label').forEach(label => {
        label.addEventListener('click', () => {
            gsap.fromTo(label, 
                {y: 0}, 
                {y: -5, duration: 0.1, yoyo: true, repeat: 1, ease: "sine.inOut"}
            );
        });
    });

    // Initialize map
   
});

// FAQ Schema Markup
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "¿Qué incluye el servicio de alquiler de impresoras?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nuestro servicio de alquiler incluye el equipo de impresión, mantenimiento preventivo y correctivo, repuestos originales, soporte técnico 24/7, actualización de equipos cuando sea necesario, y suministro de tóner o tinta sin costo adicional por impresión. Solo pagas una tarifa mensual fija según el modelo de impresora."
            }
        },
        {
            "@type": "Question",
            "name": "¿Son originales las licencias de software que venden?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sí, todas nuestras licencias son 100% originales y oficiales. Somos distribuidores autorizados de los principales fabricantes de software. Con cada compra recibes el certificado de autenticidad y acceso al soporte oficial del fabricante. No trabajamos con licencias OEM, académicas o de cualquier otro tipo que no sea la versión comercial completa."
            }
        },
        {
            "@type": "Question",
            "name": "¿Qué tiempos de respuesta tienen para soporte técnico?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nuestro tiempo de respuesta promedio es de menos de 2 horas para problemas críticos (equipo no funciona) y menos de 4 horas para problemas no críticos. Ofrecemos soporte remoto inmediato las 24 horas del día, los 7 días de la semana. Para soporte presencial, dependiendo de tu ubicación, podemos estar en tus instalaciones en un máximo de 4 horas en la zona metropolitana."
            }
        },
        {
            "@type": "Question",
            "name": "¿Pueden manejar contratos corporativos para múltiples ubicaciones?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutamente. Tenemos experiencia manejando contratos corporativos con cobertura nacional e internacional. Podemos proporcionar equipos y soporte en múltiples ubicaciones con un único punto de contacto y reportes consolidados. Ofrecemos descuentos por volumen y planes personalizados según las necesidades de cada sede o sucursal."
            }
        },
        {
            "@type": "Question",
            "name": "¿Qué métodos de pago aceptan?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Aceptamos todas las formas de pago: transferencia bancaria, tarjetas de crédito (hasta 12 meses sin intereses), PayPal, y efectivo. Para clientes corporativos podemos establecer pagos recurrentes con facturación electrónica y condiciones especiales de crédito según historial crediticio."
            }
        }
    ]
};

// Add FAQ schema to the page
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(faqSchema);
document.head.appendChild(script);

// Mostrar/ocultar el botón al hacer scroll
/*const btnTop = document.getElementById('btn-top');
window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
        btnTop.style.display = 'block';
    } else {
        btnTop.style.display = 'none';
    }
});

// Scroll suave hacia arriba
btnTop.addEventListener('click', function() {
   window.scrollTo({ top: 0, behavior: 'smooth' });
});*/

// Inicializa AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function () {
    var script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js";
    script.onload = function() {
        AOS.init({
            duration: 1000, // duración de la animación en ms
            once: false    // solo animar una vez = NO
        });
    };
    document.body.appendChild(script);
});


//script de animacion de estadisticas

document.addEventListener("DOMContentLoaded", function() {
    function animateCount(el, target, duration = 2500) {
        let start = 0;
        let startTime = null;
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        function updateCount(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            el.textContent = prefix + Math.floor(progress * (target - start) + start) + suffix;
            if (progress < 1) {
                el._counting = true;
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = prefix + target + suffix;
                el._counting = false;
            }
        }
        if (!el._counting) {
            el._counting = true;
            requestAnimationFrame(updateCount);
        }
    }

    function animateStatsOnView() {
        const stats = document.querySelectorAll('.stat-number');
        function onScroll() {
            const section = document.querySelector('.about-section');
            if (!section) return;
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                stats.forEach(el => {
                    const target = parseInt(el.getAttribute('data-count'), 10);
                    if (parseInt(el.textContent, 10) !== target) {
                        animateCount(el, target);
                    }
                });
            } else {
                stats.forEach(el => {
                    const prefix = el.getAttribute('data-prefix') || '';
                    const suffix = el.getAttribute('data-suffix') || '';
                    el.textContent = prefix + "0" + suffix;
                });
            }
        }
        window.addEventListener('scroll', onScroll);
        onScroll();
    }

    animateStatsOnView();
});


//pagina de servicios -  pagina de servicios - pagina de servicios

document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('introVideo');
  if (!video) return; // Evita errores si no existe

  const wrapper = video.closest('.video-wrapper');
  if (!wrapper) return;

  function updateOverlay() {
    if (video.paused) {
      wrapper.classList.remove('playing');
    } else {
      wrapper.classList.add('playing');
    }
  }

  video.addEventListener('play', updateOverlay);
  video.addEventListener('pause', updateOverlay);
  updateOverlay(); // Estado inicial
});

document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('introVideo');
  if (!video) return;

  const playBtn = document.getElementById('customPlay');
  const wrapper = video.closest('.video-wrapper');

  if (!playBtn || !wrapper) return;

  video.removeAttribute('controls');

  function showCustomPlay() {
    playBtn.style.display = '';
    video.removeAttribute('controls');
  }

  function hideCustomPlay() {
    playBtn.style.display = 'none';
    video.setAttribute('controls', 'controls');
  }

  playBtn.addEventListener('click', function() {
    video.play();
    hideCustomPlay();
  });

  video.addEventListener('play', hideCustomPlay);

  video.addEventListener('pause', function() {
    if (!video.ended) {
      showCustomPlay();
    }
  });

  video.addEventListener('ended', showCustomPlay);

  showCustomPlay(); // Estado inicial
});


// timeline

"use strict";
const DOM = {
    timeline: "timeline",
    timelineStepper: "timeline__stepper",
    timelineStep: "timeline__step",
    timelineStepTitle: "timeline__step-title",
    timelineStepActive: "is-active",
    timelineStepActiveMarker: "timeline__step-active-marker",
    timelineSlidesContainer: "timeline__slides",
    timelineSlide: "timeline__slide",
    timelineSlideActive: "is-active",
};
const STEP_ACTIVE_MARKEP_CUSTOM_PROPS = {
    width: "--slide-width",
    posX: "--slide-pos-x",
    posY: "--slide-pos-y",
};
const SLIDES_CONTAINER_CUSTOM_PROPS = {
    height: "--slides-container-height",
};
const timeline = document.querySelector(`.${DOM.timeline}`);
const timelineStepper = timeline === null || timeline === void 0 ? void 0 : timeline.querySelector(`.${DOM.timelineStepper}`);
const timelineStepTitle = timeline === null || timeline === void 0 ? void 0 : timeline.querySelector(`.${DOM.timelineStepTitle}`);
const timelineSlidesContainer = timeline === null || timeline === void 0 ? void 0 : timeline.querySelector(`.${DOM.timelineSlidesContainer}`);
const timelineSlides = timeline && Array.from(timeline.querySelectorAll(`.${DOM.timelineSlide}`));
window.addEventListener("load", () => {
    createStepActiveMarker();
    activateCurrentSlide();
});
window.addEventListener("resize", () => {
    recalcStepActiveMarkerProps();
});
timeline === null || timeline === void 0 ? void 0 : timeline.addEventListener("click", (event) => {
    const { target } = event;
    if (!target ||
        !(target instanceof Element) ||
        !target.closest(`.${DOM.timelineStep}`)) {
        return;
    }
    const currentStep = target.closest(`.${DOM.timelineStep}`);
    if (!currentStep) {
        return;
    }
    deactivateSteps();
    activateCurrentStep(currentStep);
    recalcStepActiveMarkerProps();
    deactivateSlides();
    activateCurrentSlide();
});
function deactivateSteps() {
    const steps = document.querySelectorAll(`.${DOM.timelineStep}`);
    steps === null || steps === void 0 ? void 0 : steps.forEach((elem) => elem.classList.remove(`${DOM.timelineStepActive}`));
}
function activateCurrentStep(currentStep) {
    currentStep === null || currentStep === void 0 ? void 0 : currentStep.classList.add(`${DOM.timelineStepActive}`);
}
function deactivateSlides() {
    timelineSlides === null || timelineSlides === void 0 ? void 0 : timelineSlides.forEach((elem) => elem.classList.remove(`${DOM.timelineSlideActive}`));
}
function activateCurrentSlide() {
    const currentSlide = getCurrentSlide();
    if (!currentSlide) {
        return;
    }
    const currentSlideHeight = getCurrentSlideHeight(currentSlide);
    setSlideContainerHeight(currentSlideHeight);
    currentSlide.classList.add(`${DOM.timelineSlideActive}`);
}
function createStepActiveMarker() {
    const stepActiveMarker = document.createElement("div");
    stepActiveMarker.classList.add(`${DOM.timelineStepActiveMarker}`);
    timelineStepper === null || timelineStepper === void 0 ? void 0 : timelineStepper.appendChild(stepActiveMarker);
    const positionProps = getStepActiveMarkerProps();
    if (!positionProps) {
        return;
    }
    setStepActiveMarkerProps(Object.assign({ stepActiveMarker }, positionProps));
}
function recalcStepActiveMarkerProps() {
    const stepActiveMarker = timeline === null || timeline === void 0 ? void 0 : timeline.querySelector(`.${DOM.timelineStepActiveMarker}`);
    const stepActiveMarkerProps = getStepActiveMarkerProps();
    if (!stepActiveMarkerProps) {
        return;
    }
    setStepActiveMarkerProps(Object.assign({ stepActiveMarker }, stepActiveMarkerProps));
}
function setStepActiveMarkerProps({ stepActiveMarker, posX, posY, width, }) {
    stepActiveMarker.style.setProperty(`${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.width}`, `${width}px`);
    stepActiveMarker.style.setProperty(`${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.posX}`, `${posX}px`);
    if (typeof posY === "number") {
        stepActiveMarker.style.setProperty(`${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.posY}`, `${posY}px`);
    }
}
function getStepActiveMarkerProps() {
    const { currentStep } = getCurrentStep();
    if (!currentStep) {
        return null;
    }
    const width = getElementWidth(currentStep);
    const posX = getStepActiveMarkerPosX(currentStep);
    const posY = getStepActiveMarkerPosY();
    if (typeof posX !== "number" || typeof posY !== "number") {
        return null;
    }
    return { posX, posY, width };
}
function getCurrentStep() {
    const timelineSteps = Array.from(document.querySelectorAll(`.${DOM.timelineStep}`));
    const currentStep = timelineSteps.find((element) => element.classList.contains(`${DOM.timelineStepActive}`));
    const currentStepIndex = currentStep &&
        timelineSteps.findIndex((element) => element.classList.contains(`${DOM.timelineStepActive}`));
    return { currentStep, currentStepIndex };
}
function getCurrentSlide() {
    const { currentStepIndex } = getCurrentStep();
    if (typeof currentStepIndex !== "number" || !timelineSlides) {
        return null;
    }
    return timelineSlides[currentStepIndex];
}
function setSlideContainerHeight(height) {
    timelineSlidesContainer === null || timelineSlidesContainer === void 0 ? void 0 : timelineSlidesContainer.style.setProperty(`${SLIDES_CONTAINER_CUSTOM_PROPS.height}`, `${height}px`);
}
function getCurrentSlideHeight(currentSlide) {
    return currentSlide.clientHeight;
}
function getStepActiveMarkerPosY() {
    const timelineTitlePosY = timelineStepTitle === null || timelineStepTitle === void 0 ? void 0 : timelineStepTitle.getBoundingClientRect().top;
    const timelineStepperPosY = timelineStepper === null || timelineStepper === void 0 ? void 0 : timelineStepper.getBoundingClientRect().top;
    if (!timelineTitlePosY || !timelineStepperPosY) {
        return null;
    }
    return timelineTitlePosY - timelineStepperPosY;
}
function getStepActiveMarkerPosX(currentStep) {
    const timelineStepperPosX = timelineStepper === null || timelineStepper === void 0 ? void 0 : timelineStepper.getBoundingClientRect().left;
    const currentStepPosX = currentStep.getBoundingClientRect().left;
    if (!timelineStepperPosX) {
        return null;
    }
    return currentStepPosX - timelineStepperPosX;
}
function getElementWidth(elem) {
    return elem.clientWidth;
}

//value-carousel 

const carousel = document.getElementById("carousel");
const leftBtn = document.querySelector(".nav.left");
const rightBtn = document.querySelector(".nav.right");

// Duplicar tarjetas para efecto infinito visual
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel');
  const leftBtn = document.querySelector('.nav.left');
  const rightBtn = document.querySelector('.nav.right');

  if (!carousel || !leftBtn || !rightBtn) return;

  // Clona las tarjetas para efecto de bucle
  const cards = carousel.querySelectorAll('.card');
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    carousel.appendChild(clone);
  });

  let scrollAmount = 0;
  const cardWidth = 225; // Ajusta esto si usas padding/margins reales
  const maxScroll = carousel.scrollWidth / 2;

  rightBtn.addEventListener("click", () => {
    scrollAmount += cardWidth;
    if (scrollAmount >= maxScroll) {
      scrollAmount = 0;
      carousel.scrollTo({ left: 0, behavior: "instant" });
    } else {
      carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  });

  leftBtn.addEventListener("click", () => {
    scrollAmount -= cardWidth;
    if (scrollAmount < 0) {
      scrollAmount = maxScroll - cardWidth;
      carousel.scrollTo({ left: scrollAmount, behavior: "instant" });
    } else {
      carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  });
});





// preloader

window.addEventListener("load", () => {
  console.log("Página cargada");
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }
});

//simulacion de envio

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita el envío real

        // Opcional: mostrar datos por consola
        const formData = new FormData(form);
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        const asunto = formData.get('asunto');
        const mensaje = formData.get('mensaje');
        console.log({ nombre, email, asunto, mensaje });

        // Mostrar mensaje simulado
        //alert("Gracias, tu mensaje fue enviado (simulado).");

        // Redirigir a página de gracias si la tienes
        window.location.href = "/php/gracias.html#thanks";

        // O reiniciar el formulario
        //form.reset();
      });
    }
  });