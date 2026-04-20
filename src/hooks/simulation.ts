import { useEffect, useRef, useState } from 'react'
import { supabase } from '../utils/supabase'
import { first_sync } from '../lib/sync'
import { fetch_events, handle_events } from '../lib/events'
import type { Passenger, Vehicle } from '../types/simulation'
import type {Database} from "../database.types.ts";

export const useSimulation = () => {
    const [stops, setStops] = useState<Database['public']['Tables']['grouped_stops']['Row'][]>([])
    const [time, setTime] = useState<number>(0)
    const [passengersAtStop, setPassengersAtStop] = useState<Map<string, Passenger[]>>(new Map())
    const [vehicles, setVehicles] = useState<Map<string, Vehicle>>(new Map())

    const vehiclesRef = useRef(new Map<string, Vehicle>())
    const passengersRef = useRef(new Map<string, Passenger>())
    const passengersAtStopRef = useRef(new Map<string, Passenger[]>())

    const syncPassengersAtStop = () =>
        setPassengersAtStop(new Map(passengersAtStopRef.current))

    useEffect(() => {
        first_sync( passengersRef.current, passengersAtStopRef.current, vehiclesRef.current).then(({ stops, time }) => {
            setStops(stops)
            setTime(time)
            syncPassengersAtStop()

            setVehicles(new Map(vehiclesRef.current))

        })

        const channel = supabase
            .channel('config-watch')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'config', filter: 'key=eq.window_start' },
                async (payload) => {
                    const newTime = payload.new.value
                    setTime(newTime)
                    const events = await fetch_events(newTime)
                    await handle_events(stops, events, passengersRef.current, passengersAtStopRef.current, vehicles)
                    setVehicles(new Map(vehiclesRef.current))
                    syncPassengersAtStop()
                }
            )
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [])

    return { stops, time, passengersAtStop, vehicles }
}