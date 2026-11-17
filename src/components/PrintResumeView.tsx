import {
  ABOUT_PARAGRAPHS,
  BEYOND_CLASS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  SKILLS,
  WHATS_AHEAD,
} from '../data/profileData';

export function PrintResumeView() {
  return (
    <div className="print-only-header">
      <div className="border-b border-[#141414] pb-2">
        <div className="font-serif text-[20pt] leading-none text-[#141414]">
          {PROFILE.name}
        </div>
        <div className="mt-1 font-sans text-[9pt] font-semibold text-[#141414]">
          {PROFILE.headline}
        </div>
        <div className="mt-0.5 font-mono text-[7.8pt] text-[#333333]">
          {PROFILE.location} &middot; {PROFILE.email} &middot; {PROFILE.phoneDisplay} &middot;{' '}
          {PROFILE.linkedinUrl}
        </div>
      </div>

      <div className="mt-3 space-y-3 text-[8.5pt] leading-[1.35] text-[#141414]">
        <div>
          <div className="font-sans text-[8pt] font-bold uppercase tracking-[0.06em]">
            About
          </div>
          {ABOUT_PARAGRAPHS.map((p, idx) => (
            <p key={idx} className="mt-1 font-serif">
              {p}
            </p>
          ))}
        </div>

        <div className="border-t border-[#CCCCCC] pt-2">
          <div className="font-sans text-[8pt] font-bold uppercase tracking-[0.06em]">
            Education &amp; Distinction
          </div>
          <p className="mt-1 font-serif">
            <strong>{EDUCATION.university.institution}</strong> ({EDUCATION.university.dates}) —{' '}
            {EDUCATION.university.degree}. Coursework: {EDUCATION.university.coursework.join(', ')}.
          </p>
          <p className="mt-1 font-serif">
            <strong>{EDUCATION.school.institution}</strong> ({EDUCATION.school.dates}) —{' '}
            {EDUCATION.school.scores}
          </p>
          <p className="mt-1 font-serif">
            <strong>{EDUCATION.distinction.title}</strong>: {EDUCATION.distinction.rank} (
            {EDUCATION.distinction.rankDetail}) &middot; {EDUCATION.distinction.qualifier}
          </p>
        </div>

        <div className="border-t border-[#CCCCCC] pt-2">
          <div className="font-sans text-[8pt] font-bold uppercase tracking-[0.06em]">
            Experience
          </div>
          <p className="mt-1 font-serif">
            <strong>{EXPERIENCE.role}</strong>, {EXPERIENCE.company} ({EXPERIENCE.dates} &middot; 45 days, Hybrid, Panipat)
          </p>
          <ul className="mt-1 list-disc pl-4 font-serif">
            {EXPERIENCE.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <p className="mt-1 font-serif italic">Takeaway: {EXPERIENCE.takeaway}</p>
        </div>

        <div className="border-t border-[#CCCCCC] pt-2">
          <div className="font-sans text-[8pt] font-bold uppercase tracking-[0.06em]">
            Beyond Class &amp; Direction
          </div>
          <p className="mt-1 font-serif">
            {BEYOND_CLASS.map((b) => `${b.title}: ${b.points.join(' ')}`).join(' · ')}
          </p>
          <p className="mt-1 font-serif">
            <strong>What’s ahead:</strong> {WHATS_AHEAD.thesis} ({WHATS_AHEAD.focusAreas.join(' · ')})
          </p>
        </div>

        <div className="border-t border-[#CCCCCC] pt-2">
          <div className="font-sans text-[8pt] font-bold uppercase tracking-[0.06em]">
            Skills
          </div>
          <div className="mt-1 grid grid-cols-3 gap-3 font-serif">
            {SKILLS.map((group) => (
              <div key={group.title}>
                <strong className="font-sans text-[8pt]">{group.title}</strong>
                <ul className="mt-0.5 space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
