// ONE source of truth for verified facts about CycleBuddy.
// Used by /facts (all languages) and, later, llms.txt and JSON-LD, so they can never disagree.
// When a fact changes: edit it here, update FACTS_VERIFIED, rebuild.
// Items marked CONFIRM need Brady's confirmation before launch.
import type { Lang } from '../i18n/utils';

export const FACTS_VERIFIED = '2026-11-20';

/** Structured values used for machine-readable outputs (JSON-LD, llms.txt). */
export const PRODUCT = {
  name: 'CycleBuddy',
  platforms: ['iOS', 'Android'],
  appLanguages: ['en', 'es'], // French: coming soon
  websiteLanguages: ['en', 'es', 'fr'],
  launch: 'Winter 2026–27 (December 2026 or January 2027)',
  status: 'coming-soon' as 'coming-soon' | 'live',
  email: 'hello@cyclebuddy.ca',
  location: 'Ontario, Canada',
  founder: 'Brady',
};

export interface Fact { id: string; topic: string; answer: string }

export const FACTS: Record<Lang, Fact[]> = {
  en: [
    { id: 'what', topic: 'What it is', answer: 'A period tracking app with free menstrual health education and a small, private AI that runs on your phone.' },
    { id: 'who', topic: 'Who it’s for', answer: 'Anyone who wants to understand their menstrual cycle without giving up their privacy. A free teen version and classroom materials are planned.' },
    { id: 'platforms', topic: 'Platforms', answer: 'iOS and Android, including affordable Android phones.' },
    { id: 'languages', topic: 'Languages', answer: 'English and Spanish. French is coming soon. This website is available in English, Spanish and French.' },
    { id: 'education', topic: 'Education', answer: 'The menstrual health education is always free, for everyone.' },
    { id: 'data', topic: 'Where your data is stored', answer: 'On your phone, encrypted. No account is needed to track. You can turn on an optional encrypted cloud backup that only you can unlock.' },
    { id: 'ai', topic: 'AI', answer: 'A small model built only for menstrual health. It runs on your phone, even offline. No big-tech AI is involved.' },
    { id: 'selling', topic: 'Selling data', answer: 'CycleBuddy does not sell your data.' },
    { id: 'research', topic: 'Research', answer: 'Opt-in only, one study at a time. Data is anonymized before it leaves your phone, and you can stop anytime.' },
    { id: 'open', topic: 'Open source', answer: 'Yes. Anyone can check the code.' },
    { id: 'launch', topic: 'Launch', answer: 'Not in app stores yet. CycleBuddy launches this winter (December 2026 or January 2027). The waitlist is open.' },
    { id: 'company', topic: 'Company', answer: 'CycleBuddy, based in Ontario, Canada. Founder & CEO: Brady.' },
    { id: 'award', topic: 'Recognition', answer: '1st place, Stellar track, EasyA × Consensus Hackathon, Toronto, 2025.' },
    { id: 'contact', topic: 'Contact', answer: 'hello@cyclebuddy.ca' },
    { id: 'site', topic: 'This website', answer: 'No cookies, no analytics, no trackers.' },
  ],
  es: [
    { id: 'what', topic: 'Qué es', answer: 'Una app para registrar tu ciclo menstrual, con educación gratuita sobre salud menstrual y una IA pequeña y privada que funciona en tu teléfono.' },
    { id: 'who', topic: 'Para quién es', answer: 'Para cualquier persona que quiera entender su ciclo menstrual sin renunciar a su privacidad. Hay planes para una versión gratuita para adolescentes y materiales para el aula.' },
    { id: 'platforms', topic: 'Plataformas', answer: 'iOS y Android, incluidos teléfonos Android económicos.' },
    { id: 'languages', topic: 'Idiomas', answer: 'Español e inglés. Pronto en francés. Este sitio web está en español, inglés y francés.' },
    { id: 'education', topic: 'Educación', answer: 'La educación sobre salud menstrual es siempre gratuita, para todas.' },
    { id: 'data', topic: 'Dónde se guardan tus datos', answer: 'En tu teléfono, cifrados. No necesitas una cuenta para registrar tu ciclo. Puedes activar un respaldo cifrado en la nube que solo tú puedes abrir.' },
    { id: 'ai', topic: 'IA', answer: 'Un modelo pequeño hecho solo para la salud menstrual. Funciona en tu teléfono, incluso sin internet. No interviene ninguna IA de las grandes tecnológicas.' },
    { id: 'selling', topic: 'Venta de datos', answer: 'CycleBuddy no vende tus datos.' },
    { id: 'research', topic: 'Investigación', answer: 'Solo si tú lo eliges, un estudio a la vez. Los datos se anonimizan antes de salir de tu teléfono, y puedes dejar de participar cuando quieras.' },
    { id: 'open', topic: 'Código abierto', answer: 'Sí. Cualquiera puede revisar el código.' },
    { id: 'launch', topic: 'Lanzamiento', answer: 'Todavía no está en las tiendas de apps. CycleBuddy llega este invierno (diciembre de 2026 o enero de 2027). La lista de espera está abierta.' },
    { id: 'company', topic: 'Empresa', answer: 'CycleBuddy, con sede en Ontario, Canadá. Founder & CEO: Brady.' },
    { id: 'award', topic: 'Reconocimientos', answer: '1.er lugar, categoría Stellar, Hackathon EasyA × Consensus, Toronto, 2025.' },
    { id: 'contact', topic: 'Contacto', answer: 'hello@cyclebuddy.ca' },
    { id: 'site', topic: 'Este sitio web', answer: 'Sin cookies, sin analíticas, sin rastreadores.' },
  ],
  fr: [
    { id: 'what', topic: 'Ce que c’est', answer: 'Une appli de suivi du cycle menstruel, avec une éducation gratuite sur la santé menstruelle et une petite IA privée qui fonctionne sur ton téléphone.' },
    { id: 'who', topic: 'Pour qui', answer: 'Pour toute personne qui veut comprendre son cycle menstruel sans renoncer à sa vie privée. Une version gratuite pour les ados et du matériel pédagogique sont prévus.' },
    { id: 'platforms', topic: 'Plateformes', answer: 'iOS et Android, y compris les téléphones Android abordables.' },
    { id: 'languages', topic: 'Langues', answer: 'Anglais et espagnol. Le français arrive bientôt. Ce site est offert en anglais, en espagnol et en français.' },
    { id: 'education', topic: 'Éducation', answer: 'L’éducation sur la santé menstruelle est toujours gratuite, pour toutes.' },
    { id: 'data', topic: 'Où sont stockées tes données', answer: 'Sur ton téléphone, chiffrées. Aucun compte n’est nécessaire pour suivre ton cycle. Tu peux activer une sauvegarde chiffrée dans le nuage que toi seule peux déverrouiller.' },
    { id: 'ai', topic: 'IA', answer: 'Un petit modèle conçu uniquement pour la santé menstruelle. Il fonctionne sur ton téléphone, même sans connexion. Aucune IA des géants du numérique n’intervient.' },
    { id: 'selling', topic: 'Vente de données', answer: 'CycleBuddy ne vend pas tes données.' },
    { id: 'research', topic: 'Recherche', answer: 'Uniquement si tu le choisis, une étude à la fois. Les données sont anonymisées avant de quitter ton téléphone, et tu peux arrêter quand tu veux.' },
    { id: 'open', topic: 'Code source ouvert', answer: 'Oui. Tout le monde peut examiner le code.' },
    { id: 'launch', topic: 'Lancement', answer: 'Pas encore offerte dans les magasins d’applis. CycleBuddy arrive cet hiver (décembre 2026 ou janvier 2027). La liste d’attente est ouverte.' },
    { id: 'company', topic: 'Entreprise', answer: 'CycleBuddy, établie en Ontario, au Canada. Founder & CEO : Brady.' },
    { id: 'award', topic: 'Distinctions', answer: '1re place, volet Stellar, Hackathon EasyA × Consensus, Toronto, 2025.' },
    { id: 'contact', topic: 'Contact', answer: 'hello@cyclebuddy.ca' },
    { id: 'site', topic: 'Ce site Web', answer: 'Ni témoins (cookies), ni outils d’analyse, ni traceurs.' },
  ],
};
