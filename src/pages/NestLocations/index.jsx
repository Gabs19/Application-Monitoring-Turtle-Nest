/* eslint-disable no-const-assign */
import React, { useState } from 'react'
import Header from '../../components/Header'
import './nestLocations.css'
import NestForm from '../../components/NestForm';
import NonReproduct from '../../components/NonReproduct';

export default function NestLocations() {

    const [option, setOption] = useState('')

    return (
        <>
            <Header />
            <div className="container">
                <div className="container-form">

                    <h2>{option === 'nReprodutivos' ? 'Cadastro Não Reprodutivo' : 'Cadastrar Ninhos' }</h2>
                    <hr />

                    <div className='options'>
                        <div className='radio-label'>
                            <input type="radio" id='ninhos' name="ninhos" value='ninhos' onChange={(e) => setOption(e.target.value)} style={{ marginRight: '10px' }} defaultChecked/>
                            <label style={{ marginRight: '10px' }}>Ninhos de Tartarugas</label>
                        </div>

                        <div className='radio-label'>
                            <input type="radio" name='ninhos' value='nReprodutivos' onChange={(e) => setOption(e.target.value)} style={{ marginRight: '10px' }} />
                            <label >Não Reprodutivos</label>
                        </div>
                    </div>
                   {option === 'nReprodutivos' ? <NonReproduct/> : <NestForm />}
                </div>
            </div>
        </>

    )

}