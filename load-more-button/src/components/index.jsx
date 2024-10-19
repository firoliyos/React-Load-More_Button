import './styles.css'
import {useState, useEffect} from 'react'

export default function LoadMoreData() {

   const [loading, setLoading] = useState(false)
   const [products, setProducts] = useState([])
   const [count, setCount] = useState(0)

   async function fetchProducts() {
      try{
        setLoading(true)
        const response = await fetch(`https://dummyjson.com/products?limit=100&skip=${count === 0 ? 0 : count *20}`)
        const result = await response.json()
        if(result && result.products && result.products.length)  {
           setProducts(result.products)
           setLoading(false)
         }
        console.log(result)
      }catch(e){
        setLoading(false)
        console.log(e)
      }
   }
  
   useEffect(() => {
      fetchProducts()
    }, [])

   if(loading){
      return(
         <div className="loading-container">Loading Data...</div>
      )
   } 
    
   
     return(
      <div className=".load-more-container">
        <div className="product-container">
         {
           products && products.length ? 
            products.map(item => <div className="product" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />  
              <p>{item.title}</p>
            </div>)
           : null 
         }
        </div>
        <div className="button-container">
         <button>Load More Items</button>
        </div>
      </div>
     )
   }