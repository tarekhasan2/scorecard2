import { supabase } from '../../config/supabase';
import { KPI } from '../../types';

export const kpiDB = {
  async createKPI(kpi: Omit<KPI, 'id'>, userId: string) {
    const { data, error } = await supabase
      .from('kpis')
      .insert({
        ...kpi,
        created_by: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getKPIsByUser(userId: string) {
    const { data, error } = await supabase
      .from('kpis')
      .select()
      .eq('created_by', userId);

    if (error) throw error;
    return data;
  },

  async updateKPI(id: string, updates: Partial<KPI>, userId: string) {
    const { data, error } = await supabase
      .from('kpis')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('created_by', userId) // Ensure user can only update their own KPIs
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteKPI(id: string, userId: string) {
    const { error } = await supabase
      .from('kpis')
      .delete()
      .eq('id', id)
      .eq('created_by', userId); // Ensure user can only delete their own KPIs

    if (error) throw error;
  }
};