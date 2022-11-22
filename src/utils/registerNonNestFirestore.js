import firebase from "firebase";
import { toast } from "react-toastify";

export default async function registerfirestore(nomeMarcador,location,especie,data,marcasVisiveis,causaProvavel,ocorrencia,obs,comprimentoCasco,larguraCasco){

    await firebase.firestore().collection('ninhos-localizações').add({
        'id': `${nomeMarcador}_${data}_non_reprodutivo`, 
        'nomeMarcador': nomeMarcador,
        'latitude': location.coordinates.lat,
        'longitude': location.coordinates.lng,
        'especie': especie,
        'data' : new Date(data),
        'marcasVisiveis' : marcasVisiveis,
        'provavelCausa' : causaProvavel,
        'tipo' : 'não-reprodutivo',
        'ocorrencia' : ocorrencia,
        'obs' : obs,
        'comprimentoCasco' : comprimentoCasco,
        'larguraCasco' : larguraCasco

    }).then(() => {
        toast.success('Informações cadastrada com sucesso!')
    }).catch((e) => {
        console.log('========')
        console.log(e)
    })


}