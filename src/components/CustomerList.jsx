import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, Typography } from '@mui/material';
import api from '../data/api';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]); // for almacening customers
  const [loading, setLoading] = useState(true);   
  const [searchTerm, setSearchTerm] = useState(''); 

  //for data API
  useEffect(() => {
    api.getCustomers().then((data) => {
      setCustomers(data); 
      setLoading(false);   
    });
  }, []);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value); 
  };

  // filter
  const filteredCustomers = customers.filter((customer) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      customer.firstname.toLowerCase().includes(searchStr) ||
      customer.lastname.toLowerCase().includes(searchStr) ||
      customer.email.toLowerCase().includes(searchStr) ||
      customer.city.toLowerCase().includes(searchStr)
    );
  });

  // colums for DataGrid
  const columns = [
    { field: 'firstname', headerName: 'First Name', flex: 1 },
    { field: 'lastname', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'postcode', headerName: 'Postcode', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Customers</Typography>

      <TextField
        label="Search Customers"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch} 
      />

      
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredCustomers}  // Asign fil cust
          columns={columns}         // defin columns
          loading={loading}         
          pageSize={5}              // how many regist per page
          pageSizeOptions={[5, 10, 25]} // for changing regist per page
          disableRowSelectionOnClick 
        />
      </Box>
    </Box>
  );
};

export default CustomerList;
