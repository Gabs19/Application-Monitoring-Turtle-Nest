import react, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import './header.css'
import { isValidInputTimeValue } from '@testing-library/user-event/dist/utils'


export default function Header() {

    const MenuItems = [
        {
            title: 'Cadastrar localização',
            url: '/marcadores',
            cName: 'nav-links',
        },
        {
            title: 'Cadastrar Tartaruga',
            url: '#',
            cName: 'nav-links',
        },
        {
            title: 'a definir',
            url: '#',
            cName: 'nav-links',
        },
    ]

    const [clicked, setClicked] = useState(false)

    function handleclick(){
        console.log(clicked)
        setClicked(!clicked) 
    }

    return (
        <nav className="nav">
            <Link className='navbar-logo' to='/'>Turtle</Link>
            <div className="menu-icon" onClick={handleclick}>
              {clicked ? <FaTimes className='nav-icon'/> : <FaBars className='nav-icon'/> } 
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}><Link className={item.cName} to={item.url}>{item.title}</Link></li>
                    )
                })}
            </ul>
        </nav>
    )
}
