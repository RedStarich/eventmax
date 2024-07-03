// config/supabaseClient.ts
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
