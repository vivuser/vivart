"use client"
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Search = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set('query', term);
    console.log(params, 'params')
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    }


  return (
    <div>
      <SearchIcon />
      <input name="search" placeholder='search' className='p-1 outline-none'
      onChange={(e) => handleSearch(e.target.value)}/>
    </div>
  )
}

export default Search
