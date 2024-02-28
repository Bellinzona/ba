import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import "./PedidosClientes.css"
import { Link } from 'react-router-dom';

export const PedidosClientes = () => {
    const [Pagos, setPagos] = useState([]);
    const [inputValue,setInputValue] = useState("")
    const [PagosFiltrados, setPagosFiltrados] = useState([]);


    useEffect(() => {
        const pagosRef = collection(db, 'Pagos');
    
        const unsubscribe = onSnapshot(pagosRef, (querySnapshot) => {
          const pagosData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setPagos(pagosData);
        });
    
        return () => unsubscribe();
      }, []);


      useEffect(() => {
        // Filtrar usuarios basados en el valor del input
        const filtrados = inputValue
            ? Pagos.filter(usuario =>
                usuario.Nombre.toLowerCase().includes(inputValue.toLowerCase()) || 
                usuario.IdCompra.includes(inputValue)
            )
            : Pagos;
    
        setPagosFiltrados(filtrados);
    }, [inputValue, Pagos]);
    
    

      const marcarEntregado = async (id) => {
        try {
          console.log("aaa")
          const pagoRef = doc(db, 'Pagos', id);
          await updateDoc(pagoRef, { estado: 'Entregado' });
        } catch (error) {
          console.error('Error al marcar como entregado:', error);
        }
      };

      const eliminarPago = async (id) => {
        try {
          const pagoRef = doc(db, 'Pagos', id);
          await deleteDoc(pagoRef);
        } catch (error) {
          console.error('Error al eliminar el pago:', error);
        }
      };




  return (
    <div className='PedidosClientes'>

        <div className="inputs">

            <input type="text" placeholder='Buscar por Nombre o Id' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            
            


        </div>

        <div className="Pedidos">

            { PagosFiltrados.map((item,index) => (
                <div key={index}>
                    
                    <div className='PedidosLugar'>

                        <p>Nombre: {item.Nombre} {item.Apellido}</p>
                        <p>Productos: {item.Producto}</p>
                        <p>Local: {item.Local}</p>
                        <p>{item.Horario}</p>
                        <p>telefono: {item.telefono}</p>
                        <p>Id: {item.IdCompra}</p>
                        {item.estado && <p className='Estado'>{item.estado}</p>}

                        <button className='Completado' onClick={() => marcarEntregado(item.id)}>Pedido Completado</button>
                        <button className='Eliminarboton' onClick={() => eliminarPago(item.id)}>Eliminar</button>

                    </div>

                    



                </div>
            ))}



        </div>
        

        <Link to={"/"}><button className='atras'>Atras</button></Link>




    </div>
  )
}
