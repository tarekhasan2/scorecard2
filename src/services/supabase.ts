import { supabase } from '../config/supabase';
import { User } from '../types';

export const supabaseService = {
  async createUser(user: User) {
    const { data, error } = await supabase
      .from('users')
      .insert({
        id: crypto.randomUUID(),
        email: user.email,
        full_name: user.user_metadata.full_name,
        roles: user.user_metadata.roles,
        netlify_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserByNetlifyId(netlifyId: string) {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('netlify_id', netlifyId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async updateUser(id: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update({
        email: updates.email,
        full_name: updates.user_metadata.full_name,
        roles: updates.user_metadata.roles,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};