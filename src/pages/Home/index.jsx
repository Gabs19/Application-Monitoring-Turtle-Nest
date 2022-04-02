import React, { useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import {GiTurtle} from 'react-icons/gi'
import './home.css'
import Header from '../../components/Header'
import turtle from '../../assets/images/turtle 2.png'

export default function Home() {

    let icon = L.icon({
        iconUrl:  turtle,
        iconSize: [70,120],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41]
    
    })

    const position = [-7.896271748194248, -34.82384916467302]

    const [mapCenter, setMapCenter] = useState([-7.896271748194248, -34.82384916467302])

    return (

        <div>
            <Header/>
            <MapContainer className='map' center={mapCenter} zoom={18}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={icon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>


    )
}
