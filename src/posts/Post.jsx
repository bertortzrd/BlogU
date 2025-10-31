import { useState, useEffect } from "react";

function Post({_id,texto,autor,likes,actualizarLikes,token, eliminarPost, editarPost,esAutor}){

    let [animacionLike, setAnimacionLike] = useState(false)
    let [modoEdicion, setModoEdicion] = useState(false);
    let [nuevoTexto, setNuevoTexto] = useState(texto);

    useEffect(() => {
        setNuevoTexto(texto);
    }, [texto]);

    const darLike = () => {
        fetch(`https://api-blog-n9xx.onrender.com/posts/like/${_id}`, {
            method: "POST",
            headers: { 
                "Authorization": "Bearer " + token 
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error ${res.status}`)
        }
            return res.json();
        })
        .then(post => {
            if(post.likeAgregado){
                actualizarLikes(_id); // solo suma a la cuenta si realmente se ha añadido el like
                setAnimacionLike(true)
                setTimeout(() => setAnimacionLike(false), 300); //devuelve el color al original
            }                
        })
        .catch(err => console.error("Error al dar like:", err))
    }

    const guardarEdicion = () => {
        if(nuevoTexto.trim() === "") return;
        fetch(`https://api-blog-n9xx.onrender.com/posts/editar/texto/${_id}`, {
            method: "PUT",
            headers: { 
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                texto: nuevoTexto
            })
        })
        .then(res => {
        if(!res.ok) throw new Error(`Error ${res.status}`);
        editarPost(_id, nuevoTexto);
        setModoEdicion(false);
        })
        .catch(err => console.error(err));
    }

    const cancelarEdicion = () => {
        setNuevoTexto(texto);
        setModoEdicion(false);
    }

    const borrar = () => {
        fetch(`https://api-blog-n9xx.onrender.com/posts/borrar/${_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then( res => {
            if (!res.ok) throw new Error(`Error ${res.status}`)
            eliminarPost(_id)
        })
        .catch(err => console.error("Error al borrar el post:", err));        
    }

    return (
        <div className={`post ${modoEdicion ? 'editando' : ''}`}>
            <h3 className="autor">{autor}</h3>

            {modoEdicion ? (
                <input
                    type="text"
                    className="edicion"
                    value={nuevoTexto}
                    onChange={evento => setNuevoTexto(evento.target.value)}
                />
            ) : (
                <p className="contenidoPost">{texto}</p>
            )}

            <div className="footer">
                <span className={`likes ${animacionLike ? "animar" : ""}`}>{likes || 0} ❤️</span>
                <button className="meGusta" onClick={darLike}>ME GUSTA</button>

                {esAutor && !modoEdicion && (
                    <>
                        <button className="editar" onClick={() => setModoEdicion(true)} title="Editar">Editar</button>
                        <button className="borrar" onClick={borrar} title="Borrar">Borrar</button>
                    </>
                )}

                {modoEdicion && (
                    <>
                        <button className="guardar" onClick={guardarEdicion} title="Guardar">Guardar</button>
                        <button className="cancelar" onClick={cancelarEdicion} title="Cancelar">Cancelar</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Post