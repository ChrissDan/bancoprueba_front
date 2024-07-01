// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function UserList(){
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      loadUsers();
    }, []);

    const loadUsers = async () => {
      try {
        const result = await axios.get("http://localhost:8080/bancoc/api/users");
        setUsers(result.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    const handleDelete = async (id) => {
      const confirmed = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
      if (confirmed) {
        try {
          await axios.delete(`http://localhost:8080/bancoc/api/users/eliminar/${id}`);
          alert('Usuario eliminado correctamente.');
          loadUsers(); // Recargar la lista de usuarios después de eliminar
        } catch (error) {
          console.error('Error al eliminar el usuario:', error);
          alert('Hubo un error al eliminar el usuario. Intente nuevamente.');
        }
      }
    };

    return (
      <div className="container mt-4">
        <div className='py-4'>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className='text-center'>Banco C</h1>
            <h2>Usuarios</h2>
            <button 
              className='btn btn-outline-secondary mx-2'
              onClick={() => navigate('/')}
            >
              Menu Principal
            </button>
            <button 
              className='btn btn-outline-danger mx-2'
              onClick={() => navigate('/admin')}
            >
              Retroceder
            </button>
          </div>
          <table className='table border shadow'>
            <thead>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Email</th>
                <th scope='col'>Contraseña</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index) => (
                  <tr key={index}>
                    <th scope='row'>{user.id}</th>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>
                      <Link className='btn btn-outline-primary mx-2' to={`/editUser/${user.id}`}>
                        Edit
                      </Link>
                      <button 
                      className='btn btn-danger mx-2'
                      onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
}
