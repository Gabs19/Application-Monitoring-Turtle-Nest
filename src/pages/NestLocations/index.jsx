import React from 'react'
import Header from '../../components/Header'
import './nestLocations.css'


export default function NestLocations() {

    
    const [nomeMarcador, setNomeMarcador] = ('')
    const [latitude, setLatitude] = ('')
    const [longitude, setLongitude] = ('')

    const [especie, setEspecie] = ('')
    const [qtdOvosEclodidos, setQtdOvosEclodidos] =('')
    const [qtdOvosNEclodidos, setQtdOvosNEclodidos] =('')
    const [natimorto, setNatimorto] = ('')
    const [dataEclosão, setDataEclosão] = ('')
    const [localização, setLocalização] = ('')

    return (
        <>
            <Header/>
            <div className="container">
                <div className="container-form">
                    <h2>Cadastrar Ninho</h2>
                    <hr />
                    <form action="">
                        <label>Digite o nome do local</label>
                        <input type="text" className="form-input" placeholder='Digite o nome do local' />
                        
                        <label>Selecione o tipo da especie</label>
                        <select className='form-input'> 
                            <option selected>Escolha uma especie</option>
                        </select>

                        <div className='label-by-qtd'>
                            <div className='format-label'>
                                <label>Quantidade de ovos Eclodidos</label>
                                <input type="number" className="form-input" placeholder='Quantidade de ovos Eclodidos'/>
                            </div>
                            
                            <div className='format-label'>
                                <label>Quantidade de ovos não Eclodidos</label>
                                <input type="number" className="form-input" placeholder='Quantidade de ovos não eclodidos'/>
                            </div>
                            
                            <div className='format-label'>
                                <label>Quantidade de Natimortos</label>
                                <input type="number" className="form-input" placeholder='Quantidade de natimortos'/>
                            </div>
                        </div>

                        <label>Data da Eclosão</label>
                        <input type="datetime-local" className="form-input" placeholder='Data de Eclosão'/>

                        <label>Selecione a localização</label>
                        <select className='form-input'>
                            <option selected>Escolha um local</option>
                            <option>In Situ</option>
                            <option>Translocado</option>
                        </select>

                        <button className='form-button'>Cadastrar Ninho</button>
                    </form>
                </div>
            </div>
        </>
         
    )

}