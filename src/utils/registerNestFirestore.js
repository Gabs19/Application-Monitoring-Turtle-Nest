import firebase from 'firebase';
import { toast } from 'react-toastify'

export default async function registerFirestore(nomeMarcador,location,especie,equipe,qtdOvosEclodidos,qtdOvosNEclodidos,natimorto,dataEclosao,localizacao,dataDesova,totalOvos,obs){

        await firebase.firestore().collection('ninhos-localizações').add({
        'id': `${nomeMarcador}_${dataDesova}_reprodutivo`, 
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
        // 'imageName' : imageUpload.name,
        'tipo' : 'reprodutivo'
    }).then(() => {
        toast.success('Ninho cadastrado com sucesso!')    
    }).catch((e) => {
        console.log('========')
        console.log(e)
    })

}