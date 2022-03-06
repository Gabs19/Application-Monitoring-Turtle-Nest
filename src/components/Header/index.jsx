import react, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import './header.css'


export default function Header() {

    const MenuItems = [
        {
            title: 'Cadastrar localização',
            url: '#',
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
            <h1 className="navbar-logo">
                Turtle
            </h1>
            <div className="menu-icon" onClick={handleclick}>
              {clicked ? <FaTimes className='nav-icon'/> : <FaBars className='nav-icon'/> } 
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}><Link className={item.cName} to="">{item.title}</Link></li>
                    )
                })}
            </ul>
        </nav>
    )
}