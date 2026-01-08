import React from 'react'
import { Link } from 'react-router-dom'
import western from '/public/images/western.webp';
import bags from '/public/images/bags.jpg'
import shoes from '/public/images/shoes.jpg'



const categories=[{
   id:1,
   title:"Western Dresses",
   image:western,
   link:"/category/western"

},
{
    id:2,
    title:"Bags",
    image:bags,
    link:"/category/bags"
},
{
    id:3,
    title:"Ethnic Shoes",
    image:shoes,
    link:"/category/shoes"
},
];

function Categorysection(){

   
  return (
    <section className='py-16 bg-transparent'>
    <div className='text-center mb-10'>
        <h2 className='text-2xl font-bold text-gray-800 pt-10'>
            Shop by Category
        </h2>
        <p className='text-gray-600 mt-2'>
            Find the best pieces for your perfect look.
        </p>
    </div>
     

    {/* category grid */}
<div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-6 place-items-center'>
        {categories.map((dress)=>(
            <Link
            key={dress.id}
            to={dress.link}
            className='group block overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-transform duration-500 text-center w-full sm:w-72 '
            >
                <img
                src={dress.image}
                alt={dress.title}
                className='mx-auto h-60 w-auto object-cover transform group-hover:scale-110 transition-transform duration-500'
                />
                <div className='p-4 text-center bg-white'>
                    <h3 className='text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition-colors'>
                        {dress.title}
                    </h3>
              
                  
                </div>
            
            
            </Link>
        ))}

    </div>
    </section>
  )
}


export default Categorysection
