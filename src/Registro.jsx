import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Registro(){
    let [usuario, SetUsuario] = useState("")
    let [password, SetPassword] = useState("")
    let [confirmar, SetConfirmar] = useState("")
    let [error, SetError] = useState("")
    let [exito, SetExito] = useState(false)
    let navegar = useNavigate()

    const registrarse = async (evento) => {
                    evento.preventDefault()
                    SetError("")
                    SetExito(false)
    
            if (!usuario.trim()) return SetError("El nombre de usuario es obligatorio")
            if (password !== confirmar) return SetError("Las contraseñas no coinciden")
        try{
            let res = await fetch("https://api-blog-n9xx.onrender.com/registro", {
                        method: "POST",
                        body: JSON.stringify({usuario,password}),
                        headers: {
                            "Content-type": "application/json"
                        }
            })

            if(!res.ok){
                let datos = await res.json().catch(() => ({}))
                throw new Error (datos.error || "error al registrar al usuario")
            }

            SetExito(true)
            navegar("/login")

        } catch(error){
            SetError(error.message)
        }
    }   

    return <>
                <div className="contenedorLogin">
                    <div className="fondoLogo">
                        <form onSubmit={registrarse}>
                            <h2>Registrar nuevo usuario</h2>         
                                        <input type="text" placeholder="nuevo usuario" value={usuario} onChange={ evento => SetUsuario(evento.target.value)}/>
                                        <input type="password" placeholder="contraseña" value={password} onChange={ evento => SetPassword(evento.target.value)}/>
                                        <input type="password" placeholder="confirmar contraseña" value={confirmar} onChange={ evento => SetConfirmar(evento.target.value)}/>
                                        <input type="submit" value="aceptar" />
                                        {error && <p style={{ color: "red", backgroundColor:"#7484ab" }}>{error}</p>}
                                        {exito && <p style={{ color: "green" }}>¡Usuario registrado correctamente!</p>}
                        </form>
                    </div>
                </div> 
            </>    
}

export default Registro