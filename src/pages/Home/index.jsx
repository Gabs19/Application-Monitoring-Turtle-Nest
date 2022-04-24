import React, { useState, useEffect } from 'react'
import L from 'leaflet'
import firebase from 'firebase'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { GiTurtle } from 'react-icons/gi'
import './home.css'
import Header from '../../components/Header'
import turtle from '../../assets/images/turtle 2.png'

export default function Home() {

    let icon = L.icon({
        iconUrl: turtle,
        iconSize: [70, 120],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41]

    })

    const [loading, setLoading] = useState(true)
    const [position, setPosition] = useState([])


    useEffect(() => {
        const getMarkersFromFirebase = []
        const marker = firebase.firestore().collection('ninhos-localizações').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                getMarkersFromFirebase.push({
                    ...doc.data(),
                    key: doc.id
                })
                setPosition(getMarkersFromFirebase)
                setLoading(false)
            })
        })


        return () => marker()
    }, [])

    const [mapCenter, setMapCenter] = useState([-7.896271748194248, -34.82384916467302])

    return (

        <div>
            <Header />
            <MapContainer className='map' center={mapCenter} zoom={18}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {position.map((item, key) => {
                    var dateFormatted = new Date(item.dataEclosão)
                    return (
                        <Marker key={key} position={[item.latitude, item.longitude]} icon={icon}>
                            <Popup>
                               <h3>{item.nomeMarcador}</h3>
                               <hr />
                               <h4>{item.especie}</h4>
                               <h4>{dateFormatted.toLocaleString("pt-BR")}</h4>
                            </Popup>
                        </Marker>
                    )
                })
                }
            </MapContainer>
        </div>


    )
}
