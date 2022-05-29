import { useEffect, useState } from 'react';

 export default function useGeoLocation() {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {lat: "", lng: ""}
    })

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        })
    }

    const onError = error => {
        setLocation({
            loaded: true,
            error,
        })
    }

    useEffect(() => {
        if( !("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocalização não suportada"
            })
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }, [])

    return location
}