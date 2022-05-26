import react, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import {GiTurtle} from 'react-icons/gi'
import './header.css'
import { AuthContext } from '../../context/auth'

export default function Header() {

    const { user, signOut } = useContext(AuthContext);

    const loggedMenuItems = [
        {
            title: 'Cadastrar Ninhos',
            url: '/ninhos',
            cName: 'nav-links',
        },
        {
            title: 'Tartarugômetro',
            url: '#',
            cName: 'nav-links',
        },
        {
            title: 'Sobre',
            url: '#',
            cName: 'nav-links',
        },
    ]

    const onloggedMenuitems = [      
        {
            title: 'Tartarugômetro',
            url: '#',
            cName: 'nav-links',
        },
        {
            title: 'Sobre',
            url: '#',
            cName: 'nav-links',
        },
        {
            title: 'Entrar',
            url : '/login',
            cName : 'nav-links'
        }
    ]

    const [clicked, setClicked] = useState(false)

    function handleclick(){
        console.log(clicked)
        setClicked(!clicked) 
    }


    let visibibleButton = user !== null ? 'block' : 'none'

    return (
        <nav className="nav">
            <Link className='navbar-logo' to='/'>
                <div style={{display:'flex', alignItems:'center', alignContent:'space-between'}}>
                    <GiTurtle size={40} />     
                    <h4>Tartarugas</h4>
                </div>
            </Link>
            <div className="menu-icon" onClick={handleclick}>
              {clicked ? <FaTimes className='nav-icon'/> : <FaBars className='nav-icon'/> } 
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {user !== null && user !== '' ?
                    loggedMenuItems.map((item, index) => {
                        return (
                            <li key={index}><Link className={item.cName} to={item.url}>{item.title}</Link></li>
                            )
                        })
                        :
                    onloggedMenuitems.map((item, index) => {
                        return (
                            <li key={index}><Link className={item.cName} to={item.url}>{item.title}</Link></li>
                            )
                        })
                }
                <li onClick={() => signOut()} style={{display: visibibleButton}}><a className='nav-links'>Sair</a></li> 
            </ul>
        </nav>
    )
}
