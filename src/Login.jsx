import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import ContextoUsuario from "./ContextoUsuario"


function Login(){
    let { setToken, setUsuario } = useContext(ContextoUsuario)
    let [ usuario, setUsuarioInput ] = useState("")
    let [ password, setPassword ] = useState("")
    let[ error, setError ] = useState(false)
    let navegar = useNavigate()

    const registrarse = () => {
        navegar("/Registro")
    }

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
                                        setUsuario(usuario)
                                        navegar("/")
                                    })
                                    .catch(() => setError(true))
                                })
                            }}>
                            <input type="text" placeholder="usuario" value={usuario} onChange={ evento => setUsuarioInput(evento.target.value)} />
                            <input type="password" placeholder="contraseña" value={password} onChange={ evento => setPassword(evento.target.value)} />
                            <input type="submit" value="log in" />
                            {error && <p style={{ color: "red", backgroundColor: "#7484ab" }}>usuario o contraseña incorrectos</p>}
                        </form>
                    <p className="registro">¿No tienes cuenta? <button onClick={registrarse}>Regístrate aquí</button></p>
                </div>
            </div>
        </>
}

export default Login    