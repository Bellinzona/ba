import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/config';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import "./EliminarProducto.css"
import { Link } from 'react-router-dom';

export const EliminarProducto = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const productosRef = collection(db, 'Productos');
        getDocs(productosRef).then((resp) => {
            setProductos(
                resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                })
            );
        });
    }, [productos]);

    const eliminarProducto = async (id) => {
        try {
          const pagoRef = doc(db, 'Productos', id);
          await deleteDoc(pagoRef);
        } catch (error) {
          console.error('Error al eliminar el producto:', error);
        }
      };


    return (
        <div>

            {productos.map((item, index) => (
                <div key={index}>
                    <div className='Producto'>
                        <img src={item.Imagen} alt='' />
                        <p>{item.Nombre}</p>
                        <p>$ {item.Precio}</p>
                        <button className='BtnEliminar' onClick={() => eliminarProducto(item.id)}>Eliminar</button>
                    </div>
                </div>
            ))}


            <Link to={"/"}> <button>Atras</button> </Link>
           



        </div>
    )
}
