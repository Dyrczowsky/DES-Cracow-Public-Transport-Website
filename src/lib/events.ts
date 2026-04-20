import { supabase } from '../utils/supabase'
import type { Database } from '../database.types'
import {Passenger, Vehicle} from '../types/simulation'

type Event = Database['public']['Tables']['events']['Row']

export const fetch_events = async (time: number): Promise<Event[]> => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('timestamp', time)
        .lt('timestamp', time + 500)
        .order('timestamp', { ascending: true })

    if (error) { console.error(error); return [] }
    return data ?? []
}

export const handle_events = async (
    stops: Database['public']['Tables']['grouped_stops']['Row'][],
    events: Event[],
    passengers: Map<string, Passenger>,
    passengersAtStop: Map<string, Passenger[]>,
    vehicles: Map<string, Vehicle>,  // dodane
) => {


    const newIds = [...new Set(
        events
            .filter(e => e.event_type === 'PASSENGER_ARRIVAL' && e.passenger_id)
            .map(e => e.passenger_id as string)
    )]

    if (newIds.length > 0) {
        const { data } = await supabase.from('passengers').select('*').in('id', newIds)
        data?.forEach(p => passengers.set(p.id, new Passenger(p.id, p.name, p.spawn_destination_id, p.final_destination_id)))
    }

    for (const event of events) {
        if (event.event_type === 'PASSENGER_START_WAITING') {
            if (!event.stop || !event.passenger_id) continue
            const psg = passengers.get(event.passenger_id)
            if (!psg) continue
            const arr = passengersAtStop.get(event.stop) ?? []
            arr.push(psg)
            passengersAtStop.set(event.stop, arr)

        } else if (event.event_type === 'PASSENGER_END_WAITING') {
            if (!event.passenger_id) continue
            passengersAtStop.forEach((arr, stopId) =>
                passengersAtStop.set(stopId, arr.filter(p => p.id !== event.passenger_id))
            )
            passengers.delete(event.passenger_id)

        } else if (event.event_type === 'VEHICLE_START') {
            if (!event.vehicle_id || !event.trip_short_name) continue
            vehicles.set(event.vehicle_id, new Vehicle(event.vehicle_id, event.trip_short_name, ''))

        } else if (event.event_type === 'VEHICLE_START_DEPARTURE') {
            if (!event.vehicle_id || !event.stop_id) continue
            const vehicle = vehicles.get(event.vehicle_id)
            console.log(event.stop_id)
            const stop = stops.find(s => s.group_id === event.stop_id)
            console.log(stops)
            if (!stop) continue

            if (!vehicle) continue
            //@ts-ignore
            vehicle.lat = stop.lat
            vehicle.lon = stop.lon
        }
    }
}