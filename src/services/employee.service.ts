import { supabase } from '../config/supabase';
import { Employee } from '../types';

export const employeeService = {
  async createEmployee(employee: Omit<Employee, 'id'>) {
    const { data, error } = await supabase
      .from('employees')
      .insert({
        ...employee,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getEmployeesByDepartment(department: string) {
    const { data, error } = await supabase
      .from('employees')
      .select()
      .eq('department', department);

    if (error) throw error;
    return data;
  },

  async getEmployeesByManager(managerId: string) {
    const { data, error } = await supabase
      .from('employees')
      .select()
      .eq('manager_id', managerId);

    if (error) throw error;
    return data;
  },

  async updateEmployee(id: string, updates: Partial<Employee>) {
    const { data, error } = await supabase
      .from('employees')
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