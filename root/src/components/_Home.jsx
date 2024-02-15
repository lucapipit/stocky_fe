

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import '../styles/home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faFileContract, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';



const Home = () => {


  const backgroundStore = {
    minHeight: "calc(100vh - 59px)",
    backgroundImage: "url('https://img.freepik.com/free-vector/clean-medical-background_53876-97927.jpg?size=626&ext=jpg&ga=GA1.1.1788068356.1706486400&semt=ais')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "black",
    textAlign: "center",
  };

  const cardContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    minHeight: "calc(100vh - 59px)",
    background:"	paleturquoise",
    
   

    };

  const cardStyle = {
    backgroundSize: "cover",
    backgroundPosition: "top",
    height: "300px",
    fontSize: "20px",
    marginTop: "30px",
    marginBottom: "30px",

  };




  return (
    <div>
      <div style={backgroundStore} className='text-secondary bg-dark py-5 px-3 d-flex justify-content-center flex-column'>
        <div>
          <h1 className='font-monserrat'>Benvenuto nel Negozio di Articoli Medici</h1>
          <h3 className='nycd'>
            Trova gli articoli medici di cui hai bisogno per prenderti cura della tua salute.
            Esplora la nostra vasta selezione e trova prodotti di alta qualità per ogni tua esigenza.
          </h3>
          <h3 className='nycd' >
            Se sei un professionista del settore, hai la possibilità di inserire annunci per promuovere i tuoi servizi
            o offrire prodotti specializzati. Entra nel nostro <Link to="/createannouncement" className='linkcreate'>Mercato degli Annunci</Link> ora.
          </h3>
        </div>
        <Link to={"/store"} style={{ marginTop: '20px' }}>
          <Button variant="btn btn-outline-secondary">Vai al Negozio</Button>
        </Link>
      </div>

      <div className='' style={cardContainerStyle}>
        <div>
          <a href='#price' style={{ textDecoration: 'none',display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ marginBottom: '5px' }}>
            <FontAwesomeIcon icon={faCreditCard} size='5x' color='indigo' />
            </span>
            <Button variant="btn btn-outline-secondary">Payment</Button>
          </a>
        </div>
        <div>
          <a href='#condizione' style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ marginBottom: '5px' }}>
            <FontAwesomeIcon icon={faFileContract} size='5x' color='indigo' />
            </span>
            <Button variant="btn btn-outline-secondary">condzioni di uso</Button>
          </a>
        </div>
      

<div>
  <a href='#portale' style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <span style={{ marginBottom: '5px' }}>
      <FontAwesomeIcon icon={faExternalLinkAlt} size='5x' color='indigo' />
    </span>
    <Button variant="btn btn-outline-secondary">Portale</Button>
  </a>
</div>
      </div>


     


      <div className='portale bg-light text-dark p-3'>
        <h2 className='text-black p-4 font-monserrat text-center'>How does the portal work</h2>

        <div className='d-flex justify-content-between p-3'>
          <div className='d-flex align-items-start' style={{ marginRight: '20px' }}>
            <img className='imgPortale' style={{ width: '100%', height: '280px', objectFit: 'cover', objectPosition: 'center', borderRadius: '10px' }}
              src="https://static.vecteezy.com/system/resources/previews/002/923/747/original/global-network-connection-world-map-point-and-line-composition-concept-of-global-business-illustration-free-vector.jpg" alt="" />
            <h3 className='p-3 portale fw-light'>
              Alcune funzionalità del sito possono richiedere la registrazione. Se scegli di registrarti, sei responsabile di mantenere la riservatezza delle tue informazioni di accesso.
              Ci riserviamo il diritto di sospendere o chiudere il tuo account in qualsiasi momento per violazione di questi Termini.
              I contenuti, i marchi e altri diritti di proprietà intellettuale presenti sul sito sono di nostra proprietà o concessi in licenza a noi.
            </h3>
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-end' style={{ marginLeft: '20px' }}>
            <h3 className='p-3 portale fw-light '>
              Alcune funzionalità del sito possono richiedere la registrazione. Se scegli di registrarti, sei responsabile di mantenere la riservatezza delle tue informazioni di accesso.
              Ci riserviamo il diritto di sospendere o chiudere il tuo account in qualsiasi momento per violazione di questi Termini.
              I contenuti, i marchi e altri diritti di proprietà intellettuale presenti sul sito sono di nostra proprietà o concessi in licenza a noi.
            </h3>
            <img style={{ width: '100%', height: '280px', objectFit: 'cover', objectPosition: 'center', borderRadius: '10px' }}
              src="https://thumbs.dreamstime.com/b/rete-di-computer-comunicazione-internet-nel-fondo-tecnologia-rappresentazione-d-127354210.jpg" alt="" />
          </div>
        </div>



      </div>

      <div className='p-4 py-5 bg-dark' >
        <div className='pricing my-5' id='price'>
          <h2 className='text-light font-monserrat text-center'>choose your plan</h2>

          <div className='d-flex justify-content-center align-items-center gap-3'>
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

      <div className='p-3 termbg'>

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
