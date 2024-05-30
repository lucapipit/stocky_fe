import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import PsswReset from '../components/PsswReset';
import { useParams } from 'react-router';

const PsswResetPage = () => {
    const param = useParams();
    return (
        <MainLayout>
            <PsswReset param={param}/>
        </MainLayout>
    )
}

export default PsswResetPage