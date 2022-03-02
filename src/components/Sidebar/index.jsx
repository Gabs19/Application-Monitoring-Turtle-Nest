import React from "react"
import { Link } from "react-router-dom"
import { FaTimes } from "react-icons/fa"
import './sidebar.css'

export default function Sidebar() {
    return(
        <aside className="sidebarContainer">
            <div className="icon">
                <div className="closeBtn"> <FaTimes/> </div>
            </div>
            <div className="sidebarWrapper">
                <div className="sidebar-menu">
                    <Link className="sidebarlink"></Link>
                    <Link className="sidebarlink"></Link>
                    <Link className="sidebarlink"></Link>
                </div>
            </div>
        </aside>
    )
}