import React from "react"
import './login.css'

export default function Login() {

    return (
        <div className="container-center">
            <div className="login">           
                <form>
                    <h1>Entrar</h1>
                    <input type="text" placeholder="email@gmail.com"/>
                    <input type="text" placeholder="*******"/>
                    <button>Acessar</button>
                </form>

                <a href="#">Cadastre-se</a>
            </div>
        </div>
    )

}