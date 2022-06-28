import { createContext, useState, useEffect, Children } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../services/firebaseConection";

export const AuthContext = createContext();

function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    // mantém o usuario logado
    useEffect(() => {

        function loadStorage() {
            const storageUser = localStorage.getItem('sistemaUser');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();

    }, [])

    //signup user in apliccation
    async function signUp(email,password,name) {
        setLoadingAuth(true)

        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(async (value) => {
            
            var uid = value.user.uid;
 
            await firebase.firestore().collection('users')
            .doc(uid).set({
                nome: name
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: name,
                }

                setUser(data);
                storageUser(data)
                setLoading(false)

            }).catch((error) => {
                alert('erro no firestore' + error)
            })

        })
        .catch((error) => {
            if(error.code === 'auth/weak-password'){
                alert('senha muito fraca');
            } else if(error.code === 'auth/email-already-in-use') {
                alert('email já existe');
            }
            setLoadingAuth(false)
        })
    }

    //login user
    async function signIn(email,password) {
        setLoadingAuth(true)

        await firebase.auth().signInWithEmailAndPassword(email,password)
        .then( async (value) => {
            let uid = value.user.uid;

            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get();

            let data ={
                uid: uid,
            }

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            
        })
        .catch((error) => {
            alert('Ops deu erro ')
            console.log(error)
            setLoadingAuth(false);
        })
    }

    async function signOut(){
        await firebase.auth().signOut();
        localStorage.removeItem('sistemaUser');
        setUser(null);
    }


    function storageUser(data){
        localStorage.setItem('sistemaUser',JSON.stringify(data));
    }


    return(
        <AuthContext.Provider value = {{signed : !!user, user, loading, signUp, signOut, signIn, loadingAuth,setUser, storageUser}} >
            {children}
        </AuthContext.Provider >
    );
}

export default AuthProvider;