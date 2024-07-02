import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Graphics/mainLogo.png'
import Container from 'react-bootstrap/Container';
import '../styles/navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogged } from '../states/loginState';
import { jwtDecode } from 'jwt-decode';
import { setIsHamMenuOpen } from '../states/generalState';
import { clearCategoriesProduct } from '../states/generalState';
import { clearAnnouncements } from '../states/storeState';
import { clearScore } from '../states/annScoreState';


const _Navbar = () => {
    const isHamMenuOpen = useSelector((state) => state.general.isHamMenuOpen);
    const isLogged = useSelector((state) => state.login.isLogged);
    const notifyStatus = useSelector((state) => state.chat.notifyStatus);
    const notifyCount = useSelector((state) => state.chat.notifyCount);
    const dispatch = useDispatch();
    const [decodedTkn, setDecodedTkn] = useState("");

    const logOut = () => {
        dispatch(setIsLogged(false));
        localStorage.clear();
        dispatch(clearAnnouncements());
        dispatch(clearScore());
        dispatch(setIsHamMenuOpen(!isHamMenuOpen))
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const tkn = jwtDecode(token, process.env.JWT_SECRET);
            setDecodedTkn(tkn);
            dispatch(setIsLogged(true))
        } else {
            setDecodedTkn("")
        }
    }, [isLogged])

    return (
        <>
            <div className='position-fixed w-100 myBgDark' expand="lg" style={{ zIndex: "9", height: "59px" }}>
                <Container >
                    <div className='d-flex align-items-center justify-content-between py-1' >
                        <div className='logo text-light myCursor'><Link to={"/"}><img className='m-2' src={Logo} onClick={() => { dispatch(setIsHamMenuOpen(false)) }} /></Link> <i>myStocker</i></div>
                        <div>
                            {isLogged && notifyCount && notifyCount > 0 ? <><i className="myChatColor me-1" >{notifyCount}</i><i className="bi bi-chat-dots-fill myChatColor" ></i></> : null}
                        </div>
                        <div className='d-flex align-items-center text-light'>
                            <div className='line-clampUserName'>{decodedTkn.email}</div>
                            <div className="myCursor"><i className={`bi ${decodedTkn.email ? "bi-person-circle" : "bi-grid-fill"} m-2`} onClick={() => dispatch(setIsHamMenuOpen(!isHamMenuOpen))} style={{ fontSize: "30px" }}></i></div>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="bg-transparent" style={{ height: "59px" }}>
                {/* This is my nabar spacer. It represents the navbar height. */}
            </div>
            {
                isHamMenuOpen ?

                    <div className='d-flex position-fixed justify-content-end hamMenu myBgDark position-absolute w-100 mt-5 pt-2 top-0 ' style={{ overflowY: "scroll", height: "calc(100vh - 0px)" }} >
                        <div className=' w-100' style={{ minHeight: "calc(100vh - 59px)" }}>

                            <div className='pb-5'>
                                <div >
                                    <ul className='pt-4 pe-4 text-end mb-0'>
                                        {
                                            !isLogged ?
                                                <div>
                                                    <Link to={"/login"}><li> <span onClick={() => { dispatch(setIsHamMenuOpen(!isHamMenuOpen)) }}>login</span> </li></Link>
                                                    <Link to={"/signin"}><li> <span onClick={() => { dispatch(setIsHamMenuOpen(!isHamMenuOpen)) }}>signin</span> </li></Link>
                                                </div> :
                                                <div>
                                                    <Link to={"/account"}><li> <span onClick={() => { dispatch(setIsHamMenuOpen(!isHamMenuOpen)) }}>Account</span> </li></Link>
                                                    <Link to={"/"}><li> <span onClick={logOut}>Logout</span> </li></Link>
                                                    <Link to={"/createannouncement"}><li> <span onClick={() => { dispatch(setIsHamMenuOpen(!isHamMenuOpen)); dispatch(clearCategoriesProduct()) }}>Form Announcement</span> </li></Link>
                                                    <Link to={"/pendingannouncements"}><li> <span onClick={() => { dispatch(setIsHamMenuOpen(!isHamMenuOpen)) }}>Pending Announcements</span> </li></Link>
                                                    <Link to={"/rejectedannouncements"}><li> <span onClick={() => { dispatch(setIsHamMenuOpen(!isHamMenuOpen)) }}>Rejected Announcements</span> </li></Link>
                                                    <Link to={"/contactus"}><li> <span onClick={() => { dispatch(setIsHamMenuOpen(!isHamMenuOpen)) }}>Contact Us</span> </li></Link>
                                                </div>
                                        }
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div> :
                    null
            }
        </>
    )
}

export default _Navbar