import React, { useState } from 'react'
import firebase from 'firebase'
import { toast } from 'react-toastify'
import useGeoLocation from '../../hooks/useGeoLocation'

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
            toast.warning('digite o nome do local')
        }
        else if (equipe === ''){
            toast.warning('digite os nomes da equipe')
        }
        else if (dataDesova === '') {
            toast.warning('digite a data da desova')
        }
        else if (especie === '') {
            toast.warning('selecione a especie')
        } else {
            uploadImage();
            
            await firebase.firestore().collection('ninhos-localizações').add({
                'nomeMarcador': nomeMarcador,
                'latitude': location.coordinates.lat,
                'longitude': location.coordinates.lng,
                'especie': especie,
                'equipe': equipe,
                'qtdOvosEclodidos': qtdOvosEclodidos,
                'qtdOvosNEclodidos': qtdOvosNEclodidos,
                'natimorto': natimorto,
                'dataEclosão': dataEclosao,
                'localizacao': localizacao,
                'desova' : dataDesova,
                'TotalOvos' : totalOvos,
                'obs' : obs,
                'imageName' : imageUpload.name,
                'tipo' : 'reprodutivo'
            }).then(() => {

                toast.success('Ninho cadastrado com sucesso!')
                updateMonitor()

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
                
            }).catch((e) => {
                console.log('========')
                console.log(e)
            })
        }
    }

    const [eclodidos, setEclodidos] = useState(0)
    const [nEclodidos, setNEclodidos] = useState(0)

    async function updateMonitor(){

        let qtdeclodidos = parseInt(eclodidos) + parseInt(qtdOvosEclodidos)
        let qtdNeclodidos = parseInt(nEclodidos) + parseInt(qtdOvosNEclodidos)

        await firebase.firestore().collection('tartarugas').doc(especie.split(' ')[0]).update({
            'eclodidos': qtdeclodidos,
            'naoEclodidos' : qtdNeclodidos,
        });
    }

    function somaOvos()  {
        var qtdnatimorto = natimorto === '' ? 0 : parseInt(natimorto)
        var qtdeclodidos = qtdOvosEclodidos === '' ? 0 : parseInt(qtdOvosEclodidos)
        var qtdnEclodidos = qtdOvosNEclodidos === '' ? 0 : parseInt(qtdOvosNEclodidos)

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