import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header";
import '../../components/css-form/nestLocations.css'
import firebase from "firebase";
import { toast } from 'react-toastify'
import { useParams } from "react-router-dom";
import { AuthContext } from '../../context/auth'

export default function Details() {


    const { user } = useContext(AuthContext);

    var tartarugas = [
        'Tartaruga-verde (Chelonia mydas)',
        'Tartaruga-cabeçuda (Caretta caretta)',
        'Tartaruga-oliva (Lepidochelys olivacea)',
        'Tartaruga de couro (Dermochelys Coriacea)',
        'Tartaruga-de-pente (Eretmochelys imbricata)'
    ]

    const { id } = useParams();

    const [nomeMarcador, setNomeMarcador] = useState('')
    const [especie, setEspecie] = useState('')
    const [qtdOvosEclodidos, setQtdOvosEclodidos] = useState('')
    const [qtdOvosNEclodidos, setQtdOvosNEclodidos] = useState('')
    const [natimorto, setNatimorto] = useState('')
    const [dataEclosao, setDataEclosao] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [dataDesova, setDesova] = useState('')
    const [obs, setObs] = useState('')
    const [equipe, setEquipe] = useState('')

    const [totalOvos, setTotalOvos] = useState(0)

    useEffect(() => {


        async function handleProduct() {
            let markers = await firebase.firestore().collection('ninhos-localizações').doc(id)
                .onSnapshot(documentSnapshot => {
                    // setNest(documentSnapshot.data())
                    setNomeMarcador(documentSnapshot.data().nomeMarcador)
                    setDesova(documentSnapshot.data().desova)
                    setEspecie(documentSnapshot.data().especie)
                    setQtdOvosEclodidos(documentSnapshot.data().qtdOvosEclodidos)
                    setQtdOvosNEclodidos(documentSnapshot.data().qtdOvosNEclodidos)
                    setNatimorto(documentSnapshot.data().natimorto)
                    setDataEclosao(documentSnapshot.data().dataEclosão)
                    setLocalizacao(documentSnapshot.data().localizacao)
                    setObs(documentSnapshot.data().obs)
                    setEquipe(documentSnapshot.data().equipe)
                    setTotalOvos(documentSnapshot.data().TotalOvos)
                    console.log('User data: ', documentSnapshot.data());
                });

        }

        handleProduct()
    }, [id])

    function somaOvos() {
        var qtdnatimorto = natimorto === '' ? 0 : parseInt(natimorto)
        var qtdeclodidos = qtdOvosEclodidos === '' ? 0 : parseInt(qtdOvosEclodidos)
        var qtdnEclodidos = qtdOvosNEclodidos === '' ? 0 : parseInt(qtdOvosNEclodidos)

        setTotalOvos(qtdnatimorto + qtdeclodidos + qtdnEclodidos)
    }

    async function handleUpdate(e) {

        e.preventDefault()

        await firebase.firestore().collection('ninhos-localizações').doc(id).update({
            'nomeMarcador': nomeMarcador,
            'especie': especie,
            'equipe': equipe,
            'qtdOvosEclodidos': qtdOvosEclodidos,
            'qtdOvosNEclodidos': qtdOvosNEclodidos,
            'natimorto': natimorto,
            'dataEclosão': dataEclosao,
            'localizacao': localizacao,
            'desova': dataDesova,
            'TotalOvos': totalOvos,
            'obs': obs,

        }).then(() => {
            toast.success('Informações atualizadas com sucesso!')
        }).error(()=>{
            toast.error('erro ao atualizar!')        
        })
    }

    const disabled = user !== null ? false : true

    return (
        <div>
            <Header />
            <div className="container">
                <div className="container-form">
                    <form onSubmit={handleUpdate}>
                        <label>Digite o nome do local</label>
                        <input type="text" className="form-input" placeholder='Digite o nome do local' value={nomeMarcador} onChange={(e) => setNomeMarcador(e.target.value)} disabled={disabled} />

                        <label className="info-label">Data da Desova</label>
                        <input type="datetime-local" className="form-input" placeholder='Data de Desova' value={dataDesova} onChange={(e) => setDesova(e.target.value)} disabled={disabled} />

                        <label>Selecione o tipo da especie</label>
                        <select className='form-input' onChange={(e) => setEspecie(e.target.value)} disabled={disabled}>
                            <option selected>{especie !== '' ? especie : 'Escolha uma especie'}</option>
                            {tartarugas.map((item) => {
                                return (
                                    <option>{item}</option>
                                );
                            })}
                        </select>

                        <label className="info-label">Equipe</label>
                        <input type="text" className="form-input" placeholder='Digite o nome do local' value={equipe} onChange={(e) => setEquipe(e.target.value)} disabled={disabled} />

                        <br /> <hr /> <br />

                        <label className="info-label">Data da Eclosão</label>
                        <input type="datetime-local" className="form-input" placeholder='Data de Eclosão' value={dataEclosao} onChange={(e) => setDataEclosao(e.target.value)} disabled={disabled} />

                        <label>Selecione a localização</label>
                        <select className='form-input' onChange={(e) => setLocalizacao(e.target.value)} disabled={disabled}>
                            <option selected>{localizacao !== '' ? localizacao : 'Escolha um local'}</option>
                            <option>In Situ</option>
                            <option>Translocado</option>
                        </select>

                        <div className='label-by-qtd'>
                            <div className='format-label'>
                                <label>Quantidade de ovos Eclodidos</label>
                                <input type="number" className="form-input number" placeholder='Quantidade de ovos Eclodidos' value={qtdOvosEclodidos} onChange={(e) => setQtdOvosEclodidos(e.target.value)} onBlur={somaOvos} disabled={disabled} />
                            </div>

                            <div className='format-label'>
                                <label className="info-label">Quantidade de ovos não Eclodidos</label>
                                <input type="number" className="form-input number" placeholder='Quantidade de ovos não eclodidos' value={qtdOvosNEclodidos} onChange={(e) => setQtdOvosNEclodidos(e.target.value)} onBlur={somaOvos} disabled={disabled} />
                            </div>

                            <div className='format-label'>
                                <label className="info-label">Quantidade de Natimortos</label>
                                <input type="number" className="form-input number" placeholder='Quantidade de natimortos' value={natimorto} onChange={(e) => setNatimorto(e.target.value)} onBlur={somaOvos} disabled={disabled} />
                            </div>

                            <div className='format-label'>
                                <label htmlFor="info-label">Total de ovos</label>
                                <input type="number" className="form-input number" value={totalOvos} disabled />
                            </div>
                        </div>

                        <label>Observações</label>
                        <textarea className='form-input' cols="100" rows="100" value={obs} onChange={(e) => setObs(e.target.value)} disabled={disabled}></textarea>

                        {user == null ? '' : <button className='form-button' type='submit'>Salvar</button>}
                        
                    </form>
                </div>
            </div>
        </div>
    )
}