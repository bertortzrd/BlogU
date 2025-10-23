import { useState } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ContextoUsuario from "./ContextoUsuario"
import Login from "./Login"
import Posts from "./Posts"
import Registro from "./Registro"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Posts />
    },
    {
        path:"login",
        element: <Login />
    },
    {
        path:"registro",
        element: <Registro />
    }
])

function Blog(){

    let [token,setToken] = useState("")

    return <ContextoUsuario.Provider value={{token,setToken}}>
                <RouterProvider router={router}></RouterProvider>
            </ContextoUsuario.Provider>
}

export default Blog