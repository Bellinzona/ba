import React from 'react'
import { useState } from 'react'
import { uploadBytes,getDownloadURL } from 'firebase/storage'
import { ref } from 'firebase/storage'
import { db,storage } from '../../firebase/config'
import { addDoc,collection } from 'firebase/firestore'
import "./AñadirProducto.css"
import { Link } from 'react-router-dom'

export const AñadirProducto = () => {
  const [fotoPublicacion, setFotoPublicacion] = useState(null);
  const [producto,setProducto] = useState("")
  const [precio,setPrecio] = useState(0)
  const [campo, setCampo] = useState("milanesas");


  const RecibirURL = async (imagen) => {
    try {
      const storageRef = ref(storage, `imagenes/${imagen.name}`);
      const snapshot = await uploadBytes(storageRef, imagen);
      console.log(snapshot);
  
      const imagenURL = await getDownloadURL(storageRef);
      console.log(imagenURL);
  
      return imagenURL;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error; // Re-lanza el error para que pueda ser manejado en el código de llamada.
    }
  };


  const handlePublicar = async () => {


    let fotoPublicacionURL = null


    if (fotoPublicacion) {
      fotoPublicacionURL = await RecibirURL(fotoPublicacion);
    }

    const formData = {
      Campo: campo,
      Imagen:fotoPublicacionURL,
      Nombre:producto,
      Precio:precio,
    }

    añadirPublicacion(formData)
  }

  const handleFotoChange = (e) => {
    // Puedes acceder al archivo seleccionado usando e.target.files[0]
    setFotoPublicacion(e.target.files[0]);
  };

  const añadirPublicacion = (archivo) =>{
    const archivoRef = collection(db,"Productos")
    addDoc(archivoRef,archivo).then(() => {
      alert("publicacion añadida")
    })


  }

  const handlePrecioChange = (e) => {
  // Convierte el valor del campo de entrada a un número utilizando parseFloat o parseInt
  setPrecio(parseFloat(e.target.value)); // O parseInt(e.target.value) si deseas un entero
};








return (
    <div className='inputsdeProducto'>

      <div className="form">

      <input type="text" placeholder='Nombre del producto' className='inp' value={producto} onChange={(e) => setProducto(e.target.value)} />
      <input type="number" placeholder='Precio' className='inp'  value={precio} onChange={handlePrecioChange}/>

      <select value={campo} className='inp' onChange={(e) => setCampo(e.target.value)}>

        <option value="milanesas">Milanesas</option>
        <option value="veggie">Veggie</option>
        <option value="congelados">Congelados</option>
        <option value="promos">Promo</option>





      </select>
      <input type="file" onChange={handleFotoChange} className='inp'/>

      <button className='añadirProductoBtn' onClick={handlePublicar}>Enviar</button>

      </div>



    <Link to={"/"}><button className='atras'>atras</button> </Link>

    </div>
    
  )
}
