import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import ContextoUsuario from "./ContextoUsuario"


function Login(){
    let { setToken } = useContext(ContextoUsuario)
    let [ usuario, setUsuario ] = useState("")
    let [ password, setPassword ] = useState("")
    let[ error, setError ] = useState(false)
    let navegar = useNavigate()

    return <>
            <div className="contenedorLogin">
                <div className="fondoLogo">
                    <div className="logo">BLOG·U</div>
                        <form className="formularioLogin" onSubmit={ evento => {
                                evento.preventDefault()
                                setError(false)

                                fetch("https://api-blog-n9xx.onrender.com/login", {
                                    method: "POST",
                                    body: JSON.stringify({usuario,password}),
                                    headers: {
                                        "Content-type": "application/json"
                                    }
                                })
                                .then(res => {
                                    if(res.status != 200){
                                        return setError(true)
                                    }
                                    return res.json()
                                    .then(({token}) => {
                                        setToken(token)
                                        navegar("/")
                                    })
                                    .catch(() => setError(true))
                                })
                            }}>
                            <input type="text" placeholder="usuario" value={usuario} onChange={ evento => setUsuario(evento.target.value)} />
                            <input type="password" placeholder="contraseña" value={password} onChange={ evento => setPassword(evento.target.value)} />
                            <input type="submit" value="log in" />
                            {error && <p style={{ color: "red", backgroundColor: "#7484ab" }}>usuario o contraseña incorrectos</p>}
                            <p className="registro">¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
                        </form>
                </div>
            </div>
        </>
}

export default Login    