import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header";
import firebase from "firebase";
import '../../components/css-form/nestLocations.css'
import { toast } from 'react-toastify'
import { useParams } from "react-router-dom";
import { AuthContext } from '../../context/auth'

export default function DetailsNonRepro() {

    var tartarugas = [
        'Tartaruga-verde (Chelonia mydas)',
        'Tartaruga-cabeçuda (Caretta caretta)',
        'Tartaruga-oliva (Lepidochelys olivacea)',
        'Tartaruga de couro (Dermochelys Coriacea)',
        'Tartaruga-de-pente (Eretmochelys imbricata)'
    ]

    const { id } = useParams();

    const { user } = useContext(AuthContext);

    const [nomeMarcador, setNomeMarcador] = useState('')
    const [marcasVisiveis, setMarcasVisiveis] = useState('')
    const [causaProvavel, setCausaProvavel] = useState('')
    const [especie, setEspecie] = useState('')
    const [data, setData] = useState('')
    const [ocorrencia, setOcorrencia] = useState('')
    const [obs, setObs] = useState('')
    const [comprimentoCasco, setComprimentoCasco] = useState('')
    const [larguraCasco, setLarguraCasco] = useState('')


    useEffect(() => {

        var date = new Date()

        async function handleProduct() {
            let markers = await firebase.firestore().collection('ninhos-localizações').doc(id)
                .onSnapshot(documentSnapshot => {
                    // setNest(documentSnapshot.data())
                    setNomeMarcador(documentSnapshot.data().nomeMarcador)
                    setEspecie(documentSnapshot.data().especie)
                    setObs(documentSnapshot.data().obs)
                    setCausaProvavel(documentSnapshot.data().provavelCausa)
                    setMarcasVisiveis(documentSnapshot.data().marcasVisiveis)
                    setData(documentSnapshot.data().data)
                    setOcorrencia(documentSnapshot.data().ocorrencia)
                    setObs(documentSnapshot.data().obs)
                    setComprimentoCasco(documentSnapshot.data().comprimentoCasco)
                    setLarguraCasco(documentSnapshot.data().larguraCasco)

                    console.log('User data: ', documentSnapshot.data());
                });

        }

        handleProduct()
    }, [id])

    const disabled = user !== null ? false : true

    async function handleUpdate(e) {

        e.preventDefault()

        await firebase.firestore().collection('ninhos-localizações').doc(id).update({
            'nomeMarcador': nomeMarcador,
            'especie': especie,
            'data' : data,
            'marcasVisiveis' : marcasVisiveis,
            'provavelCausa' : causaProvavel,
            'ocorrencia' : ocorrencia,
            'obs' : obs,
            'comprimentoCasco' : comprimentoCasco,
            'larguraCasco' : larguraCasco
        }).then(() => {
            toast.success('Informações atualizadas com sucesso!')
        })
    }

    return (
        <div>
            <Header />
            <div className="container">
                <div className="container-form">
                    <form onSubmit={handleUpdate} >
                        <label>Digite o nome do local</label>
                        <input type="text" className="form-input" placeholder='Digite o nome do local' value={nomeMarcador} onChange={(e) => setNomeMarcador(e.target.value)}  disabled={disabled} />

                        <label>Selecione o tipo da especie</label>
                        <select className='form-input' onChange={(e) => setEspecie(e.target.value)} disabled={disabled} >
                            <option selected>{especie !== '' ? especie : 'Escolha uma especie'}</option>
                            {tartarugas.map((item) => {
                                return (
                                    <option>{item}</option>
                                );
                            })}
                        </select>

                        <label className="info-label">Ocorrencias</label>
                        <select className='form-input' onChange={(e) => setOcorrencia(e.target.value)} disabled={disabled} >
                            <option selected>{ocorrencia !== '' ? ocorrencia : 'Escolha uma ocorrencia'}</option>
                            <option value="Encalhe">Encalhe</option>
                            <option value="morte">Morte</option>
                        </select>

                        <label className="info-label">Selecione a data</label>
                        <input type="datetime-local" className="form-input" placeholder='Data de Eclosão' value={data} onChange={(e) => setData(e.target.value)} disabled={disabled} />

                        <br /> <hr /> <br />

                        <label>Marcas Visiveis</label>
                        <textarea className='form-input' cols="100" rows="100" value={marcasVisiveis} onChange={(e) => setMarcasVisiveis(e.target.value)} disabled={disabled} ></textarea>

                        <label>Causas Provaveis</label>
                        <textarea className='form-input' cols="100" rows="100" value={causaProvavel} onChange={(e) => setCausaProvavel(e.target.value)} disabled={disabled} ></textarea>

                        <div className='label-by-qtd'>
                            <div className='format-label-non'>
                                <label className="info-label">Comprimento do Casco</label>
                                <input type="number" className="form-input number" placeholder='Comprimento do casco' value={comprimentoCasco} onChange={(e) => setComprimentoCasco(e.target.value)} disabled={disabled}  />
                            </div>

                            <div className='format-label-non'>
                                <label className="info-label">Largura do Casco</label>
                                <input type="number" className="form-input number" placeholder='Largura do casco' value={larguraCasco} onChange={(e) => setLarguraCasco(e.target.value)} disabled={disabled} />
                            </div>
                        </div>

                        <label>Observações</label>
                        <textarea className='form-input' cols="100" rows="100" value={obs} onChange={(e) => setObs(e.target.value)} disabled={disabled} ></textarea>

                        {user == null ? '' : <button className='form-button' type='submit'>Salvar</button>}
                    </form>
                </div>
            </div>
        </div>
    )
}