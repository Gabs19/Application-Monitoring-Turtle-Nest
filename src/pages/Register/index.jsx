import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './register.css'

export default function Register() {

    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');


    function ValidPassword(e) {
        e.preventDefault();

        var tag = document.getElementById('validPassword')
        tag.style.display = 'none'

        if (password === repeatPassword) {
            alert('senhas criadas')
        } else {
            tag.style.display = 'block'
            setPassword('')
            setRepeatPassword('')
        }
    }
    
    
    return (

        <div className="container-center">
        <div className="signup">
            <div className="signup-area">
                <h1>Cadastre-se</h1>
            </div>
            <form onSubmit={ValidPassword}>
                <input type="text" placeholder="Digite seu nome"/>
                <input type="email" placeholder="seuemail@gmail.com" />
                <input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="******" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
                <p id="validPassword">Erro! senhas não são identicas</p>
                <button type="submit">Cadastrar</button>
            </form>
           
            <p>Caso já esteja cadastrado.<Link to="/">Faça o login</Link></p>
           
        </div>
    </div>
    )
}