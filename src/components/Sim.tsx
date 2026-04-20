import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useSimulation } from '../hooks/simulation'

const Sim = () => {
    const { stops, time, passengersAtStop, vehicles } = useSimulation()

    return (
        <>
            <h5>Aktualny czas symulacji {Math.floor(time / 3600)}:{String(Math.floor((time % 3600) / 60)).padStart(2, '0')}</h5>
                {JSON.stringify([...vehicles.values()])}
            <MapContainer center={[50.049683, 19.944544]} zoom={13} scrollWheelZoom={true} style={{ height: "100vh" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/*{stops?.map(stop => {*/}
                {/*    const waiting = passengersAtStop.get(stop.group_id) ?? []*/}
                {/*    return (*/}
                {/*        <Marker key={stop.group_id} position={[stop.lat, stop.lon]}>*/}
                {/*            <Popup>*/}
                {/*                <h3>Przystanek {stop.name}</h3>*/}
                {/*                <p>Czekający: {waiting.length}</p>*/}
                {/*                {waiting.length > 0 && (*/}
                {/*                    <ul style={{ maxHeight: '150px', overflowY: 'auto', padding: '0 0 0 16px', margin: 0 }}>*/}
                {/*                        {waiting.map(p => <li key={p.id}>{p.name}</li>)}*/}
                {/*                    </ul>*/}
                {/*                )}*/}
                {/*            </Popup>*/}
                {/*        </Marker>*/}
                {/*    )*/}
                {/*})}*/}
                {[...vehicles.values()].map(vehicle => (
                    <Marker
                        key={vehicle.vehicle_id}
                        position={[vehicle.lat, vehicle.lon]}

                    >
                        <Popup>
                            <h3>Linia {vehicle.route_short_name}</h3>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </>
    )
}

export default Sim