const reasons = {
    330: "Te amo porque, incluso cuando el mundo cambia constantemente, hay algo en mí que siempre encuentra el camino de regreso a ti.",
    331: "Te amo porque no quiero una historia perfecta contigo; quiero una historia real, donde ambos aprendamos, tropecemos y sigamos eligiéndonos.",
    332: "Te amo porque jamás quisiera que sintieras que tienes que cargar solo con tus batallas. Si pesan demasiado, déjame sostener una parte.",
    333: "Te amo porque si algún día olvidas lo increíble que eres, yo me quedaré el tiempo que haga falta recordándotelo.",
    334: "Te amo porque nunca he sentido que amarte sea un esfuerzo. Incluso en los días difíciles, elegirte sigue siendo natural.",
    335: "Te amo porque hay una paz en tu presencia que no he encontrado en ningún otro lugar.",
    336: "Te amo porque, cuando el miedo intenta convencerme de rendirme, pensar en nosotros siempre me devuelve el valor para seguir.",
    337: "Te amo porque has convertido el \"para siempre\" en algo que ya no me asusta, sino que me ilusiona.",
    338: "Te amo porque no me enamoré solo de quien eres hoy, sino también de todas las personas en las que te convertirás con el paso del tiempo.",
    339: "Te amo porque quiero celebrar cada una de tus victorias, incluso aquellas que el resto del mundo nunca llegue a notar.",
    340: "Te amo porque deseo ser el lugar donde siempre puedas descansar cuando la vida se vuelva demasiado pesada.",
    341: "Te amo porque nunca quisiera que enfrentaras una tormenta pensando que estás solo. Mientras pueda, caminaré a tu lado.",
    342: "Te amo porque contigo aprendí que el amor verdadero no consiste en necesitar a alguien, sino en agradecer profundamente que exista.",
    343: "Te amo porque no importa cuánto tiempo pase; siempre encuentro una razón nueva para admirarte.",
    344: "Te amo porque jamás me cansaré de aprender quién eres. Cada etapa tuya será una nueva oportunidad para enamorarme otra vez.",
    345: "Te amo porque eres tú. Y, curiosamente, esa ha sido siempre la razón más grande de todas.",
    346: "Te amo porque, si tuviera la oportunidad de volver a vivir mi vida desde el principio, volvería a buscarte hasta encontrarte otra vez.",
    347: "Te amo porque contigo entendí que el amor más fuerte no es el que nunca cambia, sino el que decide permanecer mientras ambos cambian.",
    348: "Te amo porque me haces creer que existen personas capaces de transformar una vida solo con su manera de querer.",
    349: "Te amo porque jamás quisiera que dejaras de prseguir tus sueños, y me haría feliz acompañarte mientras los alcanzas.",
    350: "Te amo porque, incluso en los días en los que ninguno de los dos tenga fuerzas, sé que podremos apoyarnos mutuamente para seguir adelante.",
    351: "Te amo porque tu felicidad nunca ha sido una competencia con la mía; siempre ha sido una alegría compartida.",
    352: "Te amo porque no necesito que prometas no cambiar. Solo espero poder conocer y amar cada nueva versión de ti.",
    353: "Te amo porque, si algún día la rutina intenta apagar el brillo de las cosas, haré todo lo posible por seguir encontrando magia en nosotros.",
    354: "Te amo porque eres el tipo de persona que hace que el amor se sientas como un hogar y no como una incertidumbre.",
    355: "Te amo porque nunca me has dado motivos para dejar de creer en lo que estamos construyendo.",
    356: "Te amo porque cada recuerdo contigo confirma que el mejor lugar donde he estado siempre ha sido a tu lado.",
    357: "Te amo porque no quiero una vida sin problemas; quiero una vida en la que podamos resolverlos juntos.",
    358: "Te amo porque has logrado que las palabras \"nosotros\" y \"futuro\" se sientan naturalmente unidas en mi corazón.",
    359: "Te amo porque, aunque el tiempo pase muy rápido, espero que nunca pase tan rápido como para dejar de sorprenderme contigo.",
    360: "Te amo porque cada día contigo me convence un poco más de que el amor no se mide por cuánto dura, sino por cómo se vive.",
    361: "Te amo porque, si alguna vez sientes que el mundo entero está en tu contra, quiero que recuerdes que siempre tendrás un lugar seguro en mí.",
    362: "Te amo porque no sé qué aventuras nos esperan, pero sé que cualquiera de ellas será mejor si puedo vivirla contigo.",
    363: "Te amo porque, después de todo este tiempo, todavía hay momentos en los que te miro y mi corazón se pregunta cómo tuvo tanta suerte.",
    364: "Te amo porque, cuando pienso en lo mejor que me ha pasado en la vida, tu nombre aparece antes que cualquier recuerdo.",
    365: "Te amo porque, después de escribir tantas razones, descubrí algo muy simple: ninguna logra explicar completamente lo que siento por ti. Si tuviera que escribir una razón más cada día que pase a tu lado, lo haría con gusto durante el resto de mi vida, porque amarte nunca cabrá en una lista. Cabrá, eso sí, en cada día que elija compartir contigo."
};

let currentReasonKey = 330;
let typewriterInterval = null;
let isTyping = false;

// Elementos de la interfaz
const introScreen = document.getElementById('introScreen');
const startBtn = document.getElementById('startBtn');
const archiveContainer = document.getElementById('archiveContainer');
const book = document.getElementById('book');
const coverFront = document.getElementById('coverFront');
const leftPage = document.getElementById('leftPage');
const rightPage = document.getElementById('rightPage');
const reasonTextElement = document.getElementById('reasonText');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageIndicator = document.getElementById('pageIndicator');
const finalScreen = document.getElementById('finalScreen');

// Elementos del Captcha
const captchaModal = document.getElementById('captchaModal');
const captchaItems = document.querySelectorAll('.captcha-item');
const verifyBtn = document.getElementById('verifyBtn');
const captchaError = document.getElementById('captchaError');
const resetCaptcha = document.getElementById('resetCaptcha');

// --- LÓGICA INTERACTIVA DEL CAPTCHA ---

// 1. Abrir Captcha al presionar el botón de inicio
startBtn.addEventListener('click', () => {
    captchaModal.classList.add('active');
});

// 2. Marcar/Desmarcar casillas
captchaItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('selected');
        captchaError.style.display = 'none'; // Ocultar error al tocar otra casilla
    });
});

// 3. Botón de Verificar
verifyBtn.addEventListener('click', () => {
    let allCorrect = true;
    let selectedCount = 0;

    captchaItems.forEach(item => {
        const isSelected = item.classList.contains('selected');
        const isCorrectTarget = item.getAttribute('data-correct') === 'true';

        if (isSelected) selectedCount++;

        // Si está seleccionada pero es falsa, o si era correcta pero NO se seleccionó: error.
        if ((isSelected && !isCorrectTarget) || (!isSelected && isCorrectTarget)) {
            allCorrect = false;
        }
    });

    // Validar que al menos haya seleccionado las 3 correctas
    if (allCorrect && selectedCount === 3) {
        // ¡CÓDIGO CORRECTO! Pasar al libro
        captchaModal.classList.remove('active');
        introScreen.classList.remove('active');
        introScreen.classList.add('hidden');
        archiveContainer.classList.remove('hidden');
        
        setTimeout(() => {
            openBook();
        }, 600);
    } else {
        // Error en la selección
        captchaError.style.display = 'block';
        // Animación rápida de sacudida por error
        captchaModal.style.transform = 'translate(-50%, -50%) cubic-bezier(.36,.07,.19,.97) both';
        setTimeout(() => { captchaModal.style.transform = 'translate(-50%, -50%)'; }, 500);
    }
});

// 4. Reiniciar casillas
resetCaptcha.addEventListener('click', () => {
    captchaItems.forEach(item => item.classList.remove('selected'));
    captchaError.style.display = 'none';
});


// --- LÓGICA DEL LIBRO INTERACTIVO ---

function openBook() {
    coverFront.classList.add('turned');
    book.style.transform = "translateX(25%)";
    updatePageContent();
}

function typeWriter(text, element, speed = 40) {
    clearInterval(typewriterInterval);
    isTyping = true;
    element.classList.remove('done');
    element.textContent = "";
    let index = 0;

    typewriterInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(typewriterInterval);
            isTyping = false;
            element.classList.add('done');
        }
    }, speed);
}

function updatePageContent() {
    const leftContent = leftPage.querySelector('.page-content');
    leftContent.innerHTML = "";
    
    const indexTitle = document.createElement('h4');
    indexTitle.style.fontFamily = 'monospace';
    indexTitle.style.color = '#6c5ce7';
    indexTitle.style.marginBottom = '20px';
    indexTitle.textContent = `ENTRY_LOG #${currentReasonKey}`;
    leftContent.appendChild(indexTitle);

    if (currentReasonKey > 330) {
        const prevReasonBox = document.createElement('div');
        prevReasonBox.className = 'old-reason';
        prevReasonBox.textContent = `${currentReasonKey - 1}. ${reasons[currentReasonKey - 1].substring(0, 80)}...`;
        leftContent.appendChild(prevReasonBox);
    }

    const stamp = document.createElement('div');
    stamp.style.marginTop = 'auto';
    stamp.style.fontSize = '0.8rem';
    stamp.style.color = '#4a3b8c';
    stamp.style.fontFamily = 'monospace';
    stamp.textContent = `STATUS: ACTIVE // VAL_ID: EMA_${currentReasonKey}`;
    leftContent.appendChild(stamp);

    pageIndicator.textContent = `${currentReasonKey} / 365`;

    const fullText = `${currentReasonKey}. ${reasons[currentReasonKey]}`;
    typeWriter(fullText, reasonTextElement, 35);

    prevBtn.disabled = (currentReasonKey === 330);
    
    if (currentReasonKey === 365) {
        nextBtn.textContent = "Finalizar";
    } else {
        nextBtn.textContent = "Siguiente ▶";
    }
}

nextBtn.addEventListener('click', () => {
    if (isTyping) {
        clearInterval(typewriterInterval);
        reasonTextElement.textContent = `${currentReasonKey}. ${reasons[currentReasonKey]}`;
        reasonTextElement.classList.add('done');
        isTyping = false;
        return;
    }

    if (currentReasonKey === 365) {
        triggerCinematicFinal();
        return;
    }

    currentReasonKey++;
    updatePageContent();
});

prevBtn.addEventListener('click', () => {
    if (currentReasonKey > 330) {
        currentReasonKey--;
        updatePageContent();
    }
});

function triggerCinematicFinal() {
    document.getElementById('controls').style.pointerEvents = 'none';
    nextBtn.disabled = true;
    prevBtn.disabled = true;

    coverFront.classList.remove('turned');
    book.className = "book-container close-animation";
    
    setTimeout(() => {
        archiveContainer.style.opacity = "0";
    }, 1500);

    setTimeout(() => {
        archiveContainer.classList.add('hidden');
        finalScreen.classList.remove('hidden');
        finalScreen.classList.add('active');
    }, 2800);
}

// Fondo de Partículas (Fijo)
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.4 + 0.1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.fillStyle = `rgba(161, 140, 209, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 70; i++) particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();
