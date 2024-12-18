import { supabase } from '../config/supabase';
import { KPI } from '../types';

export const kpiService = {
  async createKPI(kpi: Omit<KPI, 'id'>) {
    const { data, error } = await supabase
      .from('kpis')
      .insert({
        ...kpi,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getActiveKPIs() {
    const { data, error } = await supabase
      .from('kpis')
      .select()
      .eq('status', 'active');

    if (error) throw error;
    return data;
  },

  async assignKPIToEmployee(kpiId: string, employeeId: string) {
    const { data, error } = await supabase
      .from('kpi_assignments')
      .insert({
        kpi_id: kpiId,
        employee_id: employeeId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateKPI(id: string, updates: Partial<KPI>) {
    const { data, error } = await supabase
      .from('kpis')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};