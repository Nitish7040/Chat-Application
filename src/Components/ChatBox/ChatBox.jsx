import React from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'

const ChatBox = () => {
  return (
    <div className='chat-box'>
      <div className="chat-user">
        <img src={assets.profile_img} alt="" />
        <p>Abhisek singh <img className='dot' src={assets.green_dot} alt="" /></p>
        <img src={assets.help_icon} className='help' alt="" />
      </div>

{/* chat messgae */}
<div className="chat-msg">

  {/* sender message */}
  <div className="s-msg">
    <p className="msg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, atque...</p>
    <div>
   <img src={assets.profile_img} alt="" />
   <p>02:20 pm</p>
   </div>
  </div>
  <div className="s-msg">
    <img className='msg-img' src={assets.pic1} alt="" />
    <div>
   <img src={assets.profile_img} alt="" />
   <p>02:20 pm</p>
   </div>
  </div>

  {/* reciver messqage */}
  <div className="r-msg">
    <p className="msg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, atque...</p>
   <div>
   <img src={assets.profile_img} alt="" />
   <p>12:20 pm</p>
   </div>
  </div>
</div>

    <div className="chat-input">
      <input type="text" placeholder='send a message..' />
      <input type="file" id='image' accept='image/png , image/jpeg' hidden />
      <label htmlFor="image">
        <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />
    </div>
    </div>
  )
}

export default ChatBox