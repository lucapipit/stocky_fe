import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import VerifyAccount from '../components/VerifyAccount';
import { useParams } from 'react-router';


const VerifyAccountPage = () => {
    const param = useParams()
    return (
        <MainLayout>
            <VerifyAccount param={param} />
        </MainLayout>
    )
}

export default VerifyAccountPage