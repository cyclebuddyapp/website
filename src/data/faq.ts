// FAQ content for /faq (and the FAQPage JSON-LD). Answers must agree with src/data/facts.ts.
// Groups give the page structure; `id` gives each question a stable anchor link (e.g. /faq/#ai).
// Answers marked CONFIRM are product commitments Brady must verify before launch.
import type { Lang } from '../i18n/utils';

export interface QA { id: string; q: string; a: string }
export interface FaqGroup { id: string; title: string; items: QA[] }

export const FAQ: Record<Lang, FaqGroup[]> = {
  en: [
    {
      id: 'basics', title: 'The basics', items: [
        { id: 'free', q: 'Is the education free?', a: 'Yes. The menstrual health education in CycleBuddy is always free, for everyone, so knowing your own body never depends on what you can pay.' },
        { id: 'launch', q: 'When does CycleBuddy launch?', a: 'CycleBuddy launches this winter, in December 2026 or January 2027. It isn’t in the app stores yet. Join the waitlist on our homepage and we’ll let you know when it’s ready.' },
        { id: 'phones', q: 'Which phones does it work on?', a: 'iPhone (iOS) and Android, including affordable Android phones.' },
        { id: 'spanish', q: 'Is CycleBuddy available in Spanish?', a: 'Yes. CycleBuddy is available in English and Spanish, and French is coming soon. This website is also available in French.' },
      ],
    },
    {
      id: 'privacy', title: 'Privacy and your data', items: [
        { id: 'stored', q: 'Where is my data stored?', a: 'On your phone. Your logs are encrypted and stored locally, and you don’t need an account to track your cycle. If you want, you can turn on an encrypted cloud backup that only you can unlock. We can’t read it.' },
        { id: 'sell', q: 'Does CycleBuddy sell my data?', a: 'No. We don’t sell your data. You decide what happens to it, and the most private option is always the default.' },
        { id: 'lose', q: 'What happens if I lose my phone?', a: 'If your data lives only on your phone and you lose it without a backup, your data is gone too. To protect yourself, turn on the encrypted backup that only you can unlock.' },
        { id: 'research', q: 'How does sharing data with research work?', a: 'Only if you choose to. Each study asks you separately, and you see the lab, the question and what’s shared before you say yes. Data is anonymized before it leaves your phone, and you can stop anytime. Data already shared with a lab can’t be recalled.' },
        { id: 'open', q: 'Is CycleBuddy open source?', a: 'Yes. Anyone can check the code to see that the app does what it says.' },
      ],
    },
    {
      id: 'ai', title: 'The private AI', items: [
        { id: 'local', q: 'What does “local AI” or “on-device AI” mean?', a: '“Local” simply means the AI does its work inside the CycleBuddy app, on your phone, instead of sending your information to a company’s servers. Think of your phone’s calculator: it works on its own, even offline. Nothing you log has to leave your phone for the AI to help you.' },
        { id: 'access', q: 'Can the AI access the rest of my phone?', a: 'No. It only sees what you log in CycleBuddy. It can’t open your messages, photos, contacts or other apps, and it can’t make calls, send messages or change anything on your phone. It suggests; you decide.' }, // CONFIRM
        { id: 'internet', q: 'Does the AI need the internet?', a: 'No. It runs on your phone, even offline, so you don’t need a data plan for it.' },
        { id: 'medical', q: 'Does CycleBuddy give medical advice?', a: 'CycleBuddy chooses from guidance reviewed by people, never made-up medical advice. It tells you when it isn’t sure and points you to a doctor when something needs one. It doesn’t replace a health professional.' },
      ],
    },
    {
      id: 'about', title: 'About us', items: [
        { id: 'who', q: 'Who makes CycleBuddy?', a: 'CycleBuddy is based in Ontario, Canada. It was founded by Brady (Founder & CEO), a mathematician and machine learning researcher focused on AI safety. CycleBuddy won 1st place in the Stellar track at the EasyA × Consensus Hackathon in Toronto in 2025.' },
        { id: 'cookies', q: 'Does this website use cookies?', a: 'No. This website uses no cookies, no analytics and no trackers. Our privacy policy explains what the forms collect.' },
        { id: 'contact', q: 'How can I contact you?', a: 'Email hello@cyclebuddy.ca, or use the contact form on our homepage.' },
      ],
    },
  ],
  es: [
    {
      id: 'basics', title: 'Lo básico', items: [
        { id: 'free', q: '¿La educación es gratuita?', a: 'Sí. La educación sobre salud menstrual de CycleBuddy es siempre gratuita, para todas, para que conocer tu cuerpo nunca dependa de cuánto puedas pagar.' },
        { id: 'launch', q: '¿Cuándo sale CycleBuddy?', a: 'CycleBuddy llega este invierno, en diciembre de 2026 o enero de 2027. Todavía no está en las tiendas de apps. Únete a la lista de espera en nuestra página de inicio y te avisaremos cuando esté lista.' },
        { id: 'phones', q: '¿En qué teléfonos funciona?', a: 'En iPhone (iOS) y Android, incluidos teléfonos Android económicos.' },
        { id: 'spanish', q: '¿CycleBuddy está en español?', a: 'Sí. CycleBuddy está en español e inglés, y pronto en francés. Este sitio web también está en francés.' },
      ],
    },
    {
      id: 'privacy', title: 'Privacidad y tus datos', items: [
        { id: 'stored', q: '¿Dónde se guardan mis datos?', a: 'En tu teléfono. Tus registros se cifran y se guardan en tu dispositivo, y no necesitas una cuenta para registrar tu ciclo. Si quieres, puedes activar un respaldo cifrado en la nube que solo tú puedes abrir. Nosotros no podemos leerlo.' },
        { id: 'sell', q: '¿CycleBuddy vende mis datos?', a: 'No. No vendemos tus datos. Tú decides qué pasa con ellos, y la opción más privada siempre viene activada por defecto.' },
        { id: 'lose', q: '¿Qué pasa si pierdo mi teléfono?', a: 'Si tus datos solo viven en tu teléfono y lo pierdes sin tener un respaldo, también pierdes tus datos. Para protegerte, activa el respaldo cifrado que solo tú puedes abrir.' },
        { id: 'research', q: '¿Cómo funciona compartir datos con la investigación?', a: 'Solo si tú lo eliges. Cada estudio te pide permiso por separado, y antes de aceptar ves el laboratorio, la pregunta y qué se comparte. Los datos se anonimizan antes de salir de tu teléfono y puedes dejar de participar cuando quieras. Los datos ya compartidos con un laboratorio no se pueden recuperar.' },
        { id: 'open', q: '¿CycleBuddy es de código abierto?', a: 'Sí. Cualquiera puede revisar el código y comprobar que la app hace lo que dice.' },
      ],
    },
    {
      id: 'ai', title: 'La IA privada', items: [
        { id: 'local', q: '¿Qué significa “IA local” o “IA en el dispositivo”?', a: '“Local” quiere decir que la IA trabaja dentro de la app CycleBuddy, en tu teléfono, en lugar de enviar tu información a los servidores de una empresa. Piensa en la calculadora de tu teléfono: funciona sola, incluso sin internet. Nada de lo que registras tiene que salir de tu teléfono para que la IA te ayude.' },
        { id: 'access', q: '¿La IA puede acceder al resto de mi teléfono?', a: 'No. Solo ve lo que registras en CycleBuddy. No puede abrir tus mensajes, fotos, contactos ni otras apps, y no puede hacer llamadas, enviar mensajes ni cambiar nada en tu teléfono. Ella sugiere; tú decides.' },
        { id: 'internet', q: '¿La IA necesita internet?', a: 'No. Funciona en tu teléfono, incluso sin conexión, así que no necesitas plan de datos para usarla.' },
        { id: 'medical', q: '¿CycleBuddy da consejos médicos?', a: 'CycleBuddy elige entre recomendaciones revisadas por personas; nunca inventa consejos médicos. Te dice cuando no está segura y te sugiere ver a un médico cuando hace falta. No reemplaza a un profesional de la salud.' },
      ],
    },
    {
      id: 'about', title: 'Sobre nosotros', items: [
        { id: 'who', q: '¿Quién hace CycleBuddy?', a: 'CycleBuddy tiene su sede en Ontario, Canadá. La fundó Brady (Founder & CEO), con un doctorado en matemáticas e investigación en machine learning enfocada en la seguridad de la IA. CycleBuddy ganó el 1.er lugar en la categoría Stellar del Hackathon EasyA × Consensus en Toronto, en 2025.' },
        { id: 'cookies', q: '¿Este sitio usa cookies?', a: 'No. Este sitio no usa cookies, analíticas ni rastreadores. Nuestra política de privacidad explica qué recopilan los formularios.' },
        { id: 'contact', q: '¿Cómo puedo contactarlos?', a: 'Escríbenos a hello@cyclebuddy.ca o usa el formulario de contacto de nuestra página de inicio.' },
      ],
    },
  ],
  fr: [
    {
      id: 'basics', title: 'L’essentiel', items: [
        { id: 'free', q: 'L’éducation est-elle gratuite?', a: 'Oui. L’éducation sur la santé menstruelle de CycleBuddy est toujours gratuite, pour toutes, pour que connaître ton corps ne dépende jamais de tes moyens.' },
        { id: 'launch', q: 'Quand CycleBuddy sera-t-elle lancée?', a: 'CycleBuddy arrive cet hiver, en décembre 2026 ou en janvier 2027. Elle n’est pas encore offerte dans les magasins d’applis. Inscris-toi à la liste d’attente sur notre page d’accueil : nous te préviendrons dès qu’elle sera prête.' },
        { id: 'phones', q: 'Sur quels téléphones fonctionne-t-elle?', a: 'Sur iPhone (iOS) et Android, y compris les téléphones Android abordables.' },
        { id: 'spanish', q: 'CycleBuddy est-elle offerte en espagnol? Et en français?', a: 'CycleBuddy est offerte en anglais et en espagnol, et le français arrive bientôt. Ce site Web, lui, est déjà offert en français.' },
      ],
    },
    {
      id: 'privacy', title: 'Confidentialité et données', items: [
        { id: 'stored', q: 'Où sont stockées mes données?', a: 'Sur ton téléphone. Tes notes sont chiffrées et stockées sur ton appareil, et aucun compte n’est nécessaire pour suivre ton cycle. Si tu le souhaites, tu peux activer une sauvegarde chiffrée dans le nuage que toi seule peux déverrouiller. Nous ne pouvons pas la lire.' },
        { id: 'sell', q: 'CycleBuddy vend-elle mes données?', a: 'Non. Nous ne vendons pas tes données. C’est toi qui décides de ce qu’elles deviennent, et l’option la plus confidentielle est toujours celle par défaut.' },
        { id: 'lose', q: 'Que se passe-t-il si je perds mon téléphone?', a: 'Si tes données ne vivent que sur ton téléphone et que tu le perds sans sauvegarde, tes données sont perdues elles aussi. Pour te protéger, active la sauvegarde chiffrée que toi seule peux déverrouiller.' },
        { id: 'research', q: 'Comment fonctionne le partage de données avec la recherche?', a: 'Uniquement si tu le choisis. Chaque étude te demande ton accord séparément, et avant de dire oui, tu vois le laboratoire, la question et les données partagées. Les données sont anonymisées avant de quitter ton téléphone, et tu peux arrêter quand tu veux. Les données déjà partagées avec un laboratoire ne peuvent pas être récupérées.' },
        { id: 'open', q: 'CycleBuddy est-elle à code source ouvert?', a: 'Oui. Tout le monde peut examiner le code et vérifier que l’appli fait bien ce qu’elle annonce.' },
      ],
    },
    {
      id: 'ai', title: 'L’IA privée', items: [
        { id: 'local', q: 'Que veut dire « IA locale » ou « IA sur l’appareil »?', a: '« Locale » veut simplement dire que l’IA travaille à l’intérieur de l’appli CycleBuddy, sur ton téléphone, au lieu d’envoyer tes informations aux serveurs d’une entreprise. Pense à la calculatrice de ton téléphone : elle fonctionne toute seule, même sans connexion. Rien de ce que tu notes n’a besoin de quitter ton téléphone pour que l’IA t’aide.' },
        { id: 'access', q: 'L’IA peut-elle accéder au reste de mon téléphone?', a: 'Non. Elle ne voit que ce que tu notes dans CycleBuddy. Elle ne peut pas ouvrir tes messages, tes photos, tes contacts ni tes autres applis, et elle ne peut pas passer d’appels, envoyer de messages ni modifier quoi que ce soit sur ton téléphone. Elle suggère; c’est toi qui décides.' },
        { id: 'internet', q: 'L’IA a-t-elle besoin d’Internet?', a: 'Non. Elle fonctionne sur ton téléphone, même sans connexion : pas besoin de forfait de données.' },
        { id: 'medical', q: 'CycleBuddy donne-t-elle des conseils médicaux?', a: 'CycleBuddy choisit parmi des conseils révisés par des personnes, jamais des conseils médicaux inventés. Elle te dit quand elle n’est pas sûre et t’invite à consulter un médecin quand c’est nécessaire. Elle ne remplace pas un ou une professionnelle de la santé.' },
      ],
    },
    {
      id: 'about', title: 'À propos', items: [
        { id: 'who', q: 'Qui crée CycleBuddy?', a: 'CycleBuddy est établie en Ontario, au Canada. Elle a été fondée par Brady (Founder & CEO) : doctorat en mathématiques et recherche en apprentissage automatique axée sur la sûreté de l’IA. CycleBuddy a remporté la 1re place du volet Stellar au Hackathon EasyA × Consensus, à Toronto, en 2025.' },
        { id: 'cookies', q: 'Ce site utilise-t-il des témoins (cookies)?', a: 'Non. Ce site n’utilise ni témoins, ni outils d’analyse, ni traceurs. Notre politique de confidentialité explique ce que recueillent les formulaires.' },
        { id: 'contact', q: 'Comment vous joindre?', a: 'Écris-nous à hello@cyclebuddy.ca, ou utilise le formulaire de contact sur notre page d’accueil.' },
      ],
    },
  ],
};
