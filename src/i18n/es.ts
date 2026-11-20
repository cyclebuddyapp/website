// Spanish (Latin America). Same shape as en.ts.
// Strings taken from concept.html; new strings are marked "NEW" for Brady's review.
import type { Dict } from './en';

const es: Dict = {
  meta: {
    title: 'CycleBuddy · Conoce tu ciclo. Quédate con tus datos.',
    description:
      'CycleBuddy es una app para seguir tu ciclo con educación gratuita sobre salud menstrual. Tus datos se quedan en tu teléfono, y una IA pequeña y privada funciona ahí mismo.',
  },
  nav: {
    skip: 'Ir al contenido', // NEW
    home: 'Inicio de CycleBuddy', // NEW
    learn: 'Aprende',
    ai: 'IA privada',
    data: 'Tus datos',
    research: 'Investigación',
    blog: 'Blog',
    cta: 'Únete a la lista',
    menu: 'Menú', // NEW
    close: 'Cerrar menú', // NEW
    language: 'Idioma', // NEW
  },
  intro: { skip: 'Haz clic para saltar' }, // NEW
  hero: {
    pill: 'Lanzamiento este invierno · Privada desde el diseño',
    h1a: 'Conoce tu ciclo.',
    h1b: 'Quédate con tus datos.',
    lead: 'CycleBuddy es una app para seguir tu ciclo con educación gratuita sobre salud menstrual. Tus datos se quedan en tu teléfono, y una IA pequeña y privada funciona ahí mismo.',
    ctaWait: 'Únete a la lista de espera',
    ctaHow: 'Cómo tus datos siguen siendo tuyos',
    trust: ['IA en el dispositivo', 'Educación gratuita', 'Código abierto', 'Español e inglés'],
    phoneLabel: 'Vista previa de la app CycleBuddy, que alterna entre tres pantallas', // NEW
  },
  phone: {
    hi: 'Buenos días',
    day: 'Día 14 · Ovulación',
    track: 'Registra tu ciclo',
    trackS: 'Tu periodo, ánimo, síntomas y notas',
    free: 'GRATIS',
    pro: 'PRO',
    learn: 'Aprende',
    learnS: 'Lecciones por niveles',
    align: 'Align',
    alignS: 'Planifica con tus hormonas',
    nourish: 'Nutre',
    nourishS: 'Come según tu cuerpo',
    move: 'Muévete',
    moveS: 'Entrena según tu cuerpo',
    intimacy: 'Intimidad',
    intimacyS: 'Cuerpo y deseo',
    partner: 'Pareja',
    partnerS: 'Comparte con cuidado',
    tabTrack: 'Registro',
    tabCircle: 'Círculo',
    tabLearn: 'Aprende',
    tabAlign: 'Align',
    // NEW: screens 2 and 3
    logTitle: 'Hoy',
    logSub: '¿Cómo te sientes?',
    logCycle: 'Día 14 de 28',
    logChips: ['Cólicos 6/10', 'Poca energía', 'Antojo de salado', 'Tranquila'],
    logSaved: 'Guardado en este teléfono',
    epLevel: 'Nivel 1 · Episodio 4',
    epTitle: '¿Por qué dan cólicos?',
    epLen: '1:48',
    epNext: 'Quiz después del episodio 5',
    epNote: 'Tres amigas, un departamento, los hechos dichos con claridad.',
  },
  marquee: ['Registra', 'Aprende', 'Alinea', 'IA en el dispositivo', 'Educación gratuita', 'Código abierto', 'Privada desde el diseño'],
  how: {
    eyebrow: 'Cómo funciona',
    h: 'Registra. Aprende. Alinea.',
    items: [
      { h: 'Registra', p: 'Anota tu periodo, dolor, energía, ánimo y notas en segundos. Un calendario simple y bonito.' },
      { h: 'Aprende', p: 'Educación gratuita sobre salud menstrual, contada en una serie corta de comedia en lugar de artículos largos.' },
      { h: 'Alinea', p: 'Planifica tus días con tus hormonas: qué comer, cómo moverte y cuándo descansar, según tu cuerpo.' },
    ],
  },
  learn: {
    eyebrow: 'Aprende · gratis para todas',
    h: 'Por fin, educación menstrual que da gusto ver.',
    p: 'Tres amigas comparten departamento y aprenden juntas sobre su cuerpo, en episodios cortos. Es honesta, amable y nunca juzga. Dice los hechos con claridad y muestra lo que casi nunca se muestra.',
    free: 'Siempre gratis. En español e inglés.',
    items: [
      { h: 'De calidad', p: 'Precisa y revisada, organizada en niveles de lo básico a lo avanzado, y actualizada según avanza la investigación.' },
      { h: 'Divertida', p: 'Una serie de comedia que de verdad quieres ver, con episodios de menos de dos minutos.' },
      { h: 'Didáctica', p: 'Una idea clara por episodio, dicha y mostrada, con un quiz cada cinco episodios para ver qué aprendiste.' },
    ],
  },
  ai: {
    eyebrow: 'IA con un propósito',
    h: 'Una IA hecha solo para la salud menstrual.',
    p: 'No vamos a meter un chatbot general en una app menstrual. Estamos construyendo un modelo dedicado que hace una sola cosa bien: entender tu ciclo y ayudarte a cuidarlo. Como tiene un solo propósito, puede ser lo bastante pequeño para vivir en tu teléfono y aprender solo de lo que registras.',
    checks: [
      'Funciona en tu teléfono, incluso sin internet',
      'Personaliza comida, movimiento y cuidado del dolor según tus síntomas, no solo según tu fase',
      'Elige entre contenido revisado por personas, nunca consejos médicos inventados',
      'Sin IA de grandes tecnológicas de por medio',
    ],
    flow: [
      { b: 'Tú registras', s: 'Cólicos 6/10, poca energía, antojo de salado' },
      { b: 'Tu teléfono aprende', s: 'Un modelo pequeño en tu dispositivo detecta tus patrones' },
      { b: 'Recibes una guía hecha para ti', s: 'Una comida caliente, movimiento suave, calor local, y el porqué' },
    ],
    device: 'Nada de este proceso sale de tu dispositivo.',
    principles: [
      { h: 'Pequeña', p: 'Hecha para una tarea, no para todo. Un modelo enfocado necesita una fracción del tamaño, la energía y el costo de uno general.' },
      { h: 'Local', p: 'Funciona en tu teléfono, incluso sin internet, también en teléfonos Android accesibles. Ningún servidor tiene que pensar por ti.' },
      { h: 'Privada', p: 'Aprende de tus registros dentro de tu dispositivo. Tu ciclo nunca tiene que salir de tu teléfono para que la app sea útil.' },
      { h: 'Alineada', p: 'Diseñada primero para tu bienestar. Elige entre guías revisadas, dice cuando no está segura y te sugiere ir al médico cuando hace falta.' },
    ],
  },
  data: {
    eyebrow: 'Tus datos',
    h: 'Tus datos. Tu decisión.',
    p: 'No solo prometemos no vender tus datos. Tú decides qué pasa con ellos, y la opción más privada es siempre la predeterminada.',
    cards: [
      { k: 'Predeterminado', h: 'Se quedan en tu teléfono', p: 'Tus registros se cifran y se guardan en tu dispositivo. No necesitas cuenta para registrar tu ciclo.' },
      { k: 'Tú eliges', h: 'Respaldo cifrado', p: 'Activa un respaldo en la nube que solo tú puedes abrir. Nosotros no podemos leerlo.' },
      { k: 'Tú eliges', h: 'Ayuda a la ciencia', p: 'Comparte datos anónimos con laboratorios de salud de la mujer, un estudio a la vez. Ves quién pregunta y puedes parar cuando quieras.' },
      { k: 'Siempre', h: 'Código abierto', p: 'Cualquiera puede revisar el código y comprobar que la app hace lo que dice.' },
    ],
    honestB: 'La privacidad viene con responsabilidad.',
    honest:
      'Si tus datos viven solo en tu teléfono y lo pierdes sin respaldo, también pierdes tus datos. Siempre te diremos con claridad qué significa cada opción, incluido que los datos ya compartidos con un laboratorio no se pueden recuperar.',
  },
  research: {
    eyebrow: 'Investigación',
    h: 'Investigación con mujeres, no sobre ellas.',
    p: 'La salud de la mujer está poco estudiada. CycleBuddy permite que las mujeres que quieran ayuden a la ciencia, con sus propias reglas, y les devuelve lo que aprendemos.',
    cards: [
      { n: '17+', h: 'Primero, escuchar', p: 'Conversaciones grabadas con mujeres de 18 a 40 años guiaron cada función, desde el formato educativo hasta la privacidad predeterminada. Pronto haremos más entrevistas en Perú.' },
      { n: '1×1', h: 'Consentimiento por estudio', p: 'Cada estudio pregunta por separado. Ves el laboratorio, la pregunta y qué se comparte antes de aceptar. Se anonimiza antes de salir de tu teléfono.' },
      { n: '↺', h: 'Los resultados vuelven a ti', p: 'Cuando un estudio en el que participaste se publique, te lo contaremos en lenguaje claro, y la serie educativa se actualizará.' },
    ],
    partnerB: '¿Investigas salud de la mujer?',
    partnerS: 'Buscamos universidades aliadas para nuestro primer estudio con consentimiento.',
    partnerCta: 'Colabora con nosotras',
  },
  blog: {
    eyebrow: 'Blog',
    h: 'Notas desde la construcción de CycleBuddy',
    all: 'Ver todo',
    draft: 'Borrador', // NEW
    min: 'min de lectura', // NEW
    back: 'Todas las entradas', // NEW
    listTitle: 'Blog',
    listLead: 'Notas, investigación y videodiarios de la construcción de CycleBuddy, a la vista de todos.', // NEW
    published: 'Publicado', // NEW
    draftNote: 'Esta entrada es un borrador provisional. El artículo completo llegará pronto.', // NEW
  },
  mission: {
    eyebrow: 'Misión',
    h: 'Una salud menstrual comprendida, privada y gratuita de aprender.',
    items: [
      { h: 'Para todas las mujeres', p: 'La educación es gratis, para que conocer tu cuerpo nunca dependa de lo que puedas pagar.' },
      { h: 'Hecha también para Latinoamérica', p: 'En español desde el inicio, y funciona sin internet en teléfonos accesibles: la IA privada no necesita plan de datos.' },
      { h: 'Adolescentes y colegios, después', p: 'Planeamos una versión gratuita para adolescentes y materiales para el aula: en el dispositivo, cifrada y de código abierto, sin compartir datos nunca.' },
    ],
    teachers: 'Docentes, escríbannos',
  },
  team: {
    eyebrow: 'Quién la construye',
    h: 'Construida a la vista de todos',
    role: 'Founder & CEO',
    bio: 'PhD en Matemáticas (Universidad de Waterloo), ciencia de datos e investigación premiada en machine learning, con enfoque en seguridad de IA. Construyo CycleBuddy porque las mujeres merecen entender su cuerpo sin renunciar a su privacidad.',
    photoAlt: 'Brady, Founder & CEO de CycleBuddy', // NEW
    awardH: '1.er lugar, categoría Stellar',
    awardP: 'Hackathon EasyA × Consensus, Toronto, 2025, con un premio de 20 000 USD en lumens de la Stellar Development Foundation.',
    awardAlt: 'El equipo de CycleBuddy en el escenario del hackathon EasyA × Consensus en Toronto, con el cheque del primer lugar', // NEW
  },
  cta: {
    eyebrow: 'Sé de las primeras',
    h: '¿Lista para una app menstrual en la que puedas confiar?',
    p: 'Únete a la lista de espera de CycleBuddy v2. Solo te escribiremos cuando valga la pena.',
    waitlistH: 'Únete a la lista de espera',
    contactH: 'Contáctanos',
    contactP: 'Preguntas, ideas o alianzas. Leemos cada mensaje.', // NEW
  },
  form: {
    // NEW (all)
    name: 'Nombre',
    email: 'Correo electrónico',
    message: 'Mensaje',
    country: 'País (opcional)',
    institution: 'Institución',
    submitWaitlist: 'Unirme a la lista',
    submitContact: 'Enviar mensaje',
    submitPartner: 'Enviar',
    sending: 'Enviando…',
    okWaitlist: 'Ya estás en la lista. Revisa tu correo: te enviamos una breve confirmación.',
    okContact: 'Gracias, tu mensaje va en camino. Te responderemos por correo.',
    errGeneric: 'Algo salió mal. Inténtalo de nuevo o escríbenos a hello@cyclebuddy.ca.',
    errEmail: 'Escribe un correo electrónico válido.',
    errRequired: 'Completa este campo.',
    errRate: 'Demasiados intentos. Espera unos minutos y vuelve a intentarlo.',
    honeypot: 'Deja este campo vacío',
    privacyNote: 'Solo lo usamos para responderte.',
    privacyNoteWaitlist: 'Solo usamos tu correo para contarte sobre CycleBuddy. Puedes darte de baja cuando quieras.',
    privacyLink: 'Política de privacidad',
  },
  footer: {
    tagline: 'Conoce tu ciclo. Quédate con tus datos.',
    location: 'Ontario, Canadá',
    note: 'Este sitio no usa cookies ni rastreadores.',
    pages: 'Páginas', // NEW
    privacy: 'Privacidad', // NEW
    facts: 'Datos clave', // NEW
    faq: 'Preguntas frecuentes', // NEW
  },
};

export default es;
