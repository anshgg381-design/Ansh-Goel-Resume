export interface PixelCell {
  x: number;
  y: number;
  color: string;
  key: string;
}

export interface OrbitIdea {
  id: string;
  label: string;
  detail: string;
  accent: string;
}

export interface CursorParallax {
  nx: number;
  ny: number;
  eyeX: number;
  eyeY: number;
  tiltX: number;
  tiltY: number;
}

export interface OrbitPosition {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

export const PIXEL_PALETTE: Record<string, string> = {
  K: '#141414', // Deep ink outline / hair / glasses / desk frame
  H: '#2E2E2E', // Hair highlight
  Y: '#E9B31B', // Warm mustard gold (Adham splash + primary site accent)
  y: '#F4CE5C', // Light gold / idea bulb glow
  T: '#4D8B94', // Muted teal splash
  t: '#7BB2BA', // Light teal / thought highlight
  C: '#D96B52', // Terracotta / coral splash
  c: '#EB9582', // Soft coral highlight
  S: '#F2D2B6', // Warm skin tone
  s: '#DDB492', // Skin shadow
  W: '#FAF8F4', // Crisp paper off-white / shirt / laptop screen / sclera
  L: '#EAE5D9', // Warm linen / collar / pages
  G: '#C8C4BC', // Cool stone grey / keyboard / subtle pixel motif
  g: '#E2DFD9', // Very light subtle pixel motif
  B: '#334E68', // Deep navy slate jacket / laptop lid
  b: '#4E6E8E', // Medium slate highlight
  M: '#8B6F56', // Warm desk wood / chai mug
  m: '#B3987E', // Desk highlight / book spine
};

export const ORBIT_IDEAS: readonly OrbitIdea[] = [
  {
    id: 'yarn-sourcing',
    label: 'Yarn Sourcing',
    detail:
      'Tracing fibre quality, yarn trading dynamics, and mill supply around Panipat.',
    accent: '#E9B31B',
  },
  {
    id: 'rugs-carpets',
    label: 'Rugs & Carpets',
    detail:
      'Studying how finished home furnishings are woven, finished, and shipped abroad.',
    accent: '#D96B52',
  },
  {
    id: 'uk-duty',
    label: '0% UK Duty',
    detail:
      'Tracking how the July 2026 India–UK trade deal opens new export markets.',
    accent: '#4D8B94',
  },
  {
    id: 'unit-costing',
    label: 'Unit Costing',
    detail:
      'Modelling order margins from raw yarn and loom time through export freight.',
    accent: '#141414',
  },
  {
    id: 'mutual-funds',
    label: 'Mutual Funds',
    detail:
      'Comparing Indian mutual fund schemes and market cycles using the raw figures.',
    accent: '#E9B31B',
  },
  {
    id: 'floor-ops',
    label: 'Floor Ops',
    detail:
      'Connecting production schedules, raw material supply, and team follow-ups.',
    accent: '#4D8B94',
  },
];

/**
 * 44x40 pixel-art grid of an imaginary hardworking builder/analyst character
 * working on a laptop and thinking about ideas, inspired by Adham Dannaway's
 * split painterly/ink editorial portrait aesthetic.
 */
export const CHARACTER_PIXEL_GRID: readonly string[] = [
  '..................................yYy.......',
  '.............Y....K....K.........yYYYy......',
  '............T...KKKKKKKKH........yYYYy......',
  '..............KKKKKKKKKKKK........KKK.......',
  '........Y....KKKYKKKHHHHHHK.......K.K.......',
  '............KKKKKTKKKHHHHHHK.....W..........',
  '...........KKCKKYKKKKKHHHHHHK...............',
  '..........KKKYKKKKKKKKKHHHHHHK..W...........',
  '..........KKKKTTKKKYKKKKKHHHHK..............',
  '.........KKKKKWWKKCKKKKKKHHHHK..............',
  '.........KKTKKKKKKKKKKKKKSSHHK..............',
  '.........KKYKKYYYYWWWKSSSSSSSK..............',
  '........CKKKKKKWWTTTTKSSKKSSKK..............',
  '........CKTKKKWKKKKKKKSSKKKKKK..............',
  '........KKYKKWKWWWWKWKKSWWWSKt..............',
  '.......tKKWKKWKWWWWKWKKSWWWSKt..............',
  '........KKCKKWKKKKKKWKKSKKKKKs..............',
  '........KKTKKKWWWWWWKKSSSSSSss..............',
  '........KKYKKCCCCCCCCKSSSSsSK...............',
  '.........KKYYCCCCWWCCKSSKKKKK...............',
  '.........CKKKTTTWWWWWKKKKsSK................',
  '..........KKKKTTTTWWKKssssK.................',
  '...........KKKKKYYKKKKKKK...................',
  '............KKKKKKKSSsK.....................',
  '......Y....YKKKKKLLSSSK.....................',
  '....T..Y..KKTTKKLLLWWLLK....................',
  '..C..T...KKYYTKKLWWWWWWLK...................',
  '...Y....KKCCYYKBBBBBBBBBBBBK................',
  '..T.C..KKTTCCKBBKKKKKKKKKKBBK...............',
  '.Y....KKYYTTKKBKKWWWWWWWWWWKBK..............',
  '..Y..KKCCYYKKKBKKWTTWWYYWCCKBK..............',
  '..C.KKTTCCKKKKBKKWTTWYYYWCWKBK..............',
  '...KKYYTTKKKKKBKKWTTWYYYWCCKBK....MMM.......',
  '..KKCCKKKKKKWWBKKWWWWWWWWWWKBK...KMMMKK.....',
  '..KCCCCKTTKKWWBKKKKKKKKKKKKKKK...KMMmKK.....',
  '.KYYYYKYTYYKSSKKGGGGGGGGGGGGKK...KMMMK......',
  '.KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK.....',
  '.KMMMMMMMmMMMMMMmMMMMMMMmMMMMMMMmMMMMMK.....',
  '.KMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMK.....',
  '..KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK......',
];

export const PIXEL_GRID_WIDTH = CHARACTER_PIXEL_GRID[0].length;
export const PIXEL_GRID_HEIGHT = CHARACTER_PIXEL_GRID.length;

export function parsePixelGrid(
  grid: readonly string[],
  palette: Record<string, string> = PIXEL_PALETTE
): PixelCell[] {
  const cells: PixelCell[] = [];
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === '.') continue;
      const color = palette[ch];
      if (color) {
        cells.push({ x, y, color, key: `${x}-${y}` });
      }
    }
  }
  return cells;
}

export function computeCursorParallax(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number }
): CursorParallax {
  if (rect.width <= 0 || rect.height <= 0) {
    return { nx: 0, ny: 0, eyeX: 0, eyeY: 0, tiltX: 0, tiltY: 0 };
  }
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const rawX = (clientX - cx) / (rect.width / 2);
  const rawY = (clientY - cy) / (rect.height / 2);
  const nx = Math.max(-1, Math.min(1, rawX));
  const ny = Math.max(-1, Math.min(1, rawY));
  return {
    nx: Number(nx.toFixed(3)),
    ny: Number(ny.toFixed(3)),
    eyeX: Number((nx * 0.65).toFixed(3)),
    eyeY: Number((ny * 0.45).toFixed(3)),
    tiltX: Number((-ny * 5).toFixed(3)),
    tiltY: Number((nx * 6).toFixed(3)),
  };
}

export function computeOrbitPosition(
  angleRad: number,
  rx: number,
  ry: number
): OrbitPosition {
  const x = Math.cos(angleRad) * rx;
  const y = Math.sin(angleRad) * ry;
  const sin = Math.sin(angleRad);
  const isBehindTorso = sin > 0.25;
  const lift = Math.max(0, -sin);
  return {
    x: Number(x.toFixed(2)),
    y: Number(y.toFixed(2)),
    scale: Number((isBehindTorso ? 0.86 : 0.94 + 0.08 * lift).toFixed(3)),
    opacity: Number((isBehindTorso ? 0.25 : 0.88 + 0.12 * lift).toFixed(3)),
    zIndex: isBehindTorso ? 1 : 20,
  };
}

export function nextCycleIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex + 1) % total;
}
