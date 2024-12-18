import { supabase } from '../../config/supabase';
import { User } from '../../types';

export const authDB = {
  async createUser(user: User) {
    const { data, error } = await supabase
      .from('users')
      .insert({
        netlify_id: user.id,
        email: user.email,
        full_name: user.user_metadata.full_name,
        roles: user.user_metadata.roles,
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

  async updateUser(netlifyId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update({
        email: updates.email,
        full_name: updates.user_metadata.full_name,
        roles: updates.user_metadata.roles,
        updated_at: new Date().toISOString(),
      })
      .eq('netlify_id', netlifyId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};