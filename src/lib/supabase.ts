import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export type Lead = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  instagram: string | null;
  consent: boolean;
  source: string;
  created_at: string;
  winner: boolean;
  winner_at: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
};
