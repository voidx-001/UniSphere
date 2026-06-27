import { supabase } from '../lib/supabase.js';

// Fallback keeps registration usable before migrations are applied or while offline.
export const universities = [
  'Abdul Wali Khan University',
  'Air University',
  'Allama Iqbal Open University',
  'Bahauddin Zakariya University',
  'Bahria University',
  'Bahria University, Lahore Campus',
  'Beaconhouse National University',
  'COMSATS University Islamabad',
  'COMSATS University Islamabad, Lahore Campus',
  'FAST National University',
  'Fatima Jinnah Medical University, Lahore',
  'Forman Christian College (A Chartered University)',
  'Gomal University',
  'Government College University Lahore',
  'Green International University, Lahore',
  'Hajvery University, Lahore',
  'Imperial College of Business Studies, Lahore',
  'Information Technology University of the Punjab, Lahore',
  'Institute for Art and Culture, Lahore',
  'Institute of Management Sciences, Lahore',
  'International Islamic University',
  'Karachi University',
  'Khyber Medical University',
  'King Edward Medical University, Lahore',
  'Kinnaird College for Women, Lahore',
  'Lahore College for Women University',
  'Lahore Garrison University',
  'Lahore Leads University',
  'Lahore School of Economics',
  'Lahore University of Biological and Applied Sciences',
  'Lahore University of Management Sciences (LUMS)',
  'Military College of Signals',
  'Minhaj University Lahore',
  'National College of Arts, Lahore',
  'National College of Business Administration and Economics, Lahore',
  'National Institute of Technology, Lahore',
  'National University of Computer and Emerging Sciences, Lahore Campus',
  'National University of Modern Languages, Lahore Campus',
  'National University of Sciences and Technology (NUST)',
  'NUR International University, Lahore',
  'Pakistan Institute of Engineering and Applied Sciences',
  'Pakistan Institute of Fashion and Design, Lahore',
  'PIQC Institute of Quality, Lahore',
  'Punjab Tianjin University of Technology, Lahore',
  'Qarshi University, Lahore',
  'Quaid-i-Azam University',
  'Rashid Latif Khan University, Lahore',
  'Riphah International University, Lahore Campus',
  'Superior University, Lahore',
  'SZABIST',
  'University of Central Punjab, Lahore',
  'University of Child Health Sciences, Lahore',
  'University of Education, Lahore',
  'University of Engineering and Technology Lahore',
  'University of Health Sciences, Lahore',
  'University of Home Economics, Lahore',
  'University of Lahore',
  'University of Management and Technology, Lahore',
  'University of Peshawar',
  'University of Sargodha',
  'University of Science and Technology, Lahore',
  'University of South Asia, Lahore',
  'University of the Punjab, Lahore',
  'University of Veterinary and Animal Sciences, Lahore',
  'Virtual University of Pakistan',
  'Other'
];

let cachedUniversities = null;

export async function loadUniversities() {
  if (cachedUniversities) return cachedUniversities;

  const { data, error } = await supabase
    .from('universities')
    .select('name')
    .order('name');

  if (error || !data?.length) return universities;

  const names = data.map(({ name }) => name).filter(Boolean);
  cachedUniversities = [
    ...names.filter(name => name !== 'Other'),
    ...(names.includes('Other') ? ['Other'] : [])
  ];

  return cachedUniversities;
}
