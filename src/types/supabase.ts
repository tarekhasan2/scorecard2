export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          netlify_id: string
          email: string
          full_name: string | null
          roles: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          netlify_id: string
          email: string
          full_name?: string | null
          roles?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          netlify_id?: string
          email?: string
          full_name?: string | null
          roles?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      kpis: {
        Row: {
          id: string
          name: string
          description: string
          target_value: number
          unit: string
          preferred_trend: string
          time_period: string
          status: string
          start_date: string
          end_date: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          target_value: number
          unit: string
          preferred_trend: string
          time_period: string
          status: string
          start_date: string
          end_date?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          target_value?: number
          unit?: string
          preferred_trend?: string
          time_period?: string
          status?: string
          start_date?: string
          end_date?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}