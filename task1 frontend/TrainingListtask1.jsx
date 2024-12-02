import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5174/api/trainings')  
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(error => console.error('Error fetching trainings:', error));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Training Date</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map(training => (
            <tr key={training.id}>
              <td>{training.customerName}</td>
              <td>{dayjs(training.date).format('DD.MM.YYYY HH:mm')}</td>
              <td>{training.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainingList;
