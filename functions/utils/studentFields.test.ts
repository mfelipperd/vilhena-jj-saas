import { describe, expect, it } from 'vitest';
import { parseVilhenaFields } from './studentFields';

describe('parseVilhenaFields', () => {
  it('returns undefined for absent fields so updates skip them', () => {
    expect(parseVilhenaFields({})).toEqual({
      guardian_name: undefined,
      kimono_size: undefined,
      belt_size: undefined,
      bjj_start_date: undefined,
    });
  });

  it('accepts camelCase and snake_case keys', () => {
    const r = parseVilhenaFields({ guardianName: ' Maria ', kimono_size: 'A2', dueDay: '10', category: 'kids', bjjStartDate: '2022-03-01' });
    expect(r).toMatchObject({ guardian_name: 'Maria', kimono_size: 'A2', due_day: 10, category: 'kids', bjj_start_date: '2022-03-01' });
  });

  it('turns empty values into null to clear them', () => {
    expect(parseVilhenaFields({ guardianName: '', dueDay: null, category: '' })).toMatchObject({
      guardian_name: null, due_day: null, category: null,
    });
  });

  it.each([
    [{ dueDay: 0 }], [{ dueDay: 32 }], [{ dueDay: 1.5 }], [{ category: 'senior' }],
    [{ bjjStartDate: '01/03/2022' }], [{ bjjStartDate: '2026-13-45' }], [{ guardianName: 'x'.repeat(121) }], [{ kimonoSize: 5 }],
  ])('rejects invalid input %j', (input) => {
    expect(parseVilhenaFields(input)).toHaveProperty('error');
  });
});
