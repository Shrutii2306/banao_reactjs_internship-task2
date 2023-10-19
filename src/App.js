import "./App.css";
import React, { useState, useEffect } from "react";
import LoadingSpinner from './components/LoadingSpinner';
import axios from "axios";
import userIcon from './images/userIcon.png';
import user_bg_img from './images/user_bg_img.svg'; 
import BackgroundImg from "./components/BackgroundImg";
function App() {
  const url = "https://602e7c2c4410730017c50b9d.mockapi.io/users";
  const [data, setData] = useState([]);
  const [user, setUser] = useState({profile : {}});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fetchInfo = async () => {
    setIsLoading(true);
   try{ const res = await axios.get(url, {
      params:{
        limit:50
      }
    });
    setIsLoading(false);
    return setData(res.data);}
    catch(err){
      setIsLoading(false);
      setErrorMessage('Something Went Wrong')
    }
    
  };

  useEffect(() => {
    fetchInfo();
  }, []);
 

  // const fetchUser = (userId) => {
  //   axios.get(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${userId}`).then((res) => {
  //     setUser(res.data);
  // });
  // }

 

  
  const displayUser =  (
    
      <div className="user-list-container">
{errorMessage ? <div>{errorMessage}</div>: 
<div>
        {data.map((dataObj, index) => {
          return (
            <div className="user">
              {(dataObj) => user.map((dataObj) => {
              return <p>{user.firstName}</p>;
            })}
                <button type="button"
                onClick = { () => {
                  setUser(dataObj)
                }}
                className= {dataObj.id == user.id ?"user-div-active btn":"user-div btn" } >
                 
                {dataObj.id <11 ?<img src= {userIcon} className="userIcon2" /> :<img src= {dataObj.avatar} className="userIcon" />}

             <div className="user-name">
                {dataObj.profile.firstName} {dataObj.profile.lastName}
              </div>

              </button>
            </div>
          );
        })}</div>}
    </div>
  )

  const displayUserDetails = (

    <div className="user-details-div"> 
          <div className="user-bg-img">
        
        <img src={user_bg_img} style={{marginLeft:'-3.4rem',height:'14rem',borderTopLeftRadius:'1rem'}}/>
      </div>
      <div style={{ zIndex:'1',position:'relative',justifyContent:'start',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
          <div>
            { user.id<11 ? <img src={userIcon} className="image-div"/>  : <img src={user.avatar} className="image-div2"/> }
          </div>  
          <div className="user-details" >        
          <div className="details-div">
            <div className="header-field">Username : </div>
            <div className="detail-field">{user.profile.username}</div>
          </div>

          <div className="details-div">
            <div className="header-field">Name : </div>
            <div className="detail-field">{user.profile.firstName} {user.profile.lastName}</div>
          </div>

          <div className="details-div">
            <div className="header-field">Job Title : </div>
            <div className="detail-field">{user.jobTitle}</div>
          </div>

          <div className="details-div">
            <div className="header-field">Email : </div>
            <div className="detail-field">{user.profile.email}</div>
          </div>

          <div className="details-div">
            <div className="header-field">Bio : </div>
            <div className="detail-field">{user.Bio}</div>
          </div>
          </div>
        </div>
        </div>
    )
  
  return (
    <div className="App">  
       <BackgroundImg />
      <div className="content-div" >
      <div className="user-list-div">
      <div style={{fontSize:'2rem',color:'gray'}}>USER LIST<hr></hr></div>
        { isLoading ? <LoadingSpinner /> : displayUser }
        
    </div>
        {user.id ?  displayUserDetails:
        <div className="user-details-div">
            <div className="user-details-default-div">Click on an user to view details.</div>
        </div>}
      </div>
      
    </div>
  );
}


export default App;