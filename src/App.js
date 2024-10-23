import React, { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import axios from 'axios';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchContacts = () => {
    axios.get('https://mycontacts-fdc8fpefezbne9fp.canadacentral-01.azurewebsites.net/api/contacts')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the contacts!', error);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="App">
      <h1>Contact Manager</h1>
      <ContactForm
        fetchContacts={fetchContacts}
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
      />
      <ContactList
        contacts={contacts}
        fetchContacts={fetchContacts}
        setSelectedContact={setSelectedContact}
      />
    </div>
  );
}

export default App;
