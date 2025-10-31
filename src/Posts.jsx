import { useState, useEffect, useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import ContextoUsuario from "./ContextoUsuario"
import Formulario from "./posts/Formulario"
import Post from "./posts/Post"


function Posts(){
    let { token, usuario, setToken, setUsuario} = useContext(ContextoUsuario)
    let [posts,setPosts] = useState([])
    let navegar = useNavigate()

    useEffect(() => {
        if (token !== "") {
            fetch("https://api-blog-n9xx.onrender.com/posts", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then((res) => res.json())
            .then((posts) => setPosts(posts))
            .catch((err) => console.error("Error al cargar posts:", err));
        }
    }, [token]);

    function escribirPost(nuevoPost){
        setPosts([ nuevoPost,...posts])//en este orden los posts nuevos aparecen al inicio del feed 
    }

    function actualizarLikes(postId){
        setPosts(prevPosts => prevPosts.map(post =>  post._id === postId ? { ...post, likes: Number(post.likes || 0) + 1 } : post ));//para añadir a la suma del contador de likes correspondiente a cada post
    }

    function editarPost(postId, nuevoTexto) {
    setPosts(prevPosts =>
        prevPosts.map(post => post._id === postId ? { ...post, texto: nuevoTexto } : post));
    }

    function eliminarPost(postId) {
    setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    }

    function hacerLogout(){
        setToken("")
        setUsuario(null)
        navegar("/login")
    }

    if (token === "") return <Navigate to="/login" />

    return token == "" ? 
            <Navigate to="/login" /> :
            <>
            <div className="feed">
                <h2 className="logoInicio">BLOG·U<button className="salir" onClick={hacerLogout}>Salir</button></h2>
                <Formulario escribirPost={escribirPost}/>
                <section className="publicaciones">
                    {Array.isArray(posts) ? posts.map( ({texto,_id,autor,likes}) => <Post key={_id} _id={_id} texto={texto} autor={autor} token={token} likes={likes} actualizarLikes={actualizarLikes} eliminarPost={eliminarPost} editarPost={editarPost} esAutor={usuario === autor}  />) : null }
                </section>
            </div>
            </>
}

export default Posts