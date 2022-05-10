import React, { useState, useEffect } from 'react'
import L from 'leaflet'
import firebase from 'firebase'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { GiTurtle } from 'react-icons/gi'
import './home.css'
import Header from '../../components/Header'
import turtle from '../../assets/images/turtle 2.png'
import { Link } from 'react-router-dom'


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
            })
            setPosition(getMarkersFromFirebase)
            setLoading(false)
        })

        return () => marker()
        
        
    }, [])

    const [mapCenter, setMapCenter] = useState([-7.896271748194248, -34.82384916467302])
    console.log(position)

    return (

        <div>
            <Header />
            <div className="container-map">
                <MapContainer className='map' center={mapCenter} zoom={18}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {position.map((item, index) => (
                        <Marker key={index} position={[item.latitude, item.longitude]} icon={icon}>
                            <Popup>
                                <h3>{item.nomeMarcador}</h3>
                                <hr />
                                <h4>{item.especie}</h4>
                                <h4>{new Date(item.dataEclosão).toLocaleString("pt-BR")}</h4>
                                <Link to={`/detalhes-ninho/${item.key}`}>Ver mais</Link>
                            </Popup>
                        </Marker>
                    ))
                    }
                </MapContainer>
            </div>
        </div>


    )
}
