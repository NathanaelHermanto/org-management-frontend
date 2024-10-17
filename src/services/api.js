import axios from 'axios'

const API_URL = 'http://localhost:8080/api';

export const login = (credentials) => axios.post(`${API_URL}/auth/login`, credentials);
export const register = (user) => axios.post(`${API_URL}/auth/register`, user);

export const getMembers = async (params) => {
  
    const response = await axios.get(`${API_URL}/members`, {
      params,
    });
  
    return response.data;
  };

export const searchMembersByName = async (params) => {
    try {
        const response = await axios.get(`${API_URL}/members/search`, {
            params,
        });
        return response.data;
    } catch (error) {
        console.error('Error searching members:', error);
        throw error;
    }
};
  
export const addMember = async (member) => {
    const response = await axios.post(`${API_URL}/members`, member, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const getMemberDetail = (id) => axios.get(`${API_URL}/members/${id}`);