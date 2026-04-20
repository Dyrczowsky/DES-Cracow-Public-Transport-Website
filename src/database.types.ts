export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      bus_delays: {
        Row: {
          arrival_time: string | null
          collected_at: string
          delay_seconds: number
          delta_time: number
          feed_timestamp: string
          id: number
          prev_station_id: string | null
          route_id: string
          station_id: string | null
          stop_id: string
          stop_sequence: number | null
          trip_id: string
          vehicle_id: string | null
          vehicle_type: string
        }
        Insert: {
          arrival_time?: string | null
          collected_at?: string
          delay_seconds: number
          delta_time?: number
          feed_timestamp: string
          id?: never
          prev_station_id?: string | null
          route_id: string
          station_id?: string | null
          stop_id: string
          stop_sequence?: number | null
          trip_id: string
          vehicle_id?: string | null
          vehicle_type: string
        }
        Update: {
          arrival_time?: string | null
          collected_at?: string
          delay_seconds?: number
          delta_time?: number
          feed_timestamp?: string
          id?: never
          prev_station_id?: string | null
          route_id?: string
          station_id?: string | null
          stop_id?: string
          stop_sequence?: number | null
          trip_id?: string
          vehicle_id?: string | null
          vehicle_type?: string
        }
        Relationships: []
      }
      config: {
        Row: {
          key: string
          value: number
        }
        Insert: {
          key: string
          value: number
        }
        Update: {
          key?: string
          value?: number
        }
        Relationships: []
      }
      districts: {
        Row: {
          district_index: number
          district_multipolygon: string | null
          district_name: string | null
        }
        Insert: {
          district_index: number
          district_multipolygon?: string | null
          district_name?: string | null
        }
        Update: {
          district_index?: number
          district_multipolygon?: string | null
          district_name?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          event_type: string | null
          id: number
          passenger_id: string | null
          stop: string | null
          stop_id: string | null
          timestamp: number | null
          trip_id: string | null
          trip_short_name: string | null
          vehicle_id: string | null
        }
        Insert: {
          event_type?: string | null
          id: number
          passenger_id?: string | null
          stop?: string | null
          stop_id?: string | null
          timestamp?: number | null
          trip_id?: string | null
          trip_short_name?: string | null
          vehicle_id?: string | null
        }
        Update: {
          event_type?: string | null
          id?: number
          passenger_id?: string | null
          stop?: string | null
          stop_id?: string | null
          timestamp?: number | null
          trip_id?: string | null
          trip_short_name?: string | null
          vehicle_id?: string | null
        }
        Relationships: []
      }
      grouped_stops: {
        Row: {
          group_id: string
          lat: number | null
          lon: number | null
          name: string | null
        }
        Insert: {
          group_id: string
          lat?: number | null
          lon?: number | null
          name?: string | null
        }
        Update: {
          group_id?: string
          lat?: number | null
          lon?: number | null
          name?: string | null
        }
        Relationships: []
      }
      passengers: {
        Row: {
          final_destination_id: string
          id: string
          name: string
          spawn_destination_id: string
        }
        Insert: {
          final_destination_id: string
          id: string
          name: string
          spawn_destination_id: string
        }
        Update: {
          final_destination_id?: string
          id?: string
          name?: string
          spawn_destination_id?: string
        }
        Relationships: []
      }
      passengers_active: {
        Row: {
          final_destination_id: string | null
          id: number
          id_1: string | null
          name: string | null
          spawn_destination_id: string | null
        }
        Insert: {
          final_destination_id?: string | null
          id: number
          id_1?: string | null
          name?: string | null
          spawn_destination_id?: string | null
        }
        Update: {
          final_destination_id?: string | null
          id?: number
          id_1?: string | null
          name?: string | null
          spawn_destination_id?: string | null
        }
        Relationships: []
      }
      stops: {
        Row: {
          district_index: number | null
          group_id: string | null
          stop_desc: number | null
          stop_id: string
          stop_lat: number | null
          stop_lon: number | null
          stop_name: string | null
          vehicle_type: string | null
        }
        Insert: {
          district_index?: number | null
          group_id?: string | null
          stop_desc?: number | null
          stop_id: string
          stop_lat?: number | null
          stop_lon?: number | null
          stop_name?: string | null
          vehicle_type?: string | null
        }
        Update: {
          district_index?: number | null
          group_id?: string | null
          stop_desc?: number | null
          stop_id?: string
          stop_lat?: number | null
          stop_lon?: number | null
          stop_name?: string | null
          vehicle_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stops_district_index_fkey"
            columns: ["district_index"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["district_index"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_stop_means: {
        Args: never
        Returns: {
          district_names: string[]
          group_ids: string[]
          mean_stop_lat: number
          mean_stop_lon: number
          stop_name: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
