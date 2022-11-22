import firebase from "firebase";


export default async function updateMonitor(eclodidos , qtdOvosEclodidos, nEclodidos, qtdOvosNEclodidos,especie){

    let qtdeclodidos = parseInt(eclodidos) + parseInt(qtdOvosEclodidos)
    let qtdNeclodidos = parseInt(nEclodidos) + parseInt(qtdOvosNEclodidos)


    await firebase.firestore().collection('tartarugas').doc(especie.split(' ')[0]).update({
        'eclodidos': qtdeclodidos,
        'naoEclodidos' : qtdNeclodidos,
    });
}