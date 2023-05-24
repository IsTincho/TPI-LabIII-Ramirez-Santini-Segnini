import React from 'react'

function Product() {
  
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4107785280msh79e3f6da4d53f5cp1d8110jsn48bdd5aefa7d',
        'X-RapidAPI-Host': 'apidojo-forever21-v1.p.rapidapi.com'
    }
};

const fetchAPI = async () => {
  

  let res = await fetch('https://apidojo-forever21-v1.p.rapidapi.com/products/v2/list?category=women_main&pageSize=48&pageNumber=1&sortby=0&filterColor=BLACK&filterSize=XS%2FS', options)
  let data = await res.json()
  console.log(data)
}

fetchAPI()


}

export default Product