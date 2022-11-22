import React, { useState } from 'react'
import firebase from 'firebase'
import { toast } from 'react-toastify'
import useGeoLocation from '../../hooks/useGeoLocation';
import registerfirestore from '../../utils/registerNonNestFirestore';
import registerRealtime from '../../utils/registerNonNestRealtime';


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
    const [ocorrencia, setOcorrencia] = useState('')
    const [obs, setObs] = useState('')
    const [comprimentoCasco, setComprimentoCasco] = useState('')
    const [larguraCasco, setLarguraCasco] = useState('')

    const [imageUpload, setImageUpload] = useState(null)

    async function uploadImage() {
        if (imageUpload == null || imageUpload === '') return;
        console.log(imageUpload)
        const upload = await firebase.storage().ref(`reprodutivos/${imageUpload.name}`);
        upload.put(imageUpload)
    };

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

            try {
                registerfirestore(nomeMarcador,location,especie,data,marcasVisiveis,causaProvavel,ocorrencia,obs,comprimentoCasco,larguraCasco);
                registerRealtime(nomeMarcador,location,especie,data,marcasVisiveis,causaProvavel,ocorrencia,obs,comprimentoCasco,larguraCasco);
            } catch(e) {
                console.log(e);
            } finally {
                setNomeMarcador('')
                setEspecie('')
                setCausaProvavel('')
                setMarcasVisiveis('')
                setData('')
                setOcorrencia('')
                setObs('')
                setComprimentoCasco('')
                setLarguraCasco('')
                setImageUpload('')
            }
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

                <label className="info-label">Ocorrencias</label>
                <select className='form-input' onChange={(e) => setOcorrencia(e.target.value)}>
                    <option selected>Escolha uma ocorrencia</option>
                    <option value="Encalhe">Encalhe</option>
                    <option value="morte">Morte</option>
                </select>   
                
                <label className="info-label">Selecione a data</label>
                <input type="datetime-local" className="form-input" placeholder='Data de Eclosão' value={data} onChange={(e) => setData(e.target.value)} />

                <br /> <hr /> <br />

                <label>Marcas Visiveis</label>
                <textarea className='form-input' cols="100" rows="100" value={marcasVisiveis} onChange={(e) => setMarcasVisiveis(e.target.value)}></textarea>

                <label>Causas Provaveis</label>
                <textarea className='form-input' cols="100" rows="100" value={causaProvavel} onChange={(e) => setCausaProvavel(e.target.value)} ></textarea>
                
                <div className='label-by-qtd'>
                    <div className='format-label-non'>
                        <label className="info-label">Comprimento do Casco</label>
                        <input type="number" className="form-input number" placeholder='Comprimento do casco' value={comprimentoCasco} onChange={(e) => setComprimentoCasco(e.target.value)}  />
                    </div>

                    <div className='format-label-non'>
                        <label className="info-label">Largura do Casco</label>
                        <input type="number" className="form-input number" placeholder='Largura do casco' value={larguraCasco} onChange={(e) => setLarguraCasco(e.target.value)} />
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