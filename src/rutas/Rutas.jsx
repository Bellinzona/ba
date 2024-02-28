import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../Paginas/Home/Home'
import { PedidosClientes } from '../Paginas/PedidosClientes/PedidosClientes'
import { EditarProducto } from '../Paginas/EditarProducto/EditarProducto'
import { EliminarProducto } from '../Paginas/EliminarProducto/EliminarProducto'
import { AñadirProducto } from '../Paginas/AñadirProducto/AñadirProducto'

export const Rutas = () => {
  return (
    <BrowserRouter>

    <Routes>


    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/PedidosClientes' element={<PedidosClientes></PedidosClientes>}></Route>
    <Route path='/AñadirProducto' element={<AñadirProducto></AñadirProducto>}></Route>
    <Route path='/EditarProducto' element={<EditarProducto></EditarProducto>}></Route>
    <Route path='/EliminarProducto' element={<EliminarProducto></EliminarProducto>}></Route>





    </Routes>
    
    
    
    
    
    
    
    
    
    
    
    
    </BrowserRouter>
  )
}
