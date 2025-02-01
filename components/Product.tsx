import React from 'react'

const Product = ({ image, name, price, height }: { height?:boolean, image: string, name: string, price: number }) => {
    return (
        <div > 
            <div className="group overflow-hidden">
                <img
                    src={image}
                    alt="Product image"
                    className={`transition-transform duration-300 group-hover:scale-110 w-full ${height ? 'sm:h-[200px] md:h-[225px] h-[250px]':'sm:h-[300px] h-[250px]'}`}
                />
            </div>

            <div className='mt-6'>
                <div className="text-[15px] text-center">{name.split(' ').slice(0, 6).join(' ')}</div>
                <div className='text-center text-[15px] mt-3'>${price}</div>
            </div>
        </div>
    )
}

export default Product