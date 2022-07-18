import React, { useState, useEffect } from 'react';
import './modal-style.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import Turtles from '../../jsons/tartarugas.json';


function Modal({ setOpenModal, id }) {

    console.log(id)

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="imgback">
                    <img src={Turtles[id].imagem} />
                    <div className="titleCloseBtn">
                        <AiFillCloseCircle size={30} onClick={() => { setOpenModal(false) }} />
                    </div>
                </div>

                <div className="body" key={Turtles[id].id}>
                    <p><strong>Nome científico :</strong> {Turtles[id].NomeCientifico}</p>
                    <p><strong>Nomes comuns : </strong> {Turtles[id].NomesComuns}</p>
                    <p><strong>Status : </strong> {Turtles[id].StatusBrasil}</p>
                    <p><strong>Status Internacional : </strong> {Turtles[id].StatusInternacional}</p>
                    <p><strong>Habitat : </strong> {Turtles[id].Habitat}</p>
                    <p><strong>Tamanho : </strong> {Turtles[id].Tamanho}</p>
                    <p><strong>Peso : </strong> {Turtles[id].Peso}</p>
                </div>

                <div className="footer">
                    <a href={Turtles[id].site} target="_blank">Mais informações</a>
                </div>


            </div>
        </div>
    );
}

export default Modal;