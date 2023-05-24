
import './CarouselProducts.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';













const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };


function CarouselProducts() {

  const fakeProducts = [
    {
      id:1,
      img:"https://assets.adidas.com/images/w_600,f_auto,q_auto/686fd867c0ab402f9d85ad78011dda14_9366/Zapatillas_Showtheway_2.0_Negro_GY6347_01_standard.jpg",
      title: "Zapatillas",
      price: 28.99
    },
    {
      id:2,
      img:"https://d3ugyf2ht6aenh.cloudfront.net/stores/001/151/746/products/photoroom-20221110_191537_81-b6c6892dc6d8c4612f16681192985182-640-0.webp",
      title: "Remera",
      price: 12
    },
    {
      id:3,
      img:"https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/z/a/zapatillas-running-adidas-coreracer-negra-100010fx3581001-1.jpg",
      title: "Zapatillas",
      price: 122.99
    },
    {
      id:4,
      img:"https://essential.vtexassets.com/arquivos/ids/619483-800-auto?v=637983323462970000&width=800&height=auto&aspect=true",
      title: "Remera Nike ",
      price: 42
    },
    {
      id:5,
      img:"https://redsport.vteximg.com.br/arquivos/ids/1091896-1000-1000/CAMPERA-PUMA-EVOSTRIPE-CORE-FZ-HOODIE.jpg?v=637699840141500000",
      title: "Campera",
      price: 28.99
    }
  ]



  return (

<div className='container'>
<h1>Productos Destacados</h1>

<Carousel responsive={responsive}>
  {
  
    fakeProducts.map(item => (
    <div className='container-cards'>
      
      <div className='card'>

        <img src={item.img} />
        <p> ${item.price}</p>
        <button>Agregar</button>
      </div>
      

      </div>  
    ))
 
    }

    </Carousel>
  



    


</div> 

);
}

export default CarouselProducts;