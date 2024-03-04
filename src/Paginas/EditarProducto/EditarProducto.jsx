import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import './EditarProducto.css';
import { Link } from 'react-router-dom';

export const EditarProducto = () => {
    const [productos, setProductos] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Estado de edición para rastrear qué producto se está editando
    const [editNombre, setEditNombre] = useState('');
    const [editPrecio, setEditPrecio] = useState(0);


    useEffect(() => {
        const productosRef = collection(db, 'Productos');
        getDocs(productosRef).then((resp) => {
            setProductos(
                resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                })
            );
        });
    }, []);



    const handleEditarClick = async (index) => {
        setEditIndex(index)
        try {
          // Actualiza el documento en Firestore con los nuevos valores

            setEditNombre(productos[editIndex].Nombre);
            setEditPrecio(productos[editIndex].Precio);
          const productoRef = doc(db, 'Productos', productos[index].id);
          await updateDoc(productoRef, { Nombre: editNombre, Precio: editPrecio });
      
          // Actualiza la lista de productos localmente
          const nuevosProductos = [...productos];
          nuevosProductos[index].Nombre = editNombre;
          nuevosProductos[index].Precio = editPrecio;
          setProductos(nuevosProductos);
      
          // Resetea el estado de edición
          
        } catch (error) {
          console.error('Error al editar producto:', error);
        }
      };
      

    const handleCancelarEdicion = () => {
        setEditIndex(null); // Cancela la edición, reseteando el índice de edición
    };


    

    return (
        <div className='EditarProducto'>


            {editIndex !== null && (

                <div className='editar'>

                    <h4>Editar Producto</h4>

                    <div>
                        <input type='text' placeholder='Nombre' defaultValue={productos[editIndex].Nombre} className='inputs__editar'  onChange={(e) => setEditNombre(e.target.value)}/>
                        <input type='text' placeholder='Precio' defaultValue={productos[editIndex].Precio} className='inputs__editar'  onChange={(e) => setEditPrecio(e.target.value)}/>

                        <button onClick={() => handleEditarClick(editIndex)} className='inputs__editar'>Editar</button>

                        <button onClick={handleCancelarEdicion} className='inputs__editar'>Cancelar</button>
                    </div>
                </div>
            )}


            {productos.map((item, index) => (
                <div key={index}>
                    <div className='Producto'>
                        <img src={item.Imagen} alt='' />
                        <p>{item.Nombre}</p>
                        <p>$ {item.Precio}</p>
                        <button className='BtnEditar' onClick={() => handleEditarClick(index)}>
                            Editar
                        </button>
                    </div>
                </div>
            ))}

            <Link to={'/'}><button className='atras'>atras</button></Link>
        </div>
    );
};
