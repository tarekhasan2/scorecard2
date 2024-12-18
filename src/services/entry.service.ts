import { supabase } from '../config/supabase';
import { WeeklyEntry, KPIEntry } from '../types';

export const entryService = {
  async createWeeklyEntry(entry: Omit<WeeklyEntry, 'id'>) {
    const { data, error } = await supabase
      .from('weekly_entries')
      .insert({
        ...entry,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async createKPIEntry(entry: Omit<KPIEntry, 'id'>) {
    const { data, error } = await supabase
      .from('kpi_entries')
      .insert({
        ...entry,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getWeeklyEntriesByEmployee(employeeId: string) {
    const { data, error } = await supabase
      .from('weekly_entries')
      .select()
      .eq('employee_id', employeeId);

    if (error) throw error;
    return data;
  },

  async getKPIEntriesByEmployee(employeeId: string) {
    const { data, error } = await supabase
      .from('kpi_entries')
      .select()
      .eq('employee_id', employeeId);

    if (error) throw error;
    return data;
  },
};