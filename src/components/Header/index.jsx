import react from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import './header.css'


export default function Header() {

    return (
        <div>
            <div className="nav">
                <div className="navlink">
                    <h1>Logo</h1>
                </div>
                <div className="bars"  >
                    <FaBars />
                </div>
                <div className="nav-menu">
                    <Link className="navlink">Cadastrar Marcador</Link>
                    <Link className="navlink">Cadastrar Tartaruga</Link>
                    <Link className="navlink">Cadastrar</Link>
                </div>
                <div className="navBtnLink">Logar</div>
            </div>
        </div>
    )
}