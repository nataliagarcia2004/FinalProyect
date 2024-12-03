import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [isAddingTraining, setIsAddingTraining] = useState(false);
  const [trainingData, setTrainingData] = useState({
    name: "",
    training: "",
    category: "",
    trainingDate: ""
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteTrainingId, setDeleteTrainingId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5174/api/trainings') 
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(error => console.error('Error fetching trainings:', error));
  }, []);

  const handleAddTraining = (e) => {
    e.preventDefault();
    const newTraining = { ...trainingData, id: Date.now() };
    setTrainings([...trainings, newTraining]);
    setIsAddingTraining(false);
    setTrainingData({
      name: "",
      training: "",
      category: "",
      trainingDate: ""
    });
  };

  const handleDeleteTraining = (id) => {
    setShowDeleteConfirmation(true);
    setDeleteTrainingId(id);
  };

  const confirmDeleteTraining = () => {
    if (deleteTrainingId !== null) {
      setTrainings(trainings.filter(training => training.id !== deleteTrainingId));
      setShowDeleteConfirmation(false);
    }
  };

  return (
    <div>
      <button onClick={() => setIsAddingTraining(true)}>Add Training</button>

      {isAddingTraining && (
        <form onSubmit={handleAddTraining}>
          <input
            type="text"
            placeholder="Training Name"
            value={trainingData.name}
            onChange={(e) => setTrainingData({ ...trainingData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Training Type"
            value={trainingData.training}
            onChange={(e) => setTrainingData({ ...trainingData, training: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={trainingData.category}
            onChange={(e) => setTrainingData({ ...trainingData, category: e.target.value })}
          />
          <DatePicker
            selected={new Date(trainingData.trainingDate)}
            onChange={(date) => setTrainingData({ ...trainingData, trainingDate: date })}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Training Date"
          />
          <button type="submit">Add Training</button>
        </form>
      )}

      {showDeleteConfirmation && (
        <div>
          <p>Are you sure you want to delete this training?</p>
          <button onClick={confirmDeleteTraining}>Yes</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Training Type</th>
            <th>Category</th>
            <th>Training Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map(training => (
            <tr key={training.id}>
              <td>{training.name}</td>
              <td>{training.training}</td>
              <td>{training.category}</td>
              <td>{dayjs(training.trainingDate).format('DD.MM.YYYY HH:mm')}</td>
              <td>
                <button onClick={() => handleDeleteTraining(training.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainingList;
