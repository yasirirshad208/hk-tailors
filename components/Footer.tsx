import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='mt-8'>
        <div className='container mx-auto'>
            <div className='flex items-center justify-between gap-x-6 gap-y-10 flex-wrap py-8'>

                <div>
                    <div className='text-[17px] text-black mb-6'>OUR SERVICES</div>

                    <div className='flex flex-col gap-4 text-[15px]'>
                        <Link href={"#"}>Ordering Online</Link>
                        <Link href={"#"}>Delivery & returns</Link>
                        <Link href={"#"}>Privacy Policy</Link>
                    </div>
                </div>

                <div>
                    <div className='text-[17px] text-black mb-6'>HK Tailors</div>

                    <div className='flex flex-col gap-4  text-[15px]'>
                        <Link href={"/collections/Cotton"}>Cotton</Link>
                        <Link href={"/collections/Linen"}>Linen</Link>
                        <Link href={"/collections/Laces"}>Laces</Link>
                        <Link href={"/collections/Stitching"}>Stitching</Link>
                    </div>
                </div>

                <div>
                    <div className='text-[17px] text-black mb-6 '>Contact</div>

                    <div className='flex flex-col gap-4 text-[15px]'>
                        <span>info@gmail.com</span>
                        <span>66 Essex Road, Islington, London N1 8LR</span>
                        <span>10:00 - 6:30 Monday to Saturday</span>
                        <span>11:00 - 5:00 Sunday</span>
                    </div>
                </div>


            </div>

            <div className='py-6 text-[15px]'>
                &copy; 2025 HK Tailors | All right reserved.
            </div>
        </div>
    </footer>
  )
}

export default Footer