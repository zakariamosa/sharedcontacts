import React from 'react';
import axios from 'axios';
import './App.css';

const ContactList = ({ contacts, fetchContacts, setSelectedContact }) => {
  
  const handleDelete = (contactId) => {
    axios.delete(`https://mycontacts-fdc8fpefezbne9fp.canadacentral-01.azurewebsites.net/api/contacts/${contactId}`)
      .then(() => {
        console.log(`Contact with id ${contactId} deleted`);
        fetchContacts();  // Fetch the updated list after deletion
      })
      .catch(error => {
        console.error('There was an error deleting the contact!', error);
      });
  };

  return (
    <div className="ContactList">
      <h2>Contact List</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.contactId}>
            <span>{contact.name} - {contact.phoneNumber}</span>
            <div className="contact-actions">
              <button onClick={() => handleDelete(contact.contactId)} className="delete-btn">
                Delete
              </button>
              <button onClick={() => setSelectedContact(contact)} className="edit-btn">
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;