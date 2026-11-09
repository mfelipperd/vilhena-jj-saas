import { useTranslation } from 'react-i18next';
import type { StudentCategory } from '../../types';

import type { VilhenaFieldsValue } from './vilhenaFields';

const CATEGORIES: StudentCategory[] = ['kids', 'juvenil', 'adulto', 'master'];
const KIMONO_SIZES = ['M00', 'M0', 'M1', 'M2', 'M3', 'M4', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
const BELT_SIZES = ['XS', 'P', 'M', 'G', 'GG', 'A0', 'A1', 'A2', 'A3', 'A4'];

const inputCls =
  'w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200';
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300';

interface Props {
  value: VilhenaFieldsValue;
  onChange: (next: VilhenaFieldsValue) => void;
}

export default function StudentVilhenaFields({ value, onChange }: Props) {
  const { t } = useTranslation();
  const set = <K extends keyof VilhenaFieldsValue>(key: K, v: VilhenaFieldsValue[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <div className="w-1 h-6 bg-red-500 rounded-full mr-3"></div>
        {t('studentForm.vilhena.sectionTitle')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={labelCls} htmlFor="student-category">{t('studentForm.vilhena.category')}</label>
          <select id="student-category" className={inputCls} value={value.category}
            onChange={(e) => set('category', e.target.value as StudentCategory | '')}>
            <option value="">{t('studentForm.vilhena.select')}</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{t(`studentForm.vilhena.categories.${c}`)}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className={labelCls} htmlFor="student-guardian">{t('studentForm.vilhena.guardianName')}</label>
          <input id="student-guardian" type="text" maxLength={120} className={inputCls}
            placeholder={t('studentForm.vilhena.guardianNamePlaceholder')}
            value={value.guardianName} onChange={(e) => set('guardianName', e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className={labelCls} htmlFor="student-bjj-start">{t('studentForm.vilhena.bjjStartDate')}</label>
          <input id="student-bjj-start" type="date" className={inputCls}
            value={value.bjjStartDate} onChange={(e) => set('bjjStartDate', e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className={labelCls} htmlFor="student-due-day">{t('studentForm.vilhena.dueDay')}</label>
          <input id="student-due-day" type="number" min={1} max={31} inputMode="numeric" className={inputCls}
            placeholder={t('studentForm.vilhena.dueDayPlaceholder')} value={value.dueDay} onChange={(e) => set('dueDay', e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className={labelCls} htmlFor="student-kimono">{t('studentForm.vilhena.kimonoSize')}</label>
          <select id="student-kimono" className={inputCls} value={value.kimonoSize}
            onChange={(e) => set('kimonoSize', e.target.value)}>
            <option value="">{t('studentForm.vilhena.select')}</option>
            {KIMONO_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className={labelCls} htmlFor="student-belt-size">{t('studentForm.vilhena.beltSize')}</label>
          <select id="student-belt-size" className={inputCls} value={value.beltSize}
            onChange={(e) => set('beltSize', e.target.value)}>
            <option value="">{t('studentForm.vilhena.select')}</option>
            {BELT_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
