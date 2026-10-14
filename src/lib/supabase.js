import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-project-ref')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Submit a message from the Contact section
 * @param {Object} data { name, email, phone, subject, message }
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function submitContactMessage(data) {
  if (!isSupabaseConfigured || !supabase) {
    console.info('Supabase credentials not configured in .env. Message logged locally:', data);
    // Simulate slight network latency when running in local demo mode
    await new Promise((r) => setTimeout(r, 800));
    return { success: true, simulated: true };
  }

  try {
    const nameVal = data.name?.trim() || 'Guest Visitor';
    const emailVal = data.email?.trim() || 'visitor@manasathuluru.com';
    const messageVal = data.message?.trim() || '';

    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: nameVal,
          email: emailVal,
          phone: data.phone?.trim() || null,
          subject: data.subject?.trim() || null,
          message: messageVal,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Supabase error inserting contact message:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error sending contact message:', err);
    return { success: false, error: err.message || 'Network error' };
  }
}
