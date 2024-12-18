import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { kpiDB } from '../services/database/kpi.db';
import { KPI } from '../types';

export const useKPIManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const createKPI = async (kpi: Omit<KPI, 'id'>) => {
    if (!user) throw new Error('User not authenticated');
    setLoading(true);
    setError(null);

    try {
      const result = await kpiDB.createKPI(kpi, user.id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create KPI');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserKPIs = async () => {
    if (!user) throw new Error('User not authenticated');
    setLoading(true);
    setError(null);

    try {
      const kpis = await kpiDB.getKPIsByUser(user.id);
      return kpis;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch KPIs');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateKPI = async (id: string, updates: Partial<KPI>) => {
    if (!user) throw new Error('User not authenticated');
    setLoading(true);
    setError(null);

    try {
      const result = await kpiDB.updateKPI(id, updates, user.id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update KPI');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteKPI = async (id: string) => {
    if (!user) throw new Error('User not authenticated');
    setLoading(true);
    setError(null);

    try {
      await kpiDB.deleteKPI(id, user.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete KPI');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createKPI,
    getUserKPIs,
    updateKPI,
    deleteKPI,
  };
};