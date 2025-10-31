import { useState, useContext } from "react"
import ContextoUsuario from "../ContextoUsuario"

function Formulario({escribirPost}){

    let {token, usuario} = useContext(ContextoUsuario)
    let [textoInput, setTextoInput] = useState("")

    return <form className="formulario-posts" onSubmit={ evento => {
                        evento.preventDefault()
                        if(textoInput.trim() != ""){
                            fetch("https://api-blog-n9xx.onrender.com/posts/nuevo",{
                                method: "POST",
                                body : JSON.stringify({ texto : textoInput}),
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer " + token,
                                }
                            })
                            .then(res => res.json())
                            .then(({id,error}) => {
                                if(!error){
                                    escribirPost({
                                        texto: textoInput,
                                        _id: id,
                                        autor: usuario,
                                    })
                                    return setTextoInput("")
                                }
                                console.log("gestionar error")
                            })
                        }
                }}>
                <textarea placeholder="Escribe aquí tu texto" className="contenido" value={textoInput} onChange={ evento => setTextoInput(evento.target.value)} />
                <input type="submit" value="publicar" className="publicar" />
            </form>
}

export default Formulario