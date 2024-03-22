"use client"
import GridExample from '@/app/components/AgGridTable';
import Slider from '@/app/components/Slider';
import React from 'react';

export default function Page() {

    const slides = [
      { image: '/deals.jpeg', alt:'Slide 1'},
      { image: '/concentrates.jpeg', alt:'Slide 1'},
      { image: '/biscuits.jpeg', alt:'Slide 1'},
      { image: '/flowerhemp.jpeg', alt:'Slide 1'},
      { image: '/hemp8.jpeg', alt:'Slide 1'},
      { image: '/limonene.jpeg', alt:'Slide 1'},
      { image: '/hemptea.jpeg', alt:'Slide 1'},
      { image: '/limonene.jpeg', alt:'Slide 1'},

      
    ]


    return (
      <div className='max-w-6xl mx-auto'>
    <h1>Hello, Settings Page!</h1>
      <Slider slides={slides}/>
      <div className='mt-20'>
      <GridExample />
      </div>
      </div>
    )
  }