import React from 'react'
import Header from '../../components/Header'
import './marker.css'


export default function Marker() {

    const [nomeMarcador, setNomeMarcador] = ('')
    const [latitude, setLatitude] = ('')
    const [longitude, setLongitude] = ('')


    return (
        <div>
        <Header/>
        <div className="container-center">
        <div className="signup">
            <div className="signup-area">
                <h1>Cadastrar Ninho</h1>
            </div>
                <form>
                    <input type="text" placeholder="Digite o nome do marcador" value={nomeMarcador} onChange={(e) => setNomeMarcador(e.target.value)} required/>
                    <input type="number" placeholder="digite a latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} required/>
                    <input type="number" placeholder="digite a logintude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required/>
                
                    <button type="submit">Cadastrar Ninho</button>
                </form>  
            </div>
        </div> 
        </div>
         
    )

}