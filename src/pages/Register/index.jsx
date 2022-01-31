import React, { useState, useContext} from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth'
import './register.css'

export default function Register() {

    
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    
    const { signUp, loadingAuth } = useContext(AuthContext)

    function ValidPassword(e) {
        e.preventDefault();
        
        var tag = document.getElementById('validPassword')
        tag.style.display = 'none'
        
        if (password === repeatPassword) {
            alert('senhas criadas')
            signUp(email,password,name)
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
                <input type="text" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} required/>
                <input type="email" placeholder="seuemail@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <input type="password" placeholder="******" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required/>
                <p id="validPassword">Erro! senhas não são identicas</p>
                <button type="submit">{loadingAuth ? 'Cadastrando . . .' : 'Cadastrar'}</button>
            </form>
           
            <p>Caso já esteja cadastrado.<Link to="/login">Faça o login</Link></p>
           
        </div>
    </div>
    )
}