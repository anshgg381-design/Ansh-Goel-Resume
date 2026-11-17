import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Search,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FormEvent, useMemo, useState } from 'react';
import {
  ESSAYS,
  ESSAY_TOPICS,
  READING_CATEGORIES,
  READING_LIST,
  type Essay,
  type EssayTopic,
  type ReadingCategory,
} from '../data/profileData';
import {
  filterEssays,
  filterReadingList,
  validateNewsletterEmail,
  type PageRoute,
} from '../utils/portfolioLogic';
import { EDITORIAL_EASE, EditorialReveal } from './MotionPrimitives';

interface WritingSectionProps {
  onNavigate: (route: PageRoute) => void;
}

export function WritingSection({ onNavigate }: WritingSectionProps) {
  const [query, setQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<EssayTopic>('All topics');
  const [readingCategory, setReadingCategory] =
    useState<ReadingCategory>('All');
  const [activeEssay, setActiveEssay] = useState<Essay | null>(null);

  const [subEmail, setSubEmail] = useState('');
  const [subError, setSubError] = useState('');
  const [subConfirmed, setSubConfirmed] = useState<string | null>(null);

  const filteredEssays = useMemo(
    () => filterEssays(ESSAYS, query, selectedTopic),
    [query, selectedTopic]
  );

  const filteredReading = useMemo(
    () => filterReadingList(READING_LIST, readingCategory),
    [readingCategory]
  );

  const handleSubscribe = (event: FormEvent) => {
    event.preventDefault();
    const check = validateNewsletterEmail(subEmail);
    if (!check.valid) {
      setSubError(check.error || 'Invalid email');
      setSubConfirmed(null);
      return;
    }
    setSubError('');
    setSubConfirmed(subEmail.trim());
    setSubEmail('');
  };

  const activeIndex = activeEssay
    ? ESSAYS.findIndex((item) => item.id === activeEssay.id)
    : -1;
  const prevEssay = activeIndex > 0 ? ESSAYS[activeIndex - 1] : null;
  const nextEssay =
    activeIndex >= 0 && activeIndex < ESSAYS.length - 1
      ? ESSAYS[activeIndex + 1]
      : null;

  const openEssay = (essay: Essay) => {
    setActiveEssay(essay);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">
      {activeEssay ? (
        <motion.article
          key={`essay-${activeEssay.id}`}
          aria-labelledby="essay-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
        >
          <button
            type="button"
            onClick={() => setActiveEssay(null)}
            className="group inline-flex items-center gap-1.5 font-sans text-[12px] uppercase tracking-[0.08em] text-[#606060] transition-colors hover:text-[#141414]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Back to Writing</span>
          </button>

          <p className="mt-8 font-sans text-[12px] uppercase tracking-[0.08em] text-[#606060]">
            {activeEssay.topic} &middot; {activeEssay.date} &middot;{' '}
            {activeEssay.readTime}
          </p>

          <h1
            id="essay-title"
            className="mt-3 font-serif text-[32px] font-normal leading-[1.2] tracking-[-0.01em] text-[#141414] sm:text-[36px]"
          >
            {activeEssay.title}
          </h1>

          <p className="mt-3 font-serif text-[19px] italic leading-[1.55] text-[#525252]">
            {activeEssay.subtitle}
          </p>

          <div className="mt-8 space-y-5 border-t border-[#EAEAEA] pt-8">
            {activeEssay.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.34,
                  delay: Math.min(index * 0.04, 0.16),
                  ease: EDITORIAL_EASE,
                }}
                className="font-serif text-[18px] leading-[1.7] text-[#242424]"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-[#EAEAEA] pt-6 font-sans text-[13px]">
            {prevEssay ? (
              <button
                type="button"
                onClick={() => openEssay(prevEssay)}
                className="group inline-flex items-center gap-1.5 text-[#525252] transition-colors hover:text-[#141414]"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                <span>Previous essay</span>
              </button>
            ) : (
              <span />
            )}

            {nextEssay ? (
              <button
                type="button"
                onClick={() => openEssay(nextEssay)}
                className="group inline-flex items-center gap-1.5 text-[#525252] transition-colors hover:text-[#141414]"
              >
                <span>Next essay</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            ) : (
              <span />
            )}
          </div>

          <div className="mt-10">
            <button
              type="button"
              onClick={() => setActiveEssay(null)}
              className="font-sans text-[13px] text-[#606060] transition-colors hover:text-[#141414]"
            >
              &larr; All essays
            </button>
          </div>
        </motion.article>
      ) : (
        <motion.section
          key="writing-index"
          id="writing"
          aria-labelledby="heading-writing"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
        >
          <h1
            id="heading-writing"
            className="font-serif text-[32px] font-normal leading-[1.2] tracking-[-0.015em] text-[#141414] sm:text-[36px]"
          >
            Writing
          </h1>

          <p className="mt-4 max-w-[60ch] font-serif text-[18px] leading-[1.6] text-[#242424]">
            Notes and essays on textile manufacturing, export concentration, business operations, and Indian financial markets.
          </p>

          {/* Newsletter subscription matching justinwelsh.me/essays */}
          <div className="mt-8">
            <form
              onSubmit={handleSubscribe}
              noValidate
              className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch"
            >
              <label htmlFor="writing-email" className="sr-only">
                Email address
              </label>
              <input
                id="writing-email"
                type="email"
                value={subEmail}
                onChange={(e) => {
                  setSubEmail(e.target.value);
                  if (subError) setSubError('');
                }}
                placeholder="Your email address"
                className="w-full max-w-[300px] border border-[#D4D4D4] bg-white px-3.5 py-2.5 font-serif text-[16px] text-[#141414] transition-colors placeholder:font-sans placeholder:text-[14px] placeholder:text-[#737373] focus:border-[#141414] focus:outline-none"
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.12 }}
                className="shrink-0 whitespace-nowrap bg-[#141414] px-5 py-2.5 font-sans text-[13.5px] font-medium text-white transition-colors hover:bg-[#333333]"
              >
                Follow new notes
              </motion.button>
            </form>

            <AnimatePresence mode="wait">
              {subError ? (
                <motion.p
                  key="sub-error"
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="mt-2 font-sans text-[13px] text-[#9E2A2B]"
                >
                  {subError}
                </motion.p>
              ) : subConfirmed ? (
                <motion.p
                  key="sub-confirmed"
                  role="status"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 font-sans text-[13px] text-[#141414]"
                >
                  Saved {subConfirmed} — you’ll receive new essays when they’re published.
                </motion.p>
              ) : (
                <p
                  key="sub-helper"
                  className="mt-2 font-sans text-[12.5px] text-[#606060]"
                >
                  Free. Unsubscribe anytime.
                </p>
              )}
            </AnimatePresence>
          </div>

          {/* Search + Topic Filter */}
          <div className="mt-12 mb-6 flex flex-col gap-4 border-b border-[#E5E5E5] pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <label htmlFor="search-writing" className="sr-only">
                Search writing
              </label>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]"
              />
              <input
                id="search-writing"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search essays"
                className="w-full bg-transparent py-1.5 pl-6 pr-2 font-serif text-[17px] text-[#141414] placeholder:text-[#737373] focus:outline-none"
              />
            </div>

            <div className="relative shrink-0">
              <label htmlFor="topic-filter" className="sr-only">
                Filter by topic
              </label>
              <select
                id="topic-filter"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value as EssayTopic)}
                className="appearance-none bg-transparent py-1.5 pr-6 font-sans text-[14px] text-[#141414] focus:outline-none"
              >
                {ESSAY_TOPICS.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#606060]"
              />
            </div>
          </div>

          {/* Stacked Essay List */}
          {filteredEssays.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="py-10"
            >
              <p className="font-serif text-[17px] text-[#595959]">
                No essays matched “{query}” in {selectedTopic}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedTopic('All topics');
                }}
                className="mt-3 font-sans text-[13px] font-medium text-[#141414] underline underline-offset-4"
              >
                Reset filters
              </button>
            </motion.div>
          ) : (
            <ul className="space-y-8 pt-2">
              {filteredEssays.map((essay, idx) => (
                <motion.li
                  key={essay.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(idx * 0.04, 0.2),
                    ease: EDITORIAL_EASE,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => openEssay(essay)}
                    className="group block w-full text-left transition-transform duration-200 hover:translate-x-0.5 focus:outline-none"
                  >
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                      <h2 className="font-serif text-[20px] font-normal leading-[1.35] text-[#141414] transition-colors group-hover:underline group-hover:decoration-[#141414] group-hover:underline-offset-4">
                        {essay.title}
                      </h2>
                      <time className="shrink-0 font-serif text-[15px] text-[#606060] tabular-nums">
                        {essay.date}
                      </time>
                    </div>
                    <p className="mt-1 font-serif text-[17px] leading-[1.55] text-[#525252]">
                      {essay.subtitle}
                    </p>
                  </button>
                </motion.li>
              ))}
            </ul>
          )}

          {/* Reading List Section */}
          <EditorialReveal>
            <div
              id="reading-list"
              aria-labelledby="heading-reading-list"
              className="mt-16 border-t border-[#E5E5E5] pt-12"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
                <div>
                  <h2
                    id="heading-reading-list"
                    className="font-serif text-[26px] font-normal leading-[1.25] tracking-[-0.01em] text-[#141414] sm:text-[28px]"
                  >
                    Reading List
                  </h2>
                  <p className="mt-2 max-w-[58ch] font-serif text-[17px] leading-[1.6] text-[#525252]">
                    Key books, sector reports, and briefs that have shaped my business mindset.
                  </p>
                </div>
              </div>

              <div
                role="tablist"
                aria-label="Filter reading list by format"
                className="mt-6 flex flex-wrap items-center gap-6 border-b border-[#E5E5E5]"
              >
                {READING_CATEGORIES.map((category) => {
                  const isSelected = readingCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setReadingCategory(category)}
                      className={`relative pb-3 font-sans text-[12px] uppercase tracking-[0.08em] transition-colors duration-200 ${
                        isSelected
                          ? 'font-medium text-[#141414]'
                          : 'text-[#606060] hover:text-[#141414]'
                      }`}
                    >
                      <span>{category}</span>
                      {isSelected && (
                        <motion.span
                          layoutId="reading-tab-underline"
                          transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[#141414]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <motion.ul
                key={readingCategory}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: EDITORIAL_EASE }}
                className="divide-y divide-[#F0F0F0]"
              >
                {filteredReading.map((item, idx) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.24,
                      delay: Math.min(idx * 0.025, 0.12),
                      ease: EDITORIAL_EASE,
                    }}
                    className="py-6 first:pt-5 last:pb-0"
                  >
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                      <h3 className="font-serif text-[19.5px] font-normal leading-[1.35] text-[#141414]">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-baseline gap-1.5 underline decoration-[#D4D4D4] underline-offset-4 transition-colors hover:decoration-[#141414]"
                          >
                            <span>{item.title}</span>
                            <ArrowUpRight className="inline h-3.5 w-3.5 shrink-0 translate-y-[1px] text-[#606060] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#141414]" />
                          </a>
                        ) : (
                          item.title
                        )}
                      </h3>
                      <span className="shrink-0 font-sans text-[12.5px] text-[#606060]">
                        {item.category}
                      </span>
                    </div>

                    <p className="mt-1 font-sans text-[13px] text-[#606060]">
                      {item.author} &middot; Mindset: {item.mindsetPrinciple}
                    </p>

                    <p className="mt-2 font-serif text-[16.5px] leading-[1.6] text-[#242424]">
                      {item.takeaway}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </EditorialReveal>

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
        </motion.section>
      )}
    </AnimatePresence>
  );
}
