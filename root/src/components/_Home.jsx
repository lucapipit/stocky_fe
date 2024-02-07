

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';


const Home = () => {


  const backgroundStore = {
    minHeight: "calc(100vh - 59px)",
    backgroundImage: "url('https://img.freepik.com/free-vector/clean-medical-background_53876-97927.jpg?size=626&ext=jpg&ga=GA1.1.1788068356.1706486400&semt=ais')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    textAlign: "center",
  };

  const cardContainerStyle = {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    justifyContent: "center",
    padding: "30px",



  };

  const cardStyle = {
    backgroundSize: "cover",
    backgroundPosition: "top",
    height: "300px",
    fontSize: "20px",



  };


  return (
    <div >

      <div style={backgroundStore} className='text-light bg-dark py-5 px-3 d-flex justify-content-center flex-column'>
        <div>
          <h1 className='text-danger'>Benvenuto nel Negozio di Articoli Medici</h1>
          <p>
            Trova gli articoli medici di cui hai bisogno per prenderti cura della tua salute.
            Esplora la nostra vasta selezione e trova prodotti di alta qualità per ogni tua esigenza.
          </p>
          <p>
            Se sei un professionista del settore, hai la possibilità di inserire annunci per promuovere i tuoi servizi
            o offrire prodotti specializzati. Entra nel nostro <Link to="/createannouncement">Mercato degli Annunci</Link> ora.
          </p>
        </div>

        <Link to={"/store"}>
          <Button variant="btn btn-outline-secondary">Vai al Negozio</Button>
        </Link>
      </div>

      <div className='bg-dark' style={cardContainerStyle}>
        <a href='#price' style={{ textDecoration: 'none' }}>
          <Card style={{ ...cardStyle, backgroundImage: "url('https://img.freepik.com/free-vector/abstract-low-poly-design-background_1048-9213.jpg?w=900&t=st=1706865946~exp=1706866546~hmac=351e376fff139bcf17a8797bd5685515f4a050bef3dd8da899dfa79f5a7ce557')" }}>

            <Card.Body >
              <Card.Title className='text-danger shadow p-3 mb-5 bg-body rounded'>Payment</Card.Title>
              <Card.Text>
                scegli il metodo di pagamento che preferisci.
              </Card.Text>
            </Card.Body>
          </Card>
        </a>
        <a href='#condizione' style={{ textDecoration: 'none' }}>
          <Card style={{ ...cardStyle, backgroundImage: "url('https://cdn.pixabay.com/photo/2016/07/05/00/28/background-1497873_1280.jpg')" }}>
            <Card.Body>
              <Card.Title className='text-warning shadow p-3 mb-5 bg-body rounded'>condzioni di uso</Card.Title>
              <Card.Text>
                leggi le condizioni di uso del nostro sito.
              </Card.Text>
            </Card.Body>
          </Card>
        </a>
        <a href='#portale' style={{ textDecoration: 'none' }}>
          <Card style={{ ...cardStyle, backgroundImage: "url('https://img.freepik.com/free-vector/abstract-geometric-wireframe-background_52683-59421.jpg?w=996&t=st=1706865665~exp=1706866265~hmac=a490323788eb3de3c32cd2f49d03b19621fc4f456b318880e1e9496f9a14b8c9')" }}>
            <Card.Body>
              <Card.Title className='text-success shadow p-3 mb-5 bg-body rounded'>Portale</Card.Title>
              <Card.Text>
                visita il nostro portale per maggiori informazioni.

              </Card.Text>
            </Card.Body>
          </Card>
        </a>
      </div>

      <div className='portale bg-light text-dark p-3'>
        <h3 className='text-danger'>come funziona il portale</h3>
        <div className='d-flex justify-content-between'>
          <div className='d-flex flex-column align-items-start' style={{ marginRight: '10px' }}>
            <img style={{ width: '100%', height: '280px', objectFit: 'cover', objectPosition: 'center', borderRadius: '10px' }}
              src="https://static.vecteezy.com/system/resources/previews/002/923/747/original/global-network-connection-world-map-point-and-line-composition-concept-of-global-business-illustration-free-vector.jpg" alt="" />
            <p style={{ textOverflow: 'ellipsis' }}>
              Alcune funzionalità del sito possono richiedere la registrazione.<br /> Se scegli di registrarti, sei responsabile di mantenere la riservatezza delle tue informazioni di accesso.<br />
              Ci riserviamo il diritto di sospendere o chiudere il tuo account in qualsiasi momento per violazione di questi Termini.<br />
              I contenuti, i marchi e altri diritti di proprietà intellettuale presenti sul sito sono di nostra proprietà o concessi in licenza a noi.
            </p>
          </div>

          <div className='d-flex flex-column align-items-end' style={{ marginLeft: '10px' }}>
            <p>
              Alcune funzionalità del sito possono richiedere la registrazione.<br /> Se scegli di registrarti, sei responsabile di mantenere la riservatezza delle tue informazioni di accesso.<br />
              Ci riserviamo il diritto di sospendere o chiudere il tuo account in qualsiasi momento per violazione di questi Termini.<br />
              I contenuti, i marchi e altri diritti di proprietà intellettuale presenti sul sito sono di nostra proprietà o concessi in licenza a noi.
            </p>
            <img style={{ width: '100%', height: '280px', objectFit: 'cover', objectPosition: 'center', borderRadius: '10px' }}
              src="https://thumbs.dreamstime.com/b/rete-di-computer-comunicazione-internet-nel-fondo-tecnologia-rappresentazione-d-127354210.jpg" alt="" />
          </div>
        </div>


      </div>

      <div className='p-4 py-5 bg-dark' >
        <div className='pricing my-5' id='price'>
          <h4 className='text-danger'>choose your plan</h4>

          <div className='d-flex justify-content-center align-items-center gap-3'>

            <Card style={{ ...cardStyle, backgroundImage: "url('https://img.freepik.com/premium-vector/abstract-modern-background-with-lowpoly-triangle-element-vibrant-gradient-color_8221-1337.jpg?w=1060')" }}>
              <Card.Body className='p-4'>
                <Card.Title className='fw-bold' style={{ color: 'blue' }}>Free</Card.Title>
                <Card.Text style={{ fontWeight: 'bold', fontSize: '20px' }}>
                  €0/month
                </Card.Text >
                <Button variant="primary">Select</Button>
                <Card.Text >
                  always free
                  <ul>
                    <li>1 annuncio</li>
                    <li>1 foto</li>
                    <li>1 video</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>

            <Card style={{ ...cardStyle, backgroundImage: "url('https://img.freepik.com/free-vector/low-poly-background_1048-8516.jpg?w=900&t=st=1706866072~exp=1706866672~hmac=43adf3a988c1f313519204e41398f201e20f13cf9121ae70d5f3ecfeb65fa40f')" }}>
              <Card.Body className='p-3'>
                <Card.Title style={{ fontWeight: 'bold', color: 'coral' }}>Standard</Card.Title>
                <Card.Text style={{ fontWeight: 'bold', fontSize: '20px' }}>
                  €5.99/month
                </Card.Text>
                <Button variant="primary">Select</Button>
                <Card.Text style={{ margin: '10px' }} >
                  5 annunci
                  <ul>
                    <li>3 foto</li>
                    <li>5 video</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>

            <Card style={{ ...cardStyle, backgroundImage: "url('https://img.freepik.com/free-vector/light-green-shapes-green-background_23-2148358597.jpg?t=st=1706866122~exp=1706866722~hmac=b2a44f3c3ebb90c82c68cc1af293545e92de3f7715a0114bbb304a27ad0641d5')" }}>
              <Card.Body className='p-3'>
                <Card.Title className='fw-bold text-success'>Boost</Card.Title>
                <Card.Text style={{ fontWeight: 'bold', fontSize: '20px' }}>
                  €9.99/month
                </Card.Text>
                <Button variant="primary">Select</Button>
                <Card.Text style={{ margin: '10px' }}  >
                  10 annunci
                  <ul className=''>
                    <li>10 foto</li>
                    <li>10 video</li>
                  </ul>
                </Card.Text>
              </Card.Body>

            </Card>
          </div>
        </div>
      </div>

      <div className='condizione bg-light p-3'>
        <h3 className='text-danger'>condizioni di uso</h3>
        <p>
          Questo documento rappresenta le Condizioni d'Uso ("Termini") che regolano l'accesso e l'utilizzo del nostro sito web.<br /> Utilizzando questo sito web, accetti di essere vincolato dai seguenti Termini. Se non accetti questi Termini, ti preghiamo di non utilizzare il nostro sito.<br />
          Accetti di utilizzare il nostro sito solo per scopi leciti e conformi a questi Termini.

          Non è consentito utilizzare il sito per scopi illegali o in modo tale da violare leggi locali,<br /> nazionali o internazionali.
          Il contenuto del sito è fornito solo a scopo informativo. Non garantiamo l'accuratezza,<br /> la completezza o l'aggiornamento delle informazioni presentate.<br />

          Ci riserviamo il diritto di modificare o interrompere qualsiasi aspetto del sito in qualsiasi momento senza preavviso.
        </p>
      </div>

    </div>


  );
}

export default Home;
