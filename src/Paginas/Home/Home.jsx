import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className='Principal'>

       <Link to={"/PedidosClientes"}> <button>Pedidos Clientes</button></Link>
       <Link to={"/AñadirProducto"}><button>Añadir Producto</button></Link>
       <Link to={"/EditarProducto"}><button>Editar Producto</button></Link>
       <Link to={"/EliminarProducto"}><button>Eliminar Producto</button></Link>
       









    </div>
  )
}
