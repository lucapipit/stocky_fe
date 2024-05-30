import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import PsswChange from '../components/PsswChange';
import { useParams } from 'react-router';

const PsswChangePage = () => {
  const param = useParams();

  return (
    <MainLayout>
      <PsswChange param={param}/>
    </MainLayout>
  )
}

export default PsswChangePage