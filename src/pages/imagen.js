import Image from 'next/image'

const EjemploImage= () =>{
return (
    <>
     <h1> Ejemplo de Imagen</h1>
     <Image src= "/logo_texto.png"
        height = {400}
        width = {600}
        alt =" Ejemplo de Imagen">

        </Image>
</>
)

}
export default EjemploImage