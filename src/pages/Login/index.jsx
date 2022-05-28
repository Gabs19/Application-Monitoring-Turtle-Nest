import { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/auth';
import RouteWrapper from '../../routes/Route';
import './login.css'

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContext);


    function handleSubmit(e) {
        e.preventDefault();
        signIn(email,password);

        <Redirect to='/home'/>
    } 

    return (
        <div className="container-center">
            <div className="login">           
                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type="text" placeholder="email@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <button type="submit">{loadingAuth ? 'Carregando . . .' : 'Acessar'}</button>
                </form>
            </div>
        </div>
    )

}