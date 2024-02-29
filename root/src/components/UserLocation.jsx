import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userLocationFunc } from '../states/userLocationState';

const UserLocationComponent = () => {
    const dispatch = useDispatch();
    const userLocation = useSelector((state) => state.userLocation.userLocation);
    const [userLocationState, setUserLocationState] = useState(userLocation);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(userLocationFunc())
            .then((res) => {
                setUserLocationState(res.payload);
                setLoading(false);
            })
            .catch((err) => {
                console.error('user location error', err);
            })
    }, [])

    return (
        <div>
            <h3>User Location</h3>
            <div>
                {loading ? <p>Loading...</p> : <p>{userLocationState}</p>}
            </div>
        </div>
    )
}


export default UserLocationComponent