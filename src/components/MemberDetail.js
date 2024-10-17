import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Avatar, Box, CircularProgress } from '@mui/material';
import { getMemberDetail } from '../services/api';

const MemberDetail = () => {
  const { id } = useParams(); // Get the member ID from the URL parameters
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await getMemberDetail(id);
        setMember(response.data);
      } catch (error) {
        console.error('Error fetching member details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (!member) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Member not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Box display="flex" alignItems="center" marginBottom={2}>
          <Avatar src={member.picture} alt={member.name} style={{ width: '80px', height: '80px', marginRight: '20px' }} />
          <Typography variant="h4">{member.name}</Typography>
        </Box>
        <Typography variant="h6">Position: {member.position}</Typography>
      </Paper>
    </Container>
  );
};

export default MemberDetail;
