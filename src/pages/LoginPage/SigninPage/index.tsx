import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';

const SignInPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post('/api/signin');
        localStorage.setItem('Authorization', response.data.data.authorization);
        setLoading(false);
        setTimeout(() => {
          navigate('/sns');
        }, 1000);
      } catch (error) {
        console.error('Error signing in:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <Container>
      {loading ? (
        <ClipLoader size={50} color={'#123abc'} loading={loading} />
      ) : (
        <ClipLoader size={50} color={'#123abc'} loading={loading} />
      )}
    </Container>
  );
};

export default SignInPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;
