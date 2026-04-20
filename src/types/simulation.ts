export type Stop = {
    group_id: string
    lat: number
    lon: number
    name: string
}

export class Passenger {
    id: string
    name: string
    spawn_destination: string
    final_destination: string
    constructor(
        id: string,
        name: string,
        spawn_destination: string,
        final_destination: string
    ) {
        this.id = id
        this.name = name
        this.spawn_destination = spawn_destination
        this.final_destination = final_destination
    }
}

export class Vehicle {
    passengers: Passenger[] = []
    lat = 0
    lon = 0
    route_short_name: string
    vehicle_id: string
    vehicle_type: string
    constructor(
         vehicle_id: string,
         route_short_name: string,
         vehicle_type: string
    ) {
     this.route_short_name = route_short_name;
     this.vehicle_id = vehicle_id;
     this.vehicle_type = vehicle_type;

    }
}