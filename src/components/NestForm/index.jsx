import React, { useState } from 'react'
import firebase from 'firebase'
import { toast } from 'react-toastify'


export default function NestLocations() {

    var tartarugas = [
        'Tartaruga-verde (Chelonia mydas)',
        'Tartaruga-cabeçuda (Caretta caretta)',
        'Tartaruga-oliva (Lepidochelys olivacea)',
        'Tartaruga de couro (Dermochelys Coriacea)',
        'Tartaruga-de-pente (Eretmochelys imbricata)'
    ]


    const [nomeMarcador, setNomeMarcador] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    const [especie, setEspecie] = useState('')
    const [qtdOvosEclodidos, setQtdOvosEclodidos] = useState('')
    const [qtdOvosNEclodidos, setQtdOvosNEclodidos] = useState('')
    const [natimorto, setNatimorto] = useState('')
    const [dataEclosao, setDataEclosao] = useState('')
    const [localizacao, setLocalizacao] = useState('')


    async function handleRegisterNest(e) {
        e.preventDefault()

        if (nomeMarcador === '') {
            toast.warning('digite o nome do local')
        }
        else if (especie === '') {
            toast.warning('selecione a especie')
        }
        else if (qtdOvosEclodidos === '') {
            toast.warning('digite a quantidade de ovos eclodidos')
        }
        else if (qtdOvosNEclodidos === '') {
            toast.warning('digite a quantidade de ovos não eclodidos')
        }
        else if (natimorto === '') {
            toast.warning('digite a quantidade de natimortos')
        }
        else if (dataEclosao === '') {
            toast.warning('digite a data de eclosão')
        }
        else if (localizacao === '') {
            toast.warning('selecione o tipo de localização')
        } else {

            await firebase.firestore().collection('ninhos-localizações').add({
                'nomeMarcador': nomeMarcador,
                'latitude': latitude,
                'longitude': longitude,
                'especie': especie,
                'qtdOvosEclodidos': qtdOvosEclodidos,
                'qtdOvosNEclodidos': qtdOvosNEclodidos,
                'natimorto': natimorto,
                'dataEclosão': dataEclosao,
                'localizacao': localizacao
            }).then(() => {

                toast.success('Ninho cadastrado com sucesso!')

                setNomeMarcador('')
                setLatitude('')
                setLongitude('')
                setEspecie('')
                setQtdOvosEclodidos('')
                setQtdOvosNEclodidos('')
                setNatimorto('')
                setDataEclosao('')
                setLocalizacao('')
            }).catch((e) => {
                console.log('========')
                console.log(e)
            })
        }
    }

    return (
        <>

            <form onSubmit={handleRegisterNest}>
                <label>Digite o nome do local</label>
                <input type="text" className="form-input" placeholder='Digite o nome do local' value={nomeMarcador} onChange={(e) => setNomeMarcador(e.target.value)} />

                <label>Selecione o tipo da especie</label>
                <select className='form-input' onChange={(e) => setEspecie(e.target.value)}>
                    <option selected>Escolha uma especie</option>
                    {tartarugas.map((item) => {
                        return (
                            <option>{item}</option>
                        );
                    })}
                </select>

                <div className='label-by-qtd'>
                    <div className='format-label'>
                        <label>Quantidade de ovos Eclodidos</label>
                        <input type="number" className="form-input number" placeholder='Quantidade de ovos Eclodidos' value={qtdOvosEclodidos} onChange={(e) => setQtdOvosEclodidos(e.target.value)} />
                    </div>

                    <div className='format-label'>
                        <label className="info-label">Quantidade de ovos não Eclodidos</label>
                        <input type="number" className="form-input number" placeholder='Quantidade de ovos não eclodidos' value={qtdOvosNEclodidos} onChange={(e) => setQtdOvosNEclodidos(e.target.value)} />
                    </div>

                    <div className='format-label'>
                        <label className="info-label">Quantidade de Natimortos</label>
                        <input type="number" className="form-input number" placeholder='Quantidade de natimortos' value={natimorto} onChange={(e) => setNatimorto(e.target.value)} />
                    </div>
                </div>

                <label className="info-label">Data da Eclosão</label>
                <input type="datetime-local" className="form-input" placeholder='Data de Eclosão' value={dataEclosao} onChange={(e) => setDataEclosao(e.target.value)} />

                <label>Selecione a localização</label>
                <select className='form-input' onChange={(e) => setLocalizacao(e.target.value)}>
                    <option selected>Escolha um local</option>
                    <option>In Situ</option>
                    <option>Translocado</option>
                </select>

                <button className='form-button' type='submit'>Salvar</button>
            </form>
        </>

    )

}