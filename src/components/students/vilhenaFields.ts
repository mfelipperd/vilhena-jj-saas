import type { StudentCategory, StudentFormData } from '../../types';

export interface VilhenaFieldsValue {
  guardianName: string;
  bjjStartDate: string;
  kimonoSize: string;
  beltSize: string;
  dueDay: string;
  category: StudentCategory | '';
}

export const emptyVilhenaFields: VilhenaFieldsValue = {
  guardianName: '',
  bjjStartDate: '',
  kimonoSize: '',
  beltSize: '',
  dueDay: '',
  category: '',
};

/** `forUpdate` sends empty values so a cleared field is actually cleared on the server. */
export function toVilhenaFormData(v: VilhenaFieldsValue, forUpdate = false): Partial<StudentFormData> {
  if (forUpdate) {
    return {
      guardianName: v.guardianName.trim(),
      bjjStartDate: v.bjjStartDate,
      kimonoSize: v.kimonoSize,
      beltSize: v.beltSize,
      dueDay: v.dueDay ? Number(v.dueDay) : null,
      category: v.category || null,
    };
  }
  return {
    guardianName: v.guardianName.trim() || undefined,
    bjjStartDate: v.bjjStartDate || undefined,
    kimonoSize: v.kimonoSize || undefined,
    beltSize: v.beltSize || undefined,
    dueDay: v.dueDay ? Number(v.dueDay) : undefined,
    category: v.category || undefined,
  };
}
