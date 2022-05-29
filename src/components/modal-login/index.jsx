import { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth';
import './login.css'


const Login = ({ closeModal }) => {
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth, user } = useContext(AuthContext);


    function handleSubmit(e) {
        e.preventDefault();
        signIn(email,password);
    } 

    if(user !== null){
        closeModal(false)
    }

    return (
        <div className="container-modal">
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
        </div>
    )
}

export default Login;