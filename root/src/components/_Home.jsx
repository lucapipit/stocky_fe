

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { getUserOutletFunc, createUserOutletFunc } from '../states/outletStore';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Spinner from 'react-bootstrap/Spinner';
import { setIsLogged } from '../states/loginState';
import Lottie from 'lottie-react';
import BoxFalling from '../assets/Animation/Animation - 1719298892992.json';
import dotsAnimation from '../assets/Animation/dotsSpinner.json';
import miniLogo1 from '../assets/Graphics/miniLogo-1.png';
import miniLogo2 from '../assets/Graphics/miniLogo-2.png';
import miniLogo3 from '../assets/Graphics/miniLogo-3.png';



const Home = () => {

  const backgroundStore = {
    minHeight: "calc(100vh - 59px)",
    backgroundSize: "contain",
    textAlign: "center",
  };


  const cardStyle = {
    backgroundSize: "cover",
    backgroundPosition: "top",
    height: "300px",
    fontSize: "20px",
    marginTop: "30px",
    marginBottom: "30px",
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: dotsAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMi slice'
    }
  }

  const [decodedTkn, setDecodedTkn] = useState("");
  const [firstEnter, setFirstEnter] = useState(false);
  const isLogged = useSelector((state) => state.login.isLogged);
  const isLoading = useSelector((state) => state.outlet.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const enterOutlet = async () => {
    if (decodedTkn) {
      dispatch(getUserOutletFunc({ idOwner: decodedTkn.id, token: localStorage.getItem("token") }))
        .then((res) => {
          if (res.payload.statusCode === 408) {
            dispatch(setIsLogged(false));
            localStorage.clear();
            navigate('/login')
          } else {
            if (res.payload.data.length !== 0) {
              navigate('/store')
            } else {
              setFirstEnter(true);
            }
          }
        })
    } else {
      navigate('/login')
    }
  };

  const firstOutletEnter = async () => {

    const payload = {
      idOwner: decodedTkn.id,
      outletSet: "",
      outletHistory: "",
      outletLikes: "",
      resetOutletTime: ""
    };
    dispatch(createUserOutletFunc({ payload: payload, token: localStorage.getItem("token") }))
      .then((res) => {
        if (res.payload.statusCode === 200) {
          setFirstEnter(false);
          navigate('/store')
        }
      })
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tkn = jwtDecode(token, process.env.JWT_SECRET);
      setDecodedTkn(tkn);
    } else {
      setDecodedTkn("")
    }
  }, [isLogged])


  return (
    <div>

      <div style={backgroundStore} className='myBgDark position-relative py-5 px-3 d-flex justify-content-start flex-column'>


        <div className="position-relative w-100 myMaxW500" style={{ left: "50%", transform: "translateX(-50%)" }}>
          <Lottie animationData={BoxFalling} options={defaultOptions} />
        </div>
        <div className='mb-4'>
          <h1 className='font-monserrat display-1 fw-light text-light'>myStocker</h1>
          <h3 className='nycd fw-light text-light px-3' >
            Get in the Outlet and make a deal!
          </h3>
        </div>
        {
          firstEnter ?
            <h5 className='text-center myLightGrayColor fw-light mb-3'>This is your first enter in the Outlet with this account.<br /><b> Are you ready to make a Deal?</b></h5>
            : null
        }
        <div className='d-flex justify-content-center'>
          {
            firstEnter ?
              <Button variant="btn btn-primary px-5" onClick={firstOutletEnter}><h2 className='fw-light'>{isLoading ? <Spinner animation="border" size='sm' /> : "Enter"}</h2></Button>
              :
              <Button className="outletButton text-light px-5 rounded-0" onClick={enterOutlet}><h2 className='fw-normal'>{isLoading ? <Spinner animation="border" size='sm' /> : "Outlet"}</h2></Button>
          }
        </div>
        <div className='mt-5'>
          <img className='myMaxW80' src={miniLogo1} alt="" />
          <img className='myMaxW80' src={miniLogo2} alt="" />
          <img className='myMaxW80' src={miniLogo3} alt="" />
        </div>

      </div>
    </div>


  );
}

export default Home;
