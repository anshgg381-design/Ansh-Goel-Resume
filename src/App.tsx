import { ArrowRight, Printer } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { Header } from './components/Header';
import {
  EDITORIAL_EASE,
  EditorialReveal,
  EditorialStaggerItem,
} from './components/MotionPrimitives';
import { PixelBuilderCharacter } from './components/PixelBuilderCharacter';
import { PrintResumeView } from './components/PrintResumeView';
import { WritingSection } from './components/WritingSection';
import {
  ABOUT_PARAGRAPHS,
  BEYOND_CLASS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  SKILLS,
  TIMELINE_20_SECONDS,
  WHATS_AHEAD,
} from './data/profileData';
import { parseRouteHash, type PageRoute } from './utils/portfolioLogic';

export default function App() {
  const [route, setRoute] = useState<PageRoute>(() =>
    parseRouteHash(window.location.hash)
  );

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRouteHash(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = (nextRoute: PageRoute) => {
    const nextHash = nextRoute === 'home' ? '#/' : `#/${nextRoute}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    } else {
      setRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (route === 'home') {
    return (
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-white text-[#242424]">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-[#141414] focus:px-4 focus:py-2 focus:font-sans focus:text-xs focus:text-white"
          >
            Skip to content
          </a>

          <main
            id="main-content"
            className="mx-auto flex min-h-screen max-w-[1080px] flex-col justify-center px-6 sm:px-10"
          >
            <PrintResumeView />

            <div className="no-print grid w-full items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
              <motion.section
                aria-label="Introduction"
                className="max-w-[600px]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
              >
                <h1 className="font-serif text-[25px] font-normal leading-[1.46] tracking-[-0.01em] text-[#242424] sm:text-[28.5px]">
                  <strong className="font-semibold text-[#141414]">
                    Hi, I’m {PROFILE.name}.
                  </strong>{' '}
                  I’m a BBA-DBE undergraduate at IIM Bangalore from a Panipat
                  yarn-trading family, focused on textile manufacturing, business
                  operations, and Indian financial markets.
                </h1>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1,
                    ease: EDITORIAL_EASE,
                  }}
                >
                  <Header
                    currentRoute={route}
                    onNavigate={navigateTo}
                    variant="home"
                  />
                </motion.div>
              </motion.section>

              <aside
                aria-label="Pixel art illustration"
                className="flex items-center justify-center lg:justify-end"
              >
                <PixelBuilderCharacter />
              </aside>
            </div>
          </main>
        </div>
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-white text-[#242424]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-[#141414] focus:px-4 focus:py-2 focus:font-sans focus:text-xs focus:text-white"
        >
          Skip to content
        </a>

        <Header currentRoute={route} onNavigate={navigateTo} variant="inner" />

        <main
          id="main-content"
          className="mx-auto w-full max-w-[700px] flex-1 px-6 pb-20 sm:px-0"
        >
          <PrintResumeView />

          <div className="no-print">
            <AnimatePresence mode="wait">
              {/* ABOUT PAGE */}
              {route === 'about' && (
                <motion.section
                  key="page-about"
                  aria-labelledby="heading-about"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
                >
                  <h1
                    id="heading-about"
                    className="font-serif text-[32px] font-normal leading-[1.2] tracking-[-0.015em] text-[#141414] sm:text-[36px]"
                  >
                    Hi, I’m {PROFILE.name}.
                  </h1>

                  {/* 20-second version matching justinwelsh.me/about */}
                  <div className="mt-12">
                    <h2 className="font-serif text-[21px] font-normal text-[#141414]">
                      The 20-second about me version
                    </h2>
                    <dl className="mt-5 space-y-4">
                      {TIMELINE_20_SECONDS.map((entry, idx) => (
                        <motion.div
                          key={entry.period}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.05 }}
                          transition={{
                            duration: 0.34,
                            delay: Math.min(idx * 0.04, 0.2),
                            ease: EDITORIAL_EASE,
                          }}
                          className="grid gap-1 sm:grid-cols-[120px_1fr] sm:gap-6"
                        >
                          <dt className="font-sans text-[13px] text-[#606060] tabular-nums">
                            {entry.period}
                          </dt>
                          <dd className="font-serif text-[17.5px] leading-[1.55] text-[#242424]">
                            {entry.summary}
                          </dd>
                        </motion.div>
                      ))}
                    </dl>
                  </div>

                  {/* 2-minute version */}
                  <EditorialReveal className="mt-14 space-y-5">
                    <h2 className="font-serif text-[21px] font-normal text-[#141414]">
                      The 2-minute about me version
                    </h2>
                    {ABOUT_PARAGRAPHS.map((para, index) => (
                      <p
                        key={index}
                        className="font-serif text-[18px] leading-[1.68] text-[#242424]"
                      >
                        {para}
                      </p>
                    ))}
                  </EditorialReveal>

                  {/* Experience */}
                  <EditorialReveal className="mt-14 border-t border-[#EAEAEA] pt-10">
                    <p className="font-sans text-[11.5px] uppercase tracking-[0.08em] text-[#606060]">
                      Experience
                    </p>
                    <div className="mt-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                      <div>
                        <h2 className="font-serif text-[22px] font-normal text-[#141414]">
                          {EXPERIENCE.role}
                        </h2>
                        <p className="font-serif text-[17px] text-[#525252]">
                          {EXPERIENCE.company}
                        </p>
                      </div>
                      <p className="font-sans text-[13px] text-[#606060] tabular-nums">
                        {EXPERIENCE.dates}
                      </p>
                    </div>

                    <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-[#EAEAEA] py-4 sm:grid-cols-4">
                      {EXPERIENCE.facts.map((fact) => (
                        <div key={fact.label}>
                          <dt className="font-sans text-[11px] uppercase tracking-[0.08em] text-[#606060]">
                            {fact.label}
                          </dt>
                          <dd className="mt-0.5 font-serif text-[15.5px] text-[#141414] tabular-nums">
                            {fact.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="mt-5 space-y-2.5">
                      {EXPERIENCE.bullets.map((bullet, idx) => (
                        <li
                          key={idx}
                          className="relative pl-5 font-serif text-[17.5px] leading-[1.6] text-[#242424]"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-[0.65em] h-px w-2.5 bg-[#141414]"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 border-t border-[#F0F0F0] pt-4 font-serif text-[17.5px] italic leading-[1.6] text-[#141414]">
                      <span className="not-italic font-sans text-[11.5px] uppercase tracking-[0.08em] text-[#606060]">
                        What stayed with me:{' '}
                      </span>
                      {EXPERIENCE.takeaway}
                    </p>
                  </EditorialReveal>

                  {/* Beyond class */}
                  <EditorialReveal className="mt-14 border-t border-[#EAEAEA] pt-10">
                    <p className="font-sans text-[11.5px] uppercase tracking-[0.08em] text-[#606060]">
                      Beyond class
                    </p>
                    <div className="mt-4 grid gap-8 sm:grid-cols-2">
                      {BEYOND_CLASS.map((block, idx) => (
                        <EditorialStaggerItem key={block.title} index={idx}>
                          <article>
                            <h3 className="font-serif text-[20px] font-normal text-[#141414]">
                              {block.title}
                            </h3>
                            <p className="mt-2 font-serif text-[16.5px] leading-[1.6] text-[#525252]">
                              {block.intro}
                            </p>
                            <ul className="mt-3 space-y-2">
                              {block.points.map((point, pIdx) => (
                                <li
                                  key={pIdx}
                                  className="relative pl-4 font-serif text-[16px] leading-[1.55] text-[#242424]"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="absolute left-0 top-[0.65em] h-px w-2 bg-[#737373]"
                                  />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </article>
                        </EditorialStaggerItem>
                      ))}
                    </div>
                  </EditorialReveal>

                  <div className="mt-14">
                    <a
                      href="#/"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('home');
                      }}
                      className="font-sans text-[13px] text-[#606060] transition-colors hover:text-[#141414]"
                    >
                      &larr; Home
                    </a>
                  </div>
                </motion.section>
              )}

              {/* WRITING PAGE */}
              {route === 'writing' && (
                <motion.div
                  key="page-writing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
                >
                  <WritingSection onNavigate={navigateTo} />
                </motion.div>
              )}

              {/* EDUCATION PAGE */}
              {route === 'education' && (
                <motion.section
                  key="page-education"
                  aria-labelledby="heading-education"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
                >
                  <h1
                    id="heading-education"
                    className="font-serif text-[32px] font-normal leading-[1.2] tracking-[-0.015em] text-[#141414] sm:text-[36px]"
                  >
                    Education
                  </h1>
                  <p className="mt-4 max-w-[60ch] font-serif text-[18px] leading-[1.6] text-[#242424]">
                    Undergraduate study in digital business and entrepreneurship at IIM Bangalore, schooling in Panipat, and national economics Olympiad distinction.
                  </p>

                  <div className="mt-10 divide-y divide-[#EAEAEA]">
                    <EditorialReveal>
                      <article className="pb-8">
                        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                          <h2 className="font-serif text-[23px] font-normal text-[#141414]">
                            {EDUCATION.university.institution}
                          </h2>
                          <span className="font-sans text-[13px] text-[#606060] tabular-nums">
                            {EDUCATION.university.dates}
                          </span>
                        </div>
                        <p className="mt-1.5 font-serif text-[17.5px] text-[#242424]">
                          {EDUCATION.university.degree}
                        </p>

                        <div className="mt-5 border-t border-dashed border-[#E0E0E0] pt-4">
                          <p className="font-sans text-[11.5px] uppercase tracking-[0.08em] text-[#606060]">
                            {EDUCATION.university.courseworkLabel}
                          </p>
                          <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                            {EDUCATION.university.coursework.map((course) => (
                              <li
                                key={course}
                                className="font-serif text-[16.5px] text-[#242424]"
                              >
                                &middot; {course}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    </EditorialReveal>

                    <EditorialReveal delay={0.05}>
                      <article className="py-8">
                        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                          <h2 className="font-serif text-[23px] font-normal text-[#141414]">
                            {EDUCATION.school.institution}
                          </h2>
                          <span className="font-sans text-[13px] text-[#606060] tabular-nums">
                            {EDUCATION.school.dates}
                          </span>
                        </div>
                        <p className="mt-1.5 font-sans text-[14px] font-medium text-[#242424] tabular-nums">
                          {EDUCATION.school.scores}
                        </p>
                      </article>
                    </EditorialReveal>

                    <EditorialReveal delay={0.08}>
                      <article className="pt-8">
                        <div className="border border-[#E2E2E2] p-6 transition-colors duration-200 hover:border-[#141414] sm:p-7">
                          <p className="font-sans text-[11.5px] uppercase tracking-[0.08em] text-[#606060]">
                            {EDUCATION.distinction.kicker}
                          </p>
                          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
                            <div>
                              <h2 className="font-serif text-[23px] font-normal text-[#141414]">
                                {EDUCATION.distinction.title}
                              </h2>
                              <p className="mt-1 font-serif text-[16.5px] text-[#525252]">
                                {EDUCATION.distinction.qualifier} &middot;{' '}
                                {EDUCATION.distinction.certificate}
                              </p>
                            </div>
                            <div className="sm:text-right">
                              <p className="font-serif text-[26px] font-semibold leading-none text-[#141414] tabular-nums">
                                {EDUCATION.distinction.rank}
                              </p>
                              <p className="mt-1.5 font-sans text-[12.5px] text-[#606060] tabular-nums">
                                {EDUCATION.distinction.rankDetail}
                              </p>
                            </div>
                          </div>
                        </div>
                      </article>
                    </EditorialReveal>
                  </div>

                  <div className="mt-14">
                    <a
                      href="#/"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('home');
                      }}
                      className="font-sans text-[13px] text-[#606060] transition-colors hover:text-[#141414]"
                    >
                      &larr; Home
                    </a>
                  </div>
                </motion.section>
              )}

              {/* WHAT'S AHEAD PAGE */}
              {route === 'whats-ahead' && (
                <motion.section
                  key="page-whats-ahead"
                  aria-labelledby="heading-whats-ahead"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
                >
                  {/* Hairline framed card with warm gold CTA matching justinwelsh.me/chat */}
                  <div className="border border-[#E2E2E2] p-6 sm:p-8">
                    <p className="font-sans text-[11.5px] uppercase tracking-[0.08em] text-[#606060]">
                      Long-term direction
                    </p>
                    <h1
                      id="heading-whats-ahead"
                      className="mt-2 font-serif text-[30px] font-normal leading-[1.25] tracking-[-0.01em] text-[#141414] sm:text-[34px]"
                    >
                      What’s ahead
                    </h1>
                    <p className="mt-3 font-serif text-[19px] leading-[1.55] text-[#242424]">
                      {WHATS_AHEAD.thesis}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 font-sans text-[13px] text-[#525252]">
                      {WHATS_AHEAD.focusAreas.map((area) => (
                        <span key={area}>{area}</span>
                      ))}
                    </div>

                    <motion.a
                      href="#/contact"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('contact');
                      }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.12 }}
                      className="group mt-6 flex w-full items-center justify-between bg-[#E9B31B] px-5 py-3 font-sans text-[14px] font-medium text-[#171714] transition-colors duration-200 hover:bg-[#DDA812]"
                    >
                      <span>Discuss internships, sourcing, or textile trade</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </motion.a>
                  </div>

                  {/* Market I'm looking at */}
                  <EditorialReveal className="mt-14">
                    <h2 className="font-serif text-[23px] font-normal text-[#141414]">
                      {WHATS_AHEAD.marketHeading}
                    </h2>

                    <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                      {WHATS_AHEAD.marketStats.map((stat, idx) => (
                        <motion.li
                          key={stat.figure}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.05 }}
                          transition={{
                            duration: 0.36,
                            delay: Math.min(idx * 0.05, 0.2),
                            ease: EDITORIAL_EASE,
                          }}
                          className="border-t border-[#141414] pt-3"
                        >
                          <span className="block font-serif text-[32px] leading-none text-[#141414] tabular-nums">
                            {stat.figure}
                          </span>
                          <span className="mt-2 block font-serif text-[15px] leading-[1.45] text-[#525252]">
                            {stat.description}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    <p className="mt-7 font-serif text-[18px] leading-[1.68] text-[#242424]">
                      {WHATS_AHEAD.marketSummary}
                    </p>

                    <p className="mt-4 font-sans text-[12px] leading-[1.7] text-[#606060]">
                      Sources:{' '}
                      {WHATS_AHEAD.sources.map((src, idx) => (
                        <span key={src.label}>
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-[#D4D4D4] underline-offset-2 transition-colors hover:text-[#141414] hover:decoration-[#141414]"
                          >
                            {src.label}
                          </a>
                          {idx < WHATS_AHEAD.sources.length - 1 ? ', ' : '. '}
                        </span>
                      ))}
                      Figures as reported; checked November 2026.
                    </p>
                  </EditorialReveal>

                  {/* Business mindset */}
                  <EditorialReveal className="mt-14 border-t border-[#EAEAEA] pt-10">
                    <h2 className="font-serif text-[23px] font-normal text-[#141414]">
                      Business mindset
                    </h2>
                    <p className="mt-2 font-serif text-[17.5px] leading-[1.6] text-[#525252]">
                      {WHATS_AHEAD.mindsetIntro}
                    </p>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      {WHATS_AHEAD.mindset.map((item, idx) => (
                        <EditorialStaggerItem
                          key={item.number}
                          index={idx}
                          className="flex"
                        >
                          <article className="flex w-full flex-col border border-[#E5E5E5] bg-white p-5 transition-colors duration-200 hover:border-[#141414]">
                            <p className="font-mono text-[12px] text-[#606060]">
                              {item.number}
                            </p>
                            <h3 className="mt-2 font-serif text-[20px] font-normal text-[#141414]">
                              {item.title}
                            </h3>
                            <p className="mt-2 font-serif text-[16px] leading-[1.6] text-[#242424]">
                              {item.description}
                            </p>
                            <p className="mt-auto border-t border-dashed border-[#E5E5E5] pt-3 font-sans text-[12px] text-[#606060]">
                              {item.origin}
                            </p>
                          </article>
                        </EditorialStaggerItem>
                      ))}
                    </div>
                  </EditorialReveal>

                  {/* What I want to learn next */}
                  <EditorialReveal className="mt-14 border-t border-[#EAEAEA] pt-10">
                    <h2 className="font-serif text-[23px] font-normal text-[#141414]">
                      What I want to learn next
                    </h2>
                    <ol className="mt-5 space-y-3">
                      {WHATS_AHEAD.learningNext.map((goal, idx) => (
                        <motion.li
                          key={goal}
                          initial={{ opacity: 0, x: -6 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.05 }}
                          transition={{
                            duration: 0.3,
                            delay: Math.min(idx * 0.04, 0.2),
                            ease: EDITORIAL_EASE,
                          }}
                          className="flex items-baseline gap-4 font-serif text-[18px] leading-[1.6] text-[#242424]"
                        >
                          <span className="shrink-0 font-mono text-[12px] text-[#606060] tabular-nums">
                            0{idx + 1}.
                          </span>
                          <span>{goal}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </EditorialReveal>

                  <div className="mt-14">
                    <a
                      href="#/"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('home');
                      }}
                      className="font-sans text-[13px] text-[#606060] transition-colors hover:text-[#141414]"
                    >
                      &larr; Home
                    </a>
                  </div>
                </motion.section>
              )}

              {/* SKILLS PAGE */}
              {route === 'skills' && (
                <motion.section
                  key="page-skills"
                  aria-labelledby="heading-skills"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
                >
                  <h1
                    id="heading-skills"
                    className="font-serif text-[32px] font-normal leading-[1.2] tracking-[-0.015em] text-[#141414] sm:text-[36px]"
                  >
                    Skills
                  </h1>
                  <p className="mt-4 max-w-[60ch] font-serif text-[18px] leading-[1.6] text-[#242424]">
                    Foundational tools, industry familiarity from Panipat textile operations, and analytical habits from personal financial research.
                  </p>

                  <div className="mt-10 grid gap-8 sm:grid-cols-3">
                    {SKILLS.map((group, idx) => (
                      <EditorialStaggerItem
                        key={group.title}
                        index={idx}
                        className="flex"
                      >
                        <div className="flex w-full flex-col border-t border-[#141414] pt-4">
                          <h2 className="font-serif text-[19px] font-normal text-[#141414]">
                            {group.title}
                          </h2>
                          <ul className="mt-3 space-y-2">
                            {group.items.map((skill) => (
                              <li
                                key={skill}
                                className="font-serif text-[16.5px] leading-[1.5] text-[#242424]"
                              >
                                {skill}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-auto border-t border-dashed border-[#E5E5E5] pt-3 font-sans text-[12px] leading-[1.55] text-[#606060]">
                            {group.evidence}
                          </p>
                        </div>
                      </EditorialStaggerItem>
                    ))}
                  </div>

                  <div className="mt-12 border-t border-[#EAEAEA] pt-8">
                    <motion.button
                      type="button"
                      onClick={() => window.print()}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.12 }}
                      className="inline-flex items-center gap-2 border border-[#D4D4D4] px-4 py-2 font-sans text-[13px] font-medium text-[#141414] transition-colors hover:border-[#141414]"
                    >
                      <Printer className="h-3.5 w-3.5" />
                      <span>Print / Save one-page resume (PDF)</span>
                    </motion.button>
                  </div>

                  <div className="mt-14">
                    <a
                      href="#/"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('home');
                      }}
                      className="font-sans text-[13px] text-[#606060] transition-colors hover:text-[#141414]"
                    >
                      &larr; Home
                    </a>
                  </div>
                </motion.section>
              )}

              {/* CONTACT PAGE */}
              {route === 'contact' && (
                <motion.div
                  key="page-contact"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
                >
                  <ContactSection onNavigate={navigateTo} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Quiet centered footer matching justinwelsh.me */}
        <footer className="no-print py-12">
          <div className="mx-auto flex max-w-[700px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 font-sans text-[13px] text-[#6F6D66]">
            <a
              href="#/contact"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('contact');
              }}
              className="transition-colors hover:text-[#141414]"
            >
              Contact Me
            </a>
            <a
              href="#/writing"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('writing');
              }}
              className="transition-colors hover:text-[#141414]"
            >
              Writing
            </a>
            <a
              href="#/whats-ahead"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('whats-ahead');
              }}
              className="transition-colors hover:text-[#141414]"
            >
              What’s ahead
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="transition-colors hover:text-[#141414]"
            >
              Save Resume (PDF)
            </button>
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#141414]"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
