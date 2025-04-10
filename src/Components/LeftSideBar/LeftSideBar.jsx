import React from 'react'
import './LeftSideBar.css'
import assets from '../../assets/assets'

const LeftSideBar = () => {
  return (
    <div className='ls'>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} className='logo' alt="" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input type="text" placeholder='Search' className='search-input' />
        </div>
      </div>
  <div className="ls-list">

       {Array(11).fill("").map((item,index)=>(

         <div key={index} className="friends">
         <img src={assets.profile_img} alt="" />
         <div><p>Nitish pandey</p></div>
         <span>Hello How are you? </span>
       </div>

       ))}

      </div>
    </div>
  )
}

export default LeftSideBar