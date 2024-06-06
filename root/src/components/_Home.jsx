

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import boxDraw from '../assets/box draw.png';
import { getUserOutletFunc, createUserOutletFunc } from '../states/outletStore';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Spinner from 'react-bootstrap/Spinner';



const Home = () => {

  const backgroundStore = {
    minHeight: "calc(100vh - 59px)",
    background: `linear-gradient(to bottom, #333, #2a606c)`,
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
          if (res.payload.data) {
            navigate('/store')
          } else {
            setFirstEnter(true);
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

      <div style={backgroundStore} className='text-light py-5 px-3 d-flex justify-content-center flex-column'>
        <div className='mb-4'>
          <img className='img-fluid myMaxW300' src={boxDraw} alt="" />
          <h1 className='font-monserrat display-6 fw-bold'>myStocker</h1>
          <h3 className='nycd display-6' >
            Get in the Outlet and make a deal!
          </h3>
        </div>
        {
          firstEnter ?
            <h5 className='text-center myLightGrayColor fw-light mb-3'>This is your first enter in the Outlet with this account.<br/><b> Are you ready to make a Deal?</b></h5>
            : null
        }
        <div className='d-flex justify-content-center'>
          {
            firstEnter ?
              <Button variant="btn btn-primary w-50 fw-bold" onClick={firstOutletEnter}>{isLoading ? <Spinner animation="border" size='sm' /> : "Enter"}</Button>
              :
              <Button variant="btn btn-info w-50 fw-bold" onClick={enterOutlet}>{isLoading ? <Spinner animation="border" size='sm' /> : "Store"}</Button>
          }
        </div>

      </div>


      <div className='py-5 px-4 d-flex justify-content-center '>
        <div className='myMaxW700 d-flex align-items-center justify-content-around my-5 gap-5' >
          <Button href='#pricing' variant="btn btn-outline-secondary"> <i className="bi bi-credit-card-2-back-fill"></i> Payment</Button>
          <Button href='#termOfUse' variant="btn btn-outline-secondary"> <i className="bi bi-bookmark-check-fill"></i> Condzioni d'uso</Button>
          <Button href='#howItWorks' variant="btn btn-outline-secondary"> <i className="bi bi-info-circle-fill"></i> Portale</Button>
        </div>
      </div>



      <div className='text-dark p-3' id='howItWorks'>

        <h2 className='text-black p-4 font-monserrat text-center'>How does the portal work</h2>

      </div>

      <div className='p-4 py-5 bg-dark' >
        <div className='pricing my-5' id='pricing'>
          <h2 className='text-light font-monserrat text-center'>choose your plan</h2>

          <div className='d-flex justify-content-center flex-wrap align-items-center gap-3'>
            <Link to="/payment/free" className='linkfree'>
              <Card className='hoverCardStyle' style={{ ...cardStyle, backgroundImage: "url('https://img.freepik.com/premium-vector/abstract-modern-background-with-lowpoly-triangle-element-vibrant-gradient-color_8221-1337.jpg?w=1060')" }}>
                <Card.Body className='p-4'>
                  <Card.Title className='fw-bold' style={{ color: 'blue' }}>Free</Card.Title>
                  <Card.Text className='fw-bold' style={{ fontSize: '20px' }}>
                    €0/month
                  </Card.Text >
                  <Button variant="primary">Select</Button>
                  <Card.Text>
                    always free
                    <ul className='p-0 font-monserrat'>
                      <li>1 annuncio</li>
                      <li>1 foto</li>
                      <li>1 video</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
            <Link to="/payment/standard" className='linkfree'>
              <Card className='hoverCardStyle' style={{ ...cardStyle, backgroundImage: "url('https://img.freepik.com/free-vector/low-poly-background_1048-8516.jpg?w=900&t=st=1706866072~exp=1706866672~hmac=43adf3a988c1f313519204e41398f201e20f13cf9121ae70d5f3ecfeb65fa40f')" }}>
                <Card.Body className='p-4 d-flex flex-column justify-content-center align-items-center'>
                  <Card.Title style={{ fontWeight: 'bold', color: 'coral' }}>Standard</Card.Title>
                  <Card.Text style={{ fontWeight: 'bold', fontSize: '20px' }}>
                    €5.99/month
                  </Card.Text>
                  <Button variant="primary">Select</Button>
                  <Card.Text style={{ margin: '10px' }} >
                    5 annunci
                    <ul className='p-0 font-monserrat'>
                      <li>3 foto</li>
                      <li>5 video</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
            <Link to="/payment/boost" className='linkfree'>
              <Card className='hoverCardStyle' style={{ ...cardStyle, backgroundImage: "url('https://img.freepik.com/free-vector/light-green-shapes-green-background_23-2148358597.jpg?t=st=1706866122~exp=1706866722~hmac=b2a44f3c3ebb90c82c68cc1af293545e92de3f7715a0114bbb304a27ad0641d5')" }}>
                <Card.Body className='p-4'>
                  <Card.Title className='fw-bold text-success'>Boost</Card.Title>
                  <Card.Text style={{ fontWeight: 'bold', fontSize: '20px' }}>
                    €9.99/month
                  </Card.Text>
                  <Button variant="primary">Select</Button>
                  <Card.Text style={{ margin: '10px' }}  >
                    10 annunci
                    <ul className='p-0 font-monserrat'>
                      <li>10 foto</li>
                      <li>10 video</li>
                    </ul>
                  </Card.Text>
                </Card.Body>

              </Card>
            </Link>

          </div>
        </div>
      </div>

      <div className='p-3 termbg' id='termOfUse'>

        <h2 className='text-black font-monserrat text-center'>Terms of Use</h2>
        <h3 className='m-2 p-4 fw-light'>
          Questo documento rappresenta le Condizioni d'Uso ("Termini") che regolano l'accesso e l'utilizzo del nostro sito web.<br /> Utilizzando questo sito web, accetti di essere vincolato dai seguenti Termini. Se non accetti questi Termini, ti preghiamo di non utilizzare il nostro sito.<br />
          Accetti di utilizzare il nostro sito solo per scopi leciti e conformi a questi Termini.

          Non è consentito utilizzare il sito per scopi illegali o in modo tale da violare leggi locali,<br /> nazionali o internazionali.
          Il contenuto del sito è fornito solo a scopo informativo. Non garantiamo l'accuratezza,<br /> la completezza o l'aggiornamento delle informazioni presentate.<br />

          Ci riserviamo il diritto di modificare o interrompere qualsiasi aspetto del sito in qualsiasi momento senza preavviso.
        </h3>
      </div>

    </div>


  );
}

export default Home;
