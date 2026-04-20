import { supabase } from '../utils/supabase'
import type { Database } from '../database.types'
import { handle_events } from './events'
import {type Passenger, type Stop, Vehicle} from '../types/simulation'

type Event = Database['public']['Tables']['events']['Row']

export const sync_events = async (time: number): Promise<Event[]> => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('timestamp', time)
        .order('timestamp', { ascending: true })
        .limit(15000)

    if (error) { console.error(error); return [] }
    return data ?? []
}


export const first_sync = async (
    passengers: Map<string, Passenger>,
    passengersAtStop: Map<string, Passenger[]>,
    vehicles: Map<string, Vehicle>,
): Promise<{ stops: Database['public']['Tables']['grouped_stops']['Row'][], time: number }> => {
    const { data: stops } = await supabase.from('grouped_stops').select('*')
    const { data: config } = await supabase.from('config').select('value').eq('key', 'window_start').single()

    const time = config?.value ?? 0
    const events = await sync_events(time)
    await handle_events(stops || [], events, passengers, passengersAtStop, vehicles)

    return { stops: stops ?? [], time }
}