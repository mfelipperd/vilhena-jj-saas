/**
 * Parsing/validation for the Vilhena-specific student registration fields.
 * Accepts camelCase (API body) or snake_case keys. A field that is absent yields
 * `undefined` (skip on update); an empty string / null yields `null` (clear the value).
 */
export const STUDENT_CATEGORIES = ['kids', 'juvenil', 'adulto', 'master'] as const;
export type StudentCategory = (typeof STUDENT_CATEGORIES)[number];

export interface VilhenaStudentFields {
  guardian_name?: string | null;
  bjj_start_date?: string | null;
  kimono_size?: string | null;
  belt_size?: string | null;
  due_day?: number | null;
  category?: StudentCategory | null;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function isRealDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

function pick(raw: Record<string, unknown>, camel: string, snake: string): unknown {
  return raw[camel] !== undefined ? raw[camel] : raw[snake];
}

function text(value: unknown, max: number): string | null | undefined | { error: string } {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;
  if (typeof value !== 'string') return { error: 'Invalid text value' };
  const trimmed = value.trim();
  if (trimmed.length > max) return { error: `Value too long (max ${max})` };
  return trimmed || null;
}

export function parseVilhenaFields(raw: object): VilhenaStudentFields | { error: string } {
  const r = raw as Record<string, unknown>;
  const out: VilhenaStudentFields = {};

  const guardian = text(pick(r, 'guardianName', 'guardian_name'), 120);
  if (guardian && typeof guardian === 'object') return guardian;
  out.guardian_name = guardian as string | null | undefined;

  const kimono = text(pick(r, 'kimonoSize', 'kimono_size'), 10);
  if (kimono && typeof kimono === 'object') return kimono;
  out.kimono_size = kimono as string | null | undefined;

  const beltSize = text(pick(r, 'beltSize', 'belt_size'), 10);
  if (beltSize && typeof beltSize === 'object') return beltSize;
  out.belt_size = beltSize as string | null | undefined;

  const start = text(pick(r, 'bjjStartDate', 'bjj_start_date'), 10);
  if (start && typeof start === 'object') return start;
  if (typeof start === 'string' && !isRealDate(start)) return { error: 'Invalid BJJ start date' };
  out.bjj_start_date = start as string | null | undefined;

  const due = pick(r, 'dueDay', 'due_day');
  if (due !== undefined) {
    if (due === null || due === '') out.due_day = null;
    else {
      const n = Number(due);
      if (!Number.isInteger(n) || n < 1 || n > 31) return { error: 'Due day must be between 1 and 31' };
      out.due_day = n;
    }
  }

  const category = pick(r, 'category', 'category');
  if (category !== undefined) {
    if (category === null || category === '') out.category = null;
    else if (typeof category === 'string' && (STUDENT_CATEGORIES as readonly string[]).includes(category)) {
      out.category = category as StudentCategory;
    } else return { error: 'Invalid category' };
  }

  return out;
}
