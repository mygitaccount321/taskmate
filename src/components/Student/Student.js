import React, { useState, useEffect  } from 'react';
import './Student.css';

const API_URL = 'http://localhost:8080';
export const Student = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        grade: '',
      });
    
      const [students, setStudents] = useState([]);

      const fetchStudents = async () => {
        try {
          const response = await fetch(`${API_URL}/students`);
          if (!response.ok) throw new Error('Network response was not ok1');
          const data = await response.json();
          setStudents(data);
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };

      // Handle input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      // Handle form submission
      const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      // Clear form data
      setFormData({
        name: '',
        age: '',
        grade: '',
      });
      // Fetch updated student list
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  // Fetch students when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);
    
      return (
        <div>
         
          <form onSubmit={handleSubmit}>
          <h2>Student Form</h2>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="grade">Grade:</label>
              <input
                type="text"
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>

          <h2>Saved Students</h2>
        
      {students.length === 0 ? (
        <p>No students saved yet.</p>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        </div>
      );
}
