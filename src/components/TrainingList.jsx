import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, Typography } from '@mui/material';
import { format } from 'date-fns'; // DATES
import api from '../data/api';

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]); 
  const [loading, setLoading] = useState(true);   
  const [searchTerm, setSearchTerm] = useState(''); 


  useEffect(() => {
    api.getTrainings().then((data) => {
      setTrainings(data); 
      setLoading(false);   // load state when we have data
    });
  }, []);

  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // filter
  const filteredTrainings = trainings.filter((training) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      training.activity.toLowerCase().includes(searchStr) ||
      (training.customer &&
        `${training.customer.firstname} ${training.customer.lastname}`.toLowerCase().includes(searchStr))
    );
  });

  // columns for DataGrid
  const columns = [
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      
      renderCell: (params) => {
        try {
          const date = new Date(params.row.date); 
          return format(date, 'dd.MM.yyyy HH:mm'); 
        } catch {
          return 'Invalid date'; 
        }
      },
    },
    { field: 'duration', headerName: 'Duration (min)', flex: 1 },
    { field: 'activity', headerName: 'Activity', flex: 1 },
    {
      field: 'customer',
      headerName: 'Customer',
      flex: 1,
     
      renderCell: (params) => {
        const customer = params.row?.customer;
        if (!customer) return 'N/A'; 
        return `${customer.firstname} ${customer.lastname}`; 
      },
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Trainings</Typography>

      
      <TextField
        label="Search Trainings"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch} // user write -> call function
      />

    
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredTrainings}  
          columns={columns}         
          loading={loading}         
          pageSize={5}              
          pageSizeOptions={[5, 10, 25]} 
          disableRowSelectionOnClick 
        />
      </Box>
    </Box>
  );
};

export default TrainingList;

