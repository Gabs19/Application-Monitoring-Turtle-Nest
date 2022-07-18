import react,{ useEffect, useState } from "react";
import firebase from "firebase";
import Header from "../../components/Header";
import './monitor.css';
import Modal from "../../components/modal-tartarugometro";


export default function MonitorScreen() {

    const [turtles, setTurtles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState('');

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {

        async function marker() {

            const getTurtle = []
            let turtles = await firebase.firestore().collection('tartarugas').onSnapshot(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    getTurtle.push({
                        ...doc.data(),
                        key: doc.id
                    })
                })
                setTurtles(getTurtle);
                setLoading(false);
            })
        }

        marker();
        
    }, [])

    function info(index){
        setModalOpen(true);
        setId(index);

    }

    return(
        <div>
            <Header/>
            <div className="container">
                <h2>Tartarugômetro</h2>
                <div className="card-container">
                    {
                        turtles.map((item, index) => (
                            
                            
                            <div key={index} className="card">
                                <img src={item.srcNome} alt={item.nome} onClick={() => info(index)} />
                                <h3>{item.nome}</h3>
                                <h5>{item.nomeCientifico}</h5>
                                
                                <input type="text" value={`Número de ovos eclodidos: ${item.eclodidos ? item.eclodidos : 0}`} className="input" style={{color:"white", backgroundColor:"green"}} disabled/>
                                <input type="text" value={`Número de ovos não-eclodidos: ${item.naoEclodidos ? item.naoEclodidos : 0}`} className="input" style={{color:"white", backgroundColor:"red"}} disabled/>
                                <input type="text" value={`Número de Natimortos: ${item.natimortos ? item.natimortos : 0}`} className="input" style={{color:"white", backgroundColor:"orange"}}disabled/>
                                
                            </div>
                        ))
                    }
                </div>

                {modalOpen && <Modal setOpenModal={setModalOpen} id={id}/>}    
            </div>              
        </div>
    )
}