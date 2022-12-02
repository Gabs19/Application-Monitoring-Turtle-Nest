import React, { useState } from 'react'
import firebase from 'firebase'
import { toast } from 'react-toastify'
import useGeoLocation from '../../hooks/useGeoLocation'
import registerFirestore from '../../utils/registerNestFirestore';
import registerRealtime from '../../utils/registerNestRealtime';
import updateMonitor from '../../utils/updateMonitor';
import saveDate from '../../utils/dataEclosao';

export default function NestLocations() {

    var tartarugas = [
        'Tartaruga-verde (Chelonia mydas)',
        'Tartaruga-cabeçuda (Caretta caretta)',
        'Tartaruga-oliva (Lepidochelys olivacea)',
        'Tartaruga de couro (Dermochelys Coriacea)',
        'Tartaruga-de-pente (Eretmochelys imbricata)'
    ]

    const location = useGeoLocation();

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

    const [imageUpload, setImageUpload] = useState(null)

    const [eclodidos, setEclodidos] = useState(0)
    const [nEclodidos, setNEclodidos] = useState(0)

    async function uploadImage() {
        if (imageUpload == null || imageUpload === '') return;
        console.log(imageUpload)
        const upload = await firebase.storage().ref(`reprodutivos/${imageUpload.name}`);
        upload.put(imageUpload)

    };

    async function handleRegisterNest(e) {
        
        e.preventDefault()

        if((location.coordinates.lat === null || location.coordinates.lat === '') && (location.coordinates.log === null || location.coordinates.log === '')) {
            toast.warning('Permita que o aplicativo acesse sua localização.')
        }
        else if (nomeMarcador === '') {
            toast.warning('Digite o nome do local')
        }
        else if (equipe === ''){
            toast.warning('Digite os nomes da equipe')
        }
        else if (dataDesova === '') {
            toast.warning('Digite a data da desova')
        }
        else if (especie === '') {
            toast.warning('Selecione a especie')
        } else {
            uploadImage();
            
            try {
                registerFirestore(nomeMarcador,location,especie,equipe,qtdOvosEclodidos,qtdOvosNEclodidos,natimorto,dataEclosao,localizacao,dataDesova,totalOvos,obs);
                registerRealtime(nomeMarcador,location,especie,equipe,qtdOvosEclodidos,qtdOvosNEclodidos,natimorto,dataEclosao,localizacao,dataDesova,totalOvos,obs);
            }catch (e) {
                console.log('========')
                console.log(e)
            } finally {
                
                saveDate(dataDesova);
                updateMonitor(eclodidos , qtdOvosEclodidos, nEclodidos, qtdOvosNEclodidos,especie);

                setNomeMarcador('')
                setEspecie('')
                setQtdOvosEclodidos('')
                setQtdOvosNEclodidos('')
                setNatimorto('')
                setDataEclosao('')
                setLocalizacao('')
                setObs('')
                setDesova('')
                setEquipe('')
                setImageUpload('')

            }
        }
    }

    function somaOvos(){
        let qtdnatimorto = natimorto === '' ? 0 : parseInt(natimorto)
        let qtdeclodidos = qtdOvosEclodidos === '' ? 0 : parseInt(qtdOvosEclodidos)
        let qtdnEclodidos = qtdOvosNEclodidos === '' ? 0 : parseInt(qtdOvosNEclodidos)

        setTotalOvos(qtdnatimorto + qtdeclodidos + qtdnEclodidos)
    }

    return (
        <>

            <form onSubmit={handleRegisterNest}>
                <label>Digite o nome do local</label>
                <input type="text" className="form-input" placeholder='Digite o nome do local' value={nomeMarcador} onChange={(e) => setNomeMarcador(e.target.value)} />

                <label className="info-label">Data da Desova</label>
                <input type="datetime-local" className="form-input" placeholder='Data de Desova' value={dataDesova} onChange={(e) => setDesova(e.target.value)} />

                <label>Selecione o tipo da especie</label>
                <select className='form-input' onChange={(e) => setEspecie(e.target.value)}>
                    <option selected>Escolha uma especie</option>
                    {tartarugas.map((item) => {
                        return (
                            <option>{item}</option>
                        );
                    })}
                </select>
                
                <label className="info-label">Equipe</label>
                <input type="text" className="form-input" placeholder='Digite o nome do local' value={equipe} onChange={(e) => setEquipe(e.target.value)} />

                <br /> <hr /> <br />

                <label className="info-label">Data da Eclosão</label>
                <input type="datetime-local" className="form-input" placeholder='Data de Eclosão' value={dataEclosao} onChange={(e) => setDataEclosao(e.target.value)} />

                <label>Selecione a localização</label>
                <select className='form-input' onChange={(e) => setLocalizacao(e.target.value)}>
                    <option selected>Escolha um local</option>
                    <option>In Situ</option>
                    <option>Translocado</option>
                </select>

                <div className='label-by-qtd'>
                    <div className='format-label'>
                        <label>Quantidade de ovos Eclodidos</label>
                        <input type="number" className="form-input number" placeholder='Quantidade de ovos Eclodidos' value={qtdOvosEclodidos} onChange={(e) => setQtdOvosEclodidos(e.target.value)} onBlur={somaOvos} />
                    </div>

                    <div className='format-label'>
                        <label className="info-label">Quantidade de ovos não Eclodidos</label>
                        <input type="number" className="form-input number" placeholder='Quantidade de ovos não eclodidos' value={qtdOvosNEclodidos} onChange={(e) => setQtdOvosNEclodidos(e.target.value)} onBlur={somaOvos} />
                    </div>

                    <div className='format-label'>
                        <label className="info-label">Quantidade de Natimortos</label>
                        <input type="number" className="form-input number" placeholder='Quantidade de natimortos' value={natimorto} onChange={(e) => setNatimorto(e.target.value)} onBlur={somaOvos} />
                    </div>

                    <div className='format-label'>
                        <label htmlFor="info-label">Total de ovos</label>
                        <input type="number" className="form-input number" value={totalOvos} disabled />
                    </div>
                </div>

                <label>Observações</label>
                <textarea className='form-input' cols="100" rows="100" value={obs} onChange={(e) => setObs(e.target.value)}></textarea>

                <label>Imagem</label>
                <input className='form-input' type='file' onChange={(e) => {setImageUpload(e.target.files[0])}} />

                <button className='form-button' type='submit'>Salvar</button>
            </form>
        </>

    )

}