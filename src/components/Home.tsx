import React from 'react'
import { useStateValue } from '../state'

import SideNav from './SideNav'
import SingleProduct from './SingleProduct'

const Home = () => {
    const [{products,sort, byStock, byRating, search}]= useStateValue()
    
    const changedProducts = ()=>{
        let sortedProducts = products
        if(sort){
            sortedProducts = sortedProducts.sort((a:any,b:any)=> sort === "lowToHigh" ? a.price - b.price: b.price - a.price)
        }

        if(!byStock){
            sortedProducts = sortedProducts.filter((p)=>p.inStock)
        }

        if(byRating){
            sortedProducts= sortedProducts.filter((p)=>p.ratings>=byRating)
        }

        if(search){
            sortedProducts= sortedProducts.filter((p)=> p.name.toLowerCase().includes(search))
        }

        return sortedProducts
    }
    
    return (
        <div className= "home">
            <SideNav />
           <div className ="product-container">
               {changedProducts().map((product:any)=>(
                   <SingleProduct product = {product} key ={product.id} />
               ))}
           </div>
        </div>
    )
}

export default Home


