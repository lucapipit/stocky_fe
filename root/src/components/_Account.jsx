import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUserFunc } from '../states/loginState';
import { getAllAnnouncementsByIdOwnerFunc, getAnnouncementsByIdFunc } from '../states/storeState';
import { jwtDecode } from 'jwt-decode';
import CardPenRejAnnouncementReduced from './CardPenRejAnnouncementReduced';
import CardPenRejAnnouncementLine from './CardPenRejAnnouncementLine';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { verifyMailFunc } from '../states/signinState';
import CategoriesPreferences from './CategoriesPreferences';
import AccountEditAnagraphic from './AccountEditAnagraphic';
import { setIsLogged } from '../states/loginState';
import { useNavigate } from 'react-router';
import { getUserOutletFunc } from '../states/outletStore';
import CardFavouritesAnnouncement from './CardFavouritesAnnouncement';
import CardChatAnnouncement from './CardChatAnnouncement';
import ChatAnnouncement from './ChatAnnouncement';
import { getAllChatsNotifyFunc } from '../states/chatState';


const _Account = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.login.userData);
  const allUserAnnouncements = useSelector((state) => state.myStore.allData);
  const isLoading = useSelector((state) => state.myStore.isLoading);
  const loading = useSelector((state) => state.signin.loading);
  const outletData = useSelector((state) => state.myStore.outletData);
  const myChatState = useSelector((state) => state.chat.myChatState);
  const [dcdTkn, setDcdTkn] = useState("");
  const [isResended, setIsResended] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [typeOfView, setTypeOfView] = useState(0);
  const [typeSubMenu, setTypeSubMenu] = useState(0);
  const [isFavouritesChat, setIsFavouritesChat] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  const [openChat, setOpenChat] = useState(false);
  const [idChat, setIdChat] = useState(null);

  const [isEditingAnagraphic, setIsEditingAnagraphic] = useState(false);
  const chatRef = useRef()

  const token = localStorage.getItem("token");



  useEffect(() => {

    if (token) {
      const tkn = jwtDecode(token, process.env.JWT_SECRET);
      setDcdTkn(tkn)
      dispatch(getSingleUserFunc({ id: tkn.id, token: token }));
      dispatch(getAllAnnouncementsByIdOwnerFunc({ idOwner: tkn.id, token: token }))
        .then((res) => {
          if (res.payload.statusCode === 408) {
            dispatch(setIsLogged(false));
            navigate('/login');
            localStorage.clear()
          }
        });
      dispatch(getUserOutletFunc({ idOwner: tkn.id, token: token }))
        .then((res) => {
          if (res.payload.status !== 408 && res.payload.data.length > 0 && res.payload.data[0].outletLikes) {
            dispatch(getAnnouncementsByIdFunc({ idSet: res.payload.data[0].outletLikes, token: token }));
            dispatch(getAllChatsNotifyFunc(res.payload.data[0].outletLikes))
          }
        })
    }
  }, [])


  const resendVerification = () => {
    dispatch(verifyMailFunc({ email: userData[0].email, companyName: userData[0].companyName, verifyCode: `${userData[0].id}-${userData[0].verifyCode}` }))
      .then((res) => {
        if (res.payload.statusCode === 200) {
          setIsResended(true)
        } else {
          setErrorMessage(res.payload.message)
        }
      })
  };

  const triggerHolding = () => {
    setTimeout(() => {
      setIsResended(false);
    }, "30000")
  };

  useEffect(() => {
    setTypeSubMenu(myChatState.typeSubMenu)
  }, [myChatState]);

  useEffect(() => {
    if(openChat || typeSubMenu === 2){
      chatRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [openChat, typeSubMenu])



  return (
    <div>

      {
        userData && userData.length > 0 ?
          <div className='position-relative'>


            <div>
              <h1 className='fw-light text-center pt-5'><i className="bi bi-person-circle"></i> Account</h1>

              <div className='d-flex align-items-center justify-content-center my-5'>
                <div className='border rounded-5 p-5 myMainGradient text-light shadow'>

                  <div className='position-relative'>
                    <div className='position-absolute bg-dark border activeUserIcon d-flex align-items-center justify-content-center'>
                      {
                        userData[0].accountActive ?
                          <i className="bi bi-person-check-fill text-info"></i>
                          : <i className="bi bi-person-fill-exclamation text-danger"></i>
                      }
                    </div>
                  </div>

                  {
                    isEditingAnagraphic ?
                      <AccountEditAnagraphic userData={userData[0]} />
                      : <h2>{userData[0].companyName}</h2>
                  }
                  <hr />
                  <div className={userData[0].manufacturer ? "text-info" : "text-success"}><i className="bi bi-person-vcard-fill me-2"></i>{userData[0].manufacturer ? "Manufacturer" : "Dealer"}</div>
                  <p className='mt-3'><i className="bi bi-envelope-at-fill me-2"></i><i>{userData[0].email}</i></p>
                  <div className='my-3'>
                    <p><i className="bi bi-geo-alt-fill me-2"></i>{`${userData[0].address[0].toUpperCase()}${userData[0].address.slice(1)}, ${userData[0].streetNumber} (${userData[0].zipCode}) - ${userData[0].city} (${userData[0].state}) - ${userData[0].country} `}</p>
                  </div>
                  <p><i className="bi bi-telephone-fill me-2"></i>{userData[0].phone}</p>

                  <i className='bi bi-pencil-fill text-light myCursor' onClick={() => setIsEditingAnagraphic(!isEditingAnagraphic)}></i>
                </div>

              </div>

              {
                userData[0].accountActive ?
                  null
                  :
                  <div className='d-flex justify-content-center'>
                    <div className='bg-danger text-light myMaxW700 p-3 pt-4 text-center'>
                      <div>
                        You account is not active. To get into the Outlet Store and to use myStocker services the account must be activated. Click on the "Resend" button below to send another verification mail. Inside the email you will receive (in at least some minutes) there is a link, please click on it to activate your account.
                      </div>
                      {/* resending verification mail logic */}
                      <Button className='mt-3' disabled={isResended && !errorMessage ? true : false} variant="dark" onClick={() => { resendVerification(); triggerHolding() }}>
                        {
                          loading ?
                            <i>Sending <Spinner className='ms-1' animation="grow" size="sm" /></i>
                            : isResended && !errorMessage ?
                              <i class="bi bi-send-check-fill text-success"> Resended</i>
                              :
                              !isResended && !errorMessage ?
                                <i className="bi bi-send-fill"> Resend</i>
                                : <i className="bi bi-send-x-fill text-danger"> Not sended</i>
                        }
                      </Button>

                      {
                        isResended ?
                          <div>
                            <div className='mt-3 text-dark fw-bold'><i>check your email <Spinner className='ms-1' animation="grow" size="sm" /></i></div>
                            <div className='w-100 px-5 mt-2'>
                              <p className='text-light mb-1'>next try in:</p>
                              <div className='border rounded mx-3'>
                                <div className={`bg-light rounded ${isResended ? "percentageBar2" : null}`} style={{ height: "6px" }}></div>
                              </div>
                            </div>
                          </div>
                          : null
                      }


                      {isResended ? <h6 className='mt-3'>* If you dont receive any email check out first if your email is correct.</h6> : null}
                    </div>
                  </div>
              }

              {
                errorMessage ?
                  <div className='d-flex justify-content-center mt-3'>
                    <div className='bg-danger text-light myMaxW700 p-3 pt-0 text-center'>
                      <div className='fw-bold'>Reason why the email has not been sended: </div>
                      {errorMessage}
                    </div>
                  </div>
                  : null
              }

              {
                <CategoriesPreferences userData={userData[0]} />
              }
              <div className='d-flex justify-content-center align-items-start gap-5 mt-5 pb-4'>
                <div className='d-flex flex-column align-items-center position-relative'>
                  <i class={`bi bi-heart-fill myFucsiaRed display-6 myCursor`} onClick={() => setTypeSubMenu(0)}></i>
                  {typeSubMenu === 0 ? <i class="bi bi-caret-up-fill display-5 myFucsiaRed position-absolute favourites-announcementArrow" ></i> : null}
                </div>
                <div className='d-flex flex-column align-items-center position-relative'>
                  <i class={`bi bi-chat-heart-fill display-6 myChatColor myCursor`} onClick={() => setTypeSubMenu(2)}></i>
                  {typeSubMenu === 2 ? <i class="bi bi-caret-up-fill display-5 myChatColor position-absolute favourites-announcementArrow" ></i> : null}
                </div>
                <div className='d-flex flex-column align-items-center position-relative'>
                  <i class={`bi bi-megaphone-fill display-6 myPrimaryColor myCursor`} onClick={() => setTypeSubMenu(1)}></i>
                  {typeSubMenu === 1 ? <i class="bi bi-caret-up-fill display-5 myPrimaryColor position-absolute favourites-announcementArrow" ></i> : null}
                </div>
              </div>

            </div>



            {
              typeSubMenu === 0 ?
                <div>{/* FAVOURITES */}
                  <div className='mb-3 text-center'> <span className='myBgFucsiaRed text-light display-6 fw-light px-4 py-1 rounded-5'>My Favourites</span></div>
                  <div className='d-flex flex-wrap justify-content-center align-items-center my-5 px-1'>
                    {
                      outletData && outletData.map((el) => {
                        return <CardFavouritesAnnouncement singleData={el} isLoading={isLoading} />
                      })
                    }
                  </div>
                </div>
                : typeSubMenu === 1 ?
                  <div> {/* ANNOUNCEMENT */}
                    {
                      allUserAnnouncements && allUserAnnouncements.length !== 0 ?
                        <div>
                          <div className='mb-3 text-center'> <span className='myBgPrimary text-light display-6 fw-light px-4 py-1 rounded-5'>Announcements</span></div>

                          <div className='d-flex justify-content-center align-items-center gap-2 mt-5' style={{ fontSize: "1.5rem" }}>
                            <div className={`myCursor border p-2 py-1 ${typeOfView === 0 ? "bg-dark text-light" : ""} rounded-1`} onClick={() => setTypeOfView(0)}><i className="bi bi-columns-gap myCursor"></i></div>
                            <div className={`myCursor border p-2 py-1 ${typeOfView === 1 ? "bg-dark text-light" : ""} rounded-1`} onClick={() => setTypeOfView(1)}><i className="bi bi-list-task myCursor"></i></div>
                          </div>

                          <div className='d-flex align-items-center justify-content-center mt-3'>
                            <div>{allUserAnnouncements.length} announcements</div>
                          </div>

                          <div className='d-flex flex-wrap justify-content-center align-items-center my-5 px-1'>
                            {
                              allUserAnnouncements && allUserAnnouncements.map((el) => {
                                if (typeOfView === 0) {
                                  return <CardPenRejAnnouncementReduced singleData={el} isLoading={isLoading} />
                                } else {
                                  return <CardPenRejAnnouncementLine singleData={el} isLoading={isLoading} />
                                }
                              })
                            }
                          </div>
                        </div>
                        : null
                    }
                  </div>
                  :
                  <div ref={chatRef}>{/* CHAT */}
                    <div className='mb-3 text-center'> <span className='myBgChat text-light display-6 fw-light px-4 py-1 rounded-5'>Chat</span></div>

                    <div className='d-flex justify-content-center gap-3 my-5'>
                      <span className={`${isFavouritesChat ? "myBgFucsiaRed" : "bg-secondary"}  text-light myCursor p-1 px-3 rounded-5`} onClick={() => setIsFavouritesChat(true)}>Favourites</span>
                      <span className={`${!isFavouritesChat ? "myBgPrimary" : "bg-secondary"}  text-light myCursor p-1 px-3 rounded-5`} onClick={() => setIsFavouritesChat(false)}>My Announcements</span>
                    </div>
                    <hr className='mb-0' />

                    {
                      width < 1100 ? //CHAT MOBILE VERSION
                        <div className='d-flex myVhChat'>
                          {
                            isFavouritesChat ?
                              <div className='d-flex align-items-center flex-column w-100'>
                                {
                                  outletData && outletData.map((el) => {//FAVOURITE CHAT
                                    if (openChat && el.id === idChat) {
                                      return <div className=' position-relative bg-light border d-flex justify-content-center' >
                                        <i className="bi bi-chevron-left position-absolute start-0 ms-2 mt-4 pt-2 mx-1 myCursor display-6" onClick={() => { setOpenChat(false); setIdChat(null) }}></i>
                                        <ChatAnnouncement singleData={el} isLoading={isLoading} idOwn={dcdTkn.id} width={width} />
                                      </div>
                                    } if (!openChat) {
                                      return <div className='w-100 d-flex justify-content-center' onClick={() => { setOpenChat(true); setIdChat(el.id) }}>
                                        <CardChatAnnouncement idOwn={dcdTkn.id} singleData={el} isLoading={isLoading} />
                                      </div>
                                    }
                                  })
                                }
                              </div>
                              :
                              <div className='d-flex align-items-center flex-column w-100'>
                                {
                                  allUserAnnouncements && allUserAnnouncements.map((el) => {//ANNOUNCEMENT CHAT
                                    if (openChat && el.id === idChat) {
                                      return <div className=' position-relative bg-light border d-flex justify-content-center' >
                                        <i className="bi bi-chevron-left position-absolute start-0 ms-2 mt-4 pt-2 mx-1 myCursor display-6" onClick={() => { setOpenChat(false); setIdChat(null) }}></i>
                                        <ChatAnnouncement singleData={el} isLoading={isLoading} idOwn={dcdTkn.id} width={width} />
                                      </div>
                                    } if (!openChat) {
                                      return <div className='w-100 d-flex justify-content-center' onClick={() => { setOpenChat(true); setIdChat(el.id) }}>
                                        <CardChatAnnouncement idOwn={dcdTkn.id} singleData={el} isLoading={isLoading} />
                                      </div>
                                    }
                                  })
                                }
                              </div>
                          }

                        </div>
                        : null
                    }


                    {
                      width >= 1100 ? //CHAT DESKTOP VERSION
                        <div>
                          {
                            isFavouritesChat ?
                              <>
                                <div className='d-flex myVhChat'>
                                  <div className='d-flex align-items-center flex-column myOverflowY' style={{ minWidth: "400px", maxWidth: "700px" }}>
                                    {
                                      outletData && outletData.map((el) => {//FAVOURITE CHAT

                                        return <div className={`w-100 d-flex justify-content-center ${idChat === el.id ? "myBgLightGray" : ""}`} onClick={() => { setOpenChat(true); setIdChat(el.id) }}>
                                          <CardChatAnnouncement idOwn={dcdTkn.id} singleData={el} isLoading={isLoading} />
                                        </div>

                                      })
                                    }
                                  </div>
                                  <div className='w-100'>
                                    {
                                      outletData && outletData.map((el) => {
                                        if (openChat && el.id === idChat) {
                                          return <div className=' position-relative bg-light border d-flex justify-content-center' >
                                            <i className="bi bi-chevron-left position-absolute start-0 ms-2 mt-4 pt-2 mx-1 myCursor display-6" onClick={() => { setOpenChat(false); setIdChat(null) }}></i>
                                            <ChatAnnouncement singleData={el} isLoading={isLoading} idOwn={dcdTkn.id} width={width} />
                                          </div>
                                        }
                                      })
                                    }
                                  </div>
                                </div>
                              </>
                              :
                              <>
                                <div className='d-flex myVhChat'>
                                  <div className='d-flex align-items-center flex-column myOverflowY' style={{ minWidth: "400px", maxWidth: "700px" }}>
                                    {
                                      allUserAnnouncements && allUserAnnouncements.map((el) => {//ANNOUNCEMENT CHAT

                                        return <div className={`w-100 d-flex justify-content-center ${idChat === el.id ? "myBgLightGray" : ""}`} onClick={() => { setOpenChat(true); setIdChat(el.id) }}>
                                          <CardChatAnnouncement idOwn={dcdTkn.id} singleData={el} isLoading={isLoading} />
                                        </div>

                                      })
                                    }
                                  </div>
                                  <div className='w-100'>
                                    {
                                      allUserAnnouncements && allUserAnnouncements.map((el) => {
                                        if (openChat && el.id === idChat) {
                                          return <div className=' position-relative bg-light border d-flex justify-content-center' >
                                            <i className="bi bi-chevron-left position-absolute start-0 ms-2 mt-4 pt-2 mx-1 myCursor display-6" onClick={() => { setOpenChat(false); setIdChat(null) }}></i>
                                            <ChatAnnouncement singleData={el} isLoading={isLoading} idOwn={dcdTkn.id} width={width} />
                                          </div>
                                        }
                                      })
                                    }
                                  </div>
                                </div>
                              </>
                          }
                        </div>
                        : null
                    }



                  </div>
            }

          </div>
          :
          <div className='w-100 d-flex align-items-center justify-content-center' style={{ height: "100vh" }}>
            <Spinner animation="border" variant='dark' />
          </div>
      }
    </div >
  )

}

export default _Account