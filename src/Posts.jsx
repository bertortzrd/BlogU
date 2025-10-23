import { useState, useEffect, useContext } from "react"
import { Navigate } from "react-router-dom"
import ContextoUsuario from "./ContextoUsuario"
import Formulario from "./posts/Formulario"
import Post from "./posts/Post"


function Posts(){
    let {token} = useContext(ContextoUsuario)
    return token == "" ? 
            <Navigate to="/login" /> :
            <>
            <Formulario />
            <section className="publicaciones">
                <Post />
            </section>
            </>
}

export default Posts