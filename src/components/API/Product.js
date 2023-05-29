import React from 'react'

function Product() {
  
  const options = {
    method: 'GET',
    url: 'https://apidojo-forever21-v1.p.rapidapi.com/products/v2/detail',
    params: {
      productId: '2000383198'
    },
    headers: {
      'X-RapidAPI-Key': '4107785280msh79e3f6da4d53f5cp1d8110jsn48bdd5aefa7d',
      'X-RapidAPI-Host': 'apidojo-forever21-v1.p.rapidapi.com'
    }
  };

const fetchAPI = async () => {
  

  let res = await fetch('https://apidojo-forever21-v1.p.rapidapi.com/products/v2/detail', options)
  let data = await res.json()
  console.log(data)
}

fetchAPI()


}

export default Product