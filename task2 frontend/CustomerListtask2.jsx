import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5174/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddOrEditCustomer = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedCustomers = customers.map(customer =>
        customer.id === currentCustomer.id ? currentCustomer : customer
      );
      setCustomers(updatedCustomers);
    } else {
      const newCustomer = { ...currentCustomer, id: Date.now() };
      setCustomers([...customers, newCustomer]);
    }
    setIsEditing(false);
    setCurrentCustomer(null);
  };

  const handleEditCustomer = (customer) => {
    setIsEditing(true);
    setCurrentCustomer(customer);
  };

  const handleDeleteCustomer = (id) => {
    setShowDeleteConfirmation(true);
    setDeleteCustomerId(id);
  };

  const confirmDeleteCustomer = () => {
    if (deleteCustomerId !== null) {
      setCustomers(customers.filter(customer => customer.id !== deleteCustomerId));
      setShowDeleteConfirmation(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search customers..."
        value={search}
        onChange={handleSearch}
      />
      <form onSubmit={handleAddOrEditCustomer}>
        <input
          type="text"
          placeholder="Name"
          value={currentCustomer?.name || ""}
          onChange={(e) => setCurrentCustomer({ ...currentCustomer, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Training"
          value={currentCustomer?.training || ""}
          onChange={(e) => setCurrentCustomer({ ...currentCustomer, training: e.target.value })}
        />
        <DatePicker
          selected={currentCustomer?.trainingDate || null}
          onChange={(date) => setCurrentCustomer({ ...currentCustomer, trainingDate: date })}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select Training Date"
        />
        <button type="submit">{isEditing ? "Update" : "Add"} Customer</button>
      </form>

      {showDeleteConfirmation && (
        <div>
          <p>Are you sure you want to delete this customer?</p>
          <button onClick={confirmDeleteCustomer}>Yes</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Training</th>
            <th>Training Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.training}</td>
              <td>{customer.trainingDate ? customer.trainingDate.toLocaleDateString() : ''}</td>
              <td>
                <button onClick={() => handleEditCustomer(customer)}>Edit</button>
                <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
