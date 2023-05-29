import './CarouselProducts.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import FakeProducts from '../FakeProducts/FakeProducts';

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

 

  return (

<div className='container'>
<h1>Productos Destacados</h1>


<Carousel responsive={responsive}>
  {
  
    Productos.map(item => (
    <div className='container-cards'>
      
      <div className='card'>

        <img src={item.img} alt={item.title}/>
        <p> ${item.price}</p>
        <button>Ver</button>
      </div>
      </div>  
    ))
    }
</Carousel>
  
</div> 

);
}

export default CarouselProducts;