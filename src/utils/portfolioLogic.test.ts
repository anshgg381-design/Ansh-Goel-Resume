import assert from 'node:assert/strict';
import test from 'node:test';
import { ESSAYS, PROFILE, READING_LIST } from '../data/profileData.ts';
import {
  CHARACTER_PIXEL_GRID,
  ORBIT_IDEAS,
  PIXEL_GRID_HEIGHT,
  PIXEL_GRID_WIDTH,
  PIXEL_PALETTE,
  computeCursorParallax,
  computeOrbitPosition,
  nextCycleIndex,
  parsePixelGrid,
} from './pixelArt.ts';
import {
  buildVCard,
  filterEssays,
  filterReadingList,
  formatPanipatTime,
  parseRouteHash,
  validateContactForm,
  validateNewsletterEmail,
} from './portfolioLogic.ts';

test('parseRouteHash resolves empty, hash-prefixed, and unknown hashes cleanly', () => {
  assert.equal(parseRouteHash(''), 'home');
  assert.equal(parseRouteHash('#/'), 'home');
  assert.equal(parseRouteHash('#/about'), 'about');
  assert.equal(parseRouteHash('#whats-ahead'), 'whats-ahead');
  assert.equal(parseRouteHash('#/unknown-section'), 'home');
});

test('filterEssays returns all essays when query is empty and topic is All topics', () => {
  const result = filterEssays(ESSAYS, '', 'All topics');
  assert.equal(result.length, ESSAYS.length);
});

test('filterEssays narrows by topic and case-insensitive search query', () => {
  const ukResults = filterEssays(ESSAYS, 'duty', 'Textiles & Exports');
  assert.equal(ukResults.length, 1);
  assert.equal(ukResults[0].id, 'beyond-one-export-market');

  const emptyResults = filterEssays(ESSAYS, 'duty', 'Markets & Finance');
  assert.equal(emptyResults.length, 0);
});

test('filterReadingList returns all items or filters cleanly by Books vs Articles & Reports', () => {
  const all = filterReadingList(READING_LIST, 'All');
  assert.equal(all.length, READING_LIST.length);

  const books = filterReadingList(READING_LIST, 'Books');
  assert.ok(books.length > 0);
  assert.ok(books.every((item) => item.category === 'Books'));

  const articles = filterReadingList(READING_LIST, 'Articles & Reports');
  assert.ok(articles.length > 0);
  assert.ok(articles.every((item) => item.category === 'Articles & Reports'));
});

test('validateNewsletterEmail catches empty and invalid emails and accepts valid ones', () => {
  assert.equal(validateNewsletterEmail('').valid, false);
  assert.equal(validateNewsletterEmail('not-an-email').valid, false);
  assert.equal(validateNewsletterEmail('reader@example.com').valid, true);
});

test('validateContactForm validates all required fields accurately', () => {
  const invalid = validateContactForm({
    topic: '',
    name: '',
    email: 'bad',
    message: 'hi',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.topic);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    topic: 'Internship opportunity',
    name: 'Rohan Sharma',
    email: 'rohan@textiles.in',
    message: 'Would love to connect about an operations internship in Panipat.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildVCard produces standard vCard 3.0 output with profile metadata', () => {
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
  assert.match(vcf, /BEGIN:VCARD/);
  assert.match(vcf, /FN:Ansh Goel/);
  assert.match(vcf, /EMAIL;TYPE=INTERNET:ansh\.goel26@iimb\.ac\.in/);
  assert.match(vcf, /END:VCARD/);
});

test('formatPanipatTime formats time cleanly in Asia/Kolkata', () => {
  const sampleDate = new Date('2026-11-16T12:00:00Z');
  const formatted = formatPanipatTime(sampleDate);
  assert.match(formatted, /5:30/i);
});

test('CHARACTER_PIXEL_GRID rows have uniform width and valid palette glyphs', () => {
  assert.equal(CHARACTER_PIXEL_GRID.length, PIXEL_GRID_HEIGHT);
  for (const row of CHARACTER_PIXEL_GRID) {
    assert.equal(row.length, PIXEL_GRID_WIDTH);
    for (const ch of row) {
      if (ch !== '.') {
        assert.ok(PIXEL_PALETTE[ch], `Missing palette color for glyph "${ch}"`);
      }
    }
  }
  const parsed = parsePixelGrid(CHARACTER_PIXEL_GRID);
  assert.ok(parsed.length > 400);
  assert.equal(ORBIT_IDEAS.length, 6);
});

test('computeCursorParallax clamps normalized coordinates and outputs subtle eye/tilt offsets', () => {
  const box = { left: 100, top: 100, width: 200, height: 200 };
  const center = computeCursorParallax(200, 200, box);
  assert.equal(center.nx, 0);
  assert.equal(center.ny, 0);
  assert.equal(center.eyeX, 0);
  assert.equal(center.tiltY, 0);

  const farTopRight = computeCursorParallax(900, 0, box);
  assert.equal(farTopRight.nx, 1);
  assert.equal(farTopRight.ny, -1);
  assert.ok(farTopRight.eyeX > 0);
  assert.ok(farTopRight.eyeY < 0);
  assert.ok(farTopRight.tiltX > 0);
  assert.ok(farTopRight.tiltY > 0);
});

test('computeOrbitPosition places top-arc ideas in foreground and lower-arc behind torso', () => {
  const topArc = computeOrbitPosition(-Math.PI / 2, 168, 74);
  assert.equal(topArc.zIndex, 20);
  assert.equal(topArc.opacity, 1);
  assert.ok(topArc.y < 0);

  const lowerArc = computeOrbitPosition(Math.PI / 2, 168, 74);
  assert.equal(lowerArc.zIndex, 1);
  assert.ok(lowerArc.opacity < 0.5);
  assert.ok(lowerArc.y > 0);
});

test('nextCycleIndex advances and wraps cleanly across idea items', () => {
  assert.equal(nextCycleIndex(0, 6), 1);
  assert.equal(nextCycleIndex(5, 6), 0);
  assert.equal(nextCycleIndex(0, 0), 0);
});
