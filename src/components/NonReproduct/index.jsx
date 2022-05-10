import React, { useState } from 'react'
import firebase from 'firebase'
import { toast } from 'react-toastify'
import useGeoLocation from '../../hooks/useGeoLocation';


export default function NonReproduct() {

    var tartarugas = [
        'Tartaruga-verde (Chelonia mydas)',
        'Tartaruga-cabeçuda (Caretta caretta)',
        'Tartaruga-oliva (Lepidochelys olivacea)',
        'Tartaruga de couro (Dermochelys Coriacea)',
        'Tartaruga-de-pente (Eretmochelys imbricata)'
    ]

    const location = useGeoLocation();

    const [nomeMarcador, setNomeMarcador] = useState('')
    const [marcasVisiveis, setMarcasVisiveis] = useState('')
    const [causaProvavel, setCausaProvavel] = useState('')
    const [especie, setEspecie] = useState('')
    const [data, setData] = useState('')


    async function handleRegisterNest(e) {
        e.preventDefault()

        if (nomeMarcador === '') {
            toast.warning('digite o nome do local')
        }
        else if (especie === '') {
            toast.warning('selecione a especie')
        } else if (causaProvavel === '') {
            toast.warning('escreva as possiveis causas da morte')
        } else if (marcasVisiveis === '') {
            toast.warning('escreva sobre as marcas visivies')
        }
        else {

            await firebase.firestore().collection('ninhos-localizações').add({
                'nomeMarcador': nomeMarcador,
                'latitude': location.coordinates.lat,
                'longitude': location.coordinates.lng,
                'especie': especie,
                'data' : data,
                'marcasVisiveis' : marcasVisiveis,
                'provavelCausa' : causaProvavel,
                'tipo' : 'não-reprodutivo'

            }).then(() => {

                toast.success('Informações cadastrada com sucesso!')

                setNomeMarcador('')
                setEspecie('')
                setCausaProvavel('')
                setMarcasVisiveis('')
                setData('')
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

                <label>Marcas Visiveis</label>
                <textarea className='form-input' cols="100" rows="100" value={marcasVisiveis} onChange={(e) => setMarcasVisiveis(e.target.value)}></textarea>

                <label>Causas Provaveis</label>
                <textarea className='form-input' cols="100" rows="100" value={causaProvavel} onChange={(e) => setCausaProvavel(e.target.value)} ></textarea>

                <label className="info-label">Selecione a data</label>
                <input type="datetime-local" className="form-input" placeholder='Data de Eclosão' value={data} onChange={(e) => setData(e.target.value)} />

                <label>Selecione o tipo da especie</label>
                <select className='form-input' onChange={(e) => setEspecie(e.target.value)}>
                    <option selected>Escolha uma especie</option>
                    {tartarugas.map((item) => {
                        return (
                            <option>{item}</option>
                        );
                    })}
                </select>

                <button className='form-button' type='submit'>Salvar</button>
            </form>
        </>

    )

}