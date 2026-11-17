import type {
  Essay,
  EssayTopic,
  ReadingCategory,
  ReadingItem,
} from '../data/profileData';

export type PageRoute =
  | 'home'
  | 'about'
  | 'writing'
  | 'education'
  | 'whats-ahead'
  | 'skills'
  | 'contact';

const VALID_ROUTES: readonly PageRoute[] = [
  'home',
  'about',
  'writing',
  'education',
  'whats-ahead',
  'skills',
  'contact',
];

export function parseRouteHash(hash: string): PageRoute {
  const cleaned = hash.replace(/^#\/?/, '').trim().toLowerCase();
  if (!cleaned) return 'home';
  if ((VALID_ROUTES as readonly string[]).includes(cleaned)) {
    return cleaned as PageRoute;
  }
  return 'home';
}

export interface ContactFormInput {
  topic: string;
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function filterEssays(
  essays: Essay[],
  query: string,
  topic: EssayTopic
): Essay[] {
  const normalizedQuery = query.trim().toLowerCase();

  return essays.filter((essay) => {
    const matchesTopic = topic === 'All topics' || essay.topic === topic;
    if (!matchesTopic) return false;

    if (!normalizedQuery) return true;

    const searchable = [
      essay.title,
      essay.subtitle,
      essay.topic,
      essay.date,
      ...essay.paragraphs,
    ]
      .join(' ')
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  });
}

export function filterReadingList(
  items: ReadingItem[],
  category: ReadingCategory
): ReadingItem[] {
  if (category === 'All') return items;
  return items.filter((item) => item.category === category);
}

export function validateNewsletterEmail(email: string): {
  valid: boolean;
  error?: string;
} {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter your email address.' };
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  return { valid: true };
}

export function validateContactForm(input: ContactFormInput): ValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};

  if (!input.topic.trim()) {
    errors.topic = 'Please choose a topic.';
  }
  if (!input.name.trim()) {
    errors.name = 'Please enter your name.';
  }
  const trimmedEmail = input.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (input.message.trim().length < 10) {
    errors.message = 'Please write at least 10 characters so I know how to help.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildVCard(params: {
  fullName: string;
  org: string;
  title: string;
  email: string;
  phone: string;
  city: string;
  region: string;
  country: string;
  linkedin: string;
}): string {
  const parts = params.fullName.trim().split(/\s+/);
  const first = parts[0] || '';
  const last = parts.slice(1).join(' ') || '';

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${last};${first};;;`,
    `FN:${params.fullName}`,
    `ORG:${params.org}`,
    `TITLE:${params.title}`,
    `TEL;TYPE=CELL:${params.phone}`,
    `EMAIL;TYPE=INTERNET:${params.email}`,
    `ADR;TYPE=HOME:;;${params.city};${params.region};;${params.country}`,
    `URL:${params.linkedin}`,
    'END:VCARD',
  ].join('\r\n');
}

export function formatPanipatTime(now: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(now);
}
