import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import firebase from "firebase";
import { useParams } from "react-router-dom";

export default function Details() {


    const [nest, setNest] = useState([])

    const { id } = useParams();
   
    useEffect(() => {

        async function handleProduct() {
            let markers = await firebase.firestore().collection('ninhos-localizações').doc(id)
                .onSnapshot(documentSnapshot => {
                    setNest(documentSnapshot.data())
                    console.log('User data: ', documentSnapshot.data());
                });
                
        }
        handleProduct()

    }, [])

    console.log(nest.especie)

    return (
        <div>
            <Header />
            pegou!!!
        </div>
    )
}