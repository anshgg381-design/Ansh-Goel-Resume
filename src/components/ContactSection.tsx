import { ArrowUpRight, Check, Copy, Download, Printer } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FormEvent, useEffect, useState } from 'react';
import { CONTACT_TOPICS, PROFILE } from '../data/profileData';
import {
  buildVCard,
  formatPanipatTime,
  validateContactForm,
  type ContactFormInput,
  type PageRoute,
} from '../utils/portfolioLogic';
import { EDITORIAL_EASE } from './MotionPrimitives';

interface ContactSectionProps {
  onNavigate: (route: PageRoute) => void;
}

export function ContactSection({ onNavigate }: ContactSectionProps) {
  const [form, setForm] = useState<ContactFormInput>({
    topic: '',
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormInput, string>>
  >({});
  const [submittedRecord, setSubmittedRecord] = useState<ContactFormInput | null>(
    null
  );
  const [copied, setCopied] = useState(false);
  const [istTime, setIstTime] = useState(() => formatPanipatTime(new Date()));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIstTime(formatPanipatTime(new Date()));
    }, 30000);
    return () => window.clearInterval(timer);
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validation = validateContactForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmittedRecord(form);
    setForm({ topic: '', name: '', email: '', message: '' });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = PROFILE.email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleDownloadVCard = () => {
    const vcf = buildVCard({
      fullName: PROFILE.name,
      org: 'IIM Bangalore',
      title: 'BBA-DBE Undergraduate',
      email: PROFILE.email,
      phone: PROFILE.phoneHref,
      city: 'Panipat',
      region: 'Haryana',
      country: 'India',
      linkedin: PROFILE.linkedinUrl,
    });
    const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ansh_Goel.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const mailtoHref = submittedRecord
    ? `mailto:${PROFILE.email}?subject=${encodeURIComponent(
        `[${submittedRecord.topic}] From ${submittedRecord.name}`
      )}&body=${encodeURIComponent(
        `${submittedRecord.message}\n\nReply to: ${submittedRecord.email}`
      )}`
    : `mailto:${PROFILE.email}`;

  return (
    <section id="contact" aria-labelledby="heading-contact">
      <h1
        id="heading-contact"
        className="font-serif text-[32px] font-normal leading-[1.2] tracking-[-0.015em] text-[#141414] sm:text-[36px]"
      >
        Contact
      </h1>

      <p className="mt-4 max-w-[60ch] font-serif text-[18px] leading-[1.6] text-[#242424]">
        Based in Panipat. I’m looking for internships, and I’m always happy to talk with people working in Sourcing &amp; operations, Exports &amp; trade, or Finance &amp; research.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="contact-topic"
            className="block font-sans text-[13px] text-[#242424]"
          >
            What’s this about?
          </label>
          <select
            id="contact-topic"
            value={form.topic}
            onChange={(e) => {
              setForm({ ...form, topic: e.target.value });
              if (errors.topic) setErrors({ ...errors, topic: undefined });
            }}
            className="mt-1.5 w-full border border-[#D4D4D4] bg-white px-3.5 py-2.5 font-sans text-[14px] text-[#141414] transition-colors focus:border-[#141414] focus:outline-none"
          >
            <option value="">Choose a topic</option>
            {CONTACT_TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {errors.topic && (
            <motion.p
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.16 }}
              className="mt-1 font-sans text-[12.5px] text-[#9E2A2B]"
            >
              {errors.topic}
            </motion.p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-name"
              className="block font-sans text-[13px] text-[#242424]"
            >
              Your name
            </label>
            <input
              id="contact-name"
              type="text"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className="mt-1.5 w-full border border-[#D4D4D4] bg-white px-3.5 py-2.5 font-sans text-[14px] text-[#141414] transition-colors focus:border-[#141414] focus:outline-none"
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.16 }}
                className="mt-1 font-sans text-[12.5px] text-[#9E2A2B]"
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block font-sans text-[13px] text-[#242424]"
            >
              Email address
            </label>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className="mt-1.5 w-full border border-[#D4D4D4] bg-white px-3.5 py-2.5 font-sans text-[14px] text-[#141414] transition-colors focus:border-[#141414] focus:outline-none"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.16 }}
                className="mt-1 font-sans text-[12.5px] text-[#9E2A2B]"
              >
                {errors.email}
              </motion.p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block font-sans text-[13px] text-[#242424]"
          >
            Your message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={form.message}
            onChange={(e) => {
              setForm({ ...form, message: e.target.value });
              if (errors.message) setErrors({ ...errors, message: undefined });
            }}
            className="mt-1.5 w-full border border-[#D4D4D4] bg-white px-3.5 py-2.5 font-sans text-[14px] text-[#141414] transition-colors focus:border-[#141414] focus:outline-none"
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.16 }}
              className="mt-1 font-sans text-[12.5px] text-[#9E2A2B]"
            >
              {errors.message}
            </motion.p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className="bg-[#141414] px-6 py-3 font-sans text-[13.5px] font-medium text-white transition-colors hover:bg-[#333333]"
          >
            Send message
          </motion.button>

          <AnimatePresence>
            {submittedRecord && (
              <motion.div
                role="status"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: EDITORIAL_EASE }}
                className="font-sans text-[13.5px] text-[#141414]"
              >
                Message noted for{' '}
                <span className="font-semibold">{submittedRecord.topic}</span>.{' '}
                <a
                  href={mailtoHref}
                  className="underline underline-offset-4 hover:text-[#525252]"
                >
                  Open in your email app &rarr;
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>

      {/* Direct Channels & Resume Utilities */}
      <div className="mt-12 border-t border-[#EAEAEA] pt-8">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${PROFILE.email}`}
            className="font-serif text-[21px] text-[#141414] underline decoration-[#D4D4D4] underline-offset-4 transition-colors hover:decoration-[#141414]"
          >
            {PROFILE.email}
          </a>

          <motion.button
            type="button"
            onClick={handleCopyEmail}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="inline-flex items-center gap-1.5 border border-[#D4D4D4] px-3 py-1.5 font-sans text-[12px] text-[#242424] transition-colors hover:border-[#141414]"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy email</span>
              </>
            )}
          </motion.button>

          <motion.button
            type="button"
            onClick={handleDownloadVCard}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="inline-flex items-center gap-1.5 border border-[#D4D4D4] px-3 py-1.5 font-sans text-[12px] text-[#242424] transition-colors hover:border-[#141414]"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Save contact (.vcf)</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => window.print()}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="inline-flex items-center gap-1.5 border border-[#D4D4D4] px-3 py-1.5 font-sans text-[12px] text-[#242424] transition-colors hover:border-[#141414]"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Save as PDF</span>
          </motion.button>
        </div>

        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="font-sans text-[11.5px] uppercase tracking-[0.08em] text-[#606060]">
              Phone
            </dt>
            <dd className="mt-1 font-serif text-[17px] text-[#141414] tabular-nums">
              <a
                href={`tel:${PROFILE.phoneHref}`}
                className="hover:underline hover:underline-offset-4"
              >
                {PROFILE.phoneDisplay}
              </a>
            </dd>
          </div>

          <div>
            <dt className="font-sans text-[11.5px] uppercase tracking-[0.08em] text-[#606060]">
              LinkedIn
            </dt>
            <dd className="mt-1 font-serif text-[17px] text-[#141414]">
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:underline hover:underline-offset-4"
              >
                <span>{PROFILE.linkedinHandle}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#606060]" />
              </a>
            </dd>
          </div>

          <div>
            <dt className="font-sans text-[11.5px] uppercase tracking-[0.08em] text-[#606060]">
              Location
            </dt>
            <dd className="mt-1 font-serif text-[17px] text-[#141414]">
              {PROFILE.location}
            </dd>
            <dd className="mt-0.5 font-mono text-[12px] text-[#606060] tabular-nums">
              {istTime} IST
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-14">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="font-sans text-[13px] text-[#606060] transition-colors hover:text-[#141414]"
        >
          &larr; Home
        </a>
      </div>
    </section>
  );
}
