-- Vilhena: extra student registration fields (guardian, BJJ start, sizes, due day, category)
ALTER TABLE students ADD COLUMN guardian_name TEXT;
ALTER TABLE students ADD COLUMN bjj_start_date TEXT;
ALTER TABLE students ADD COLUMN kimono_size TEXT;
ALTER TABLE students ADD COLUMN belt_size TEXT;
ALTER TABLE students ADD COLUMN due_day INTEGER CHECK (due_day IS NULL OR (due_day BETWEEN 1 AND 31));
ALTER TABLE students ADD COLUMN category TEXT CHECK (category IS NULL OR category IN ('kids', 'juvenil', 'adulto', 'master'));
