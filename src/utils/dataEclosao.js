import firebase from 'firebase';

export default async function saveDate(dataDesova){

    let dataEclosao = new Date(); 
    let data = new Date(dataDesova)
    dataEclosao.setDate(data.getDate() + 45);

    console.log(dataEclosao)
    await firebase.database().ref('data-eclosao').push().set({
        'data' : String(dataEclosao),
    }).then( () => {console.log('salvo')}).catch((e) => {console.log('não salvo')});

}
