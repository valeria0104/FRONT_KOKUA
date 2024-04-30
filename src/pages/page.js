import Image from 'next/image'
import Link  from "next/link"
const Index = () => {
 return (
    <>
    <header>
 
     <h1> Ejemplo de Imagen</h1>
    <Image src= "/styles/fondo.jpg"
      height = {400}
        width = {600}
       alt =" Ejemplo de Imagen">
  </Image>
  </header>
      <div>
        <h1>
            Pagina de Bienvenida
        </h1>
        <p>
            Hola mundo NextJS
        </p>
        <p>
          Ir a la sgte pagina 
          <Link href= "/PAGE2"> pagina 2</Link>
        </p>
        <p>
          Ir a la imagen
          <Link href= "/imagen"> Imagen</Link>
        </p>
      </div>
      <div>
        <ul>
        <li><Link href= "/xyz/1"> parametro 1</Link></li>
        <li><Link href= "/xyz/3"> parametro 2</Link></li>
        <li><Link href= "/xyz/2"> parametro 3</Link></li>
        <li><Link href= "/xyz/999"> parametro 4</Link></li>
        <li><Link href= "/xyz/8888"> parametro 5</Link></li>
        </ul>
      </div>

</>
 )
}
export default Index



