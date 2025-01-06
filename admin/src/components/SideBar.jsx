import React from 'react'
import { NavLink } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';

const SideBar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 pr-3'>
      <div className='text-buttontxt flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink 
          to="/add" 
          className={({ isActive }) => 
            `flex items-center gap-3 border border-grey-300 border-r-0 px-3 py-2 rounded-lg ${
              isActive ? ' text-champagne bg-lighterDark' : ''
            }`
          }
        >
          <AddIcon fontSize='medium' sx={{ color:'#CFC4B9' }} /> {/* Gold color */}
          <p className='hidden md:block'>Add Items</p>
        </NavLink>
        <NavLink 
          to="/list" 
          className={({ isActive }) => 
            `flex items-center gap-3 border border-grey-300 border-r-0 px-3 py-2 rounded-lg ${
              isActive ? ' text-champagne bg-lighterDark' : ''
            }`
          }
        >
          <ViewListIcon fontSize='medium' sx={{ color:'#CFC4B9' }} /> {/* Gold color */}
          <p className='hidden md:block'>List Items</p>
        </NavLink>
        <NavLink 
          to="/orders" 
          className={({ isActive }) => 
            `flex items-center gap-3 border border-grey-300 border-r-0 px-3 py-2 rounded-lg ${
              isActive ? ' text-champagne bg-lighterDark' : ''
            }`
          }
        >
          <ViewListIcon fontSize='medium' sx={{ color:'#CFC4B9' }} /> {/* Gold color */}
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar
