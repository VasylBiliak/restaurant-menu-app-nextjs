// Simple menu loader: fetches TSV from Google Sheets, parses it,
// normalizes fields and falls back to local menuData on failure.

import localMenu from '@/app/data/menuData';

const SHEET_TSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQxWCILmIzo6ZrEvntqFJx0s2DusYrJEMUQt7rnvMqO5shDdt3XE-k8ll7zCmm4_sIgC-B41WvGv81d/pub?gid=1607159484&single=true&output=tsv';

type RawRow = Record<string, string>;

let cachedMenu: Record<string, any[]> | null = null;
let cachedPromise: Promise<Record<string, any[]>> | null = null;

function toCamelCase(input: string) {
  return input
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .split(/\s+/)
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join('') || 'unknown';
}

function parseTSV(tsv: string): RawRow[] {
  const lines = tsv.split(/\r?\n/).filter(l => l.trim() !== '');
  if (lines.length === 0) return [];
  const headers = lines[0].split('\t').map(h => h.trim());
  const rows: RawRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split('\t');
    const row: RawRow = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = (cols[j] || '').trim();
    }
    // skip rows with no meaningful content
    const hasAny = Object.values(row).some(v => v && v.length > 0);
    if (hasAny) rows.push(row);
  }
  return rows;
}

function normalizeRows(rows: RawRow[]) {
  const grouped: Record<string, any[]> = {};
  let idCounter = 1000;

  for (const r of rows) {
    const rawCategory = (r['category'] || r['Category'] || '').trim() || 'uncategorized';
    const categoryKey = toCamelCase(rawCategory);

    const imagesField = (r['img'] || r['images'] || r['image'] || '').trim();
    const images = imagesField ? imagesField.split(',').map(s => s.trim()).filter(Boolean) : [];

    const item: any = {
      id: r['id'] ? Number(r['id']) : idCounter++,
      category: rawCategory,
      images,
      sizes: r['sizes'] || r['size'] || '',
      // preserve multilingual fields
      name_en: r['name_en'] || r['name'] || '',
      name_es: r['name_es'] || '',
      name_ua: r['name_ua'] || '',
      desc_en: r['desc_en'] || r['desc'] || '',
      desc_es: r['desc_es'] || '',
      desc_ua: r['desc_ua'] || '',
      badge_en: r['badge_en'] || '',
      badge_es: r['badge_es'] || '',
      badge_ua: r['badge_ua'] || '',
      price_en: r['price_en'] || r['price'] || '',
      price_ua: r['price_ua'] || '',
      raw: r,
    };

    if (!grouped[categoryKey]) grouped[categoryKey] = [];
    grouped[categoryKey].push(item);
  }

  return grouped;
}

async function fetchTSV(url: string): Promise<string> {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Network response not ok');
  const text = await resp.text();
  if (!text || text.trim().length === 0) throw new Error('Empty TSV');
  return text;
}

export async function fetchMenuData(): Promise<Record<string, any[]>> {
  if (cachedMenu) return cachedMenu;
  if (cachedPromise) return cachedPromise;

  cachedPromise = (async () => {
    try {
      const tsv = await fetchTSV(SHEET_TSV_URL);
      const rows = parseTSV(tsv);
      if (!rows || rows.length === 0) throw new Error('No rows parsed');
      const normalized = normalizeRows(rows);
      cachedMenu = normalized;
      return normalized;
    } catch (err) {
      // fallback to local data
      try {
        // localMenu default export structure may be object with arrays per category
        // convert localMenu into normalized shape preserving existing fields
        const normalized: Record<string, any[]> = {};
        for (const [key, arr] of Object.entries(localMenu)) {
          const catKey = toCamelCase(key);
          normalized[catKey] = (arr as any[]).map(i => ({
            id: i.id ?? i.title ?? Math.random(),
            category: key,
            images: i.images || [],
            sizes: i.sizes || '',
            name_en: i.title || i.name || '',
            name_es: i.title || '',
            name_ua: i.title || '',
            desc_en: i.tags || '',
            desc_es: i.tags || '',
            desc_ua: i.tags || '',
            badge_en: i.badge || '',
            price_en: i.price || '',
            price_ua: i.price || '',
            raw: i,
          }));
        }
        cachedMenu = normalized;
        return normalized;
      } catch (e) {
        // as last resort, return empty safe structure
        cachedMenu = { appetizers: [], mainCourses: [], seafood: [], desserts: [], wines: [], cocktails: [] };
        return cachedMenu;
      }
    }
  })();

  return cachedPromise;
}

export default fetchMenuData;
