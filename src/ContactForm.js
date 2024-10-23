import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactForm = ({ fetchContacts, selectedContact, setSelectedContact }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (selectedContact) {
      setName(selectedContact.name);
      setPhoneNumber(selectedContact.phoneNumber);
    }
  }, [selectedContact]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedContact) {
      // Update contact
      const updatedContact = { ...selectedContact, name, phoneNumber };

      axios.put(`https://mycontacts-fdc8fpefezbne9fp.canadacentral-01.azurewebsites.net/api/Contacts/${selectedContact.contactId}`, updatedContact)
        .then(() => {
          console.log('Contact updated:', updatedContact);
          fetchContacts();
          resetForm();
        })
        .catch(error => {
          console.error('There was an error updating the contact!', error);
        });
    } else {
      // Add new contact
      const newContact = { name, phoneNumber };

      axios.post('https://mycontacts-fdc8fpefezbne9fp.canadacentral-01.azurewebsites.net/api/contacts', newContact)
        .then(() => {
          console.log('Contact added:', newContact);
          fetchContacts();
          resetForm();
        })
        .catch(error => {
          console.error('There was an error adding the contact!', error);
        });
    }
  };

  const resetForm = () => {
    setName('');
    setPhoneNumber('');
    setSelectedContact(null);
  };

  return (
    <div>
      <h2>{selectedContact ? 'Edit Contact' : 'Add New Contact'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">{selectedContact ? 'Update Contact' : 'Add Contact'}</button>
        {selectedContact && <button onClick={resetForm} type="button">Cancel</button>}
      </form>
    </div>
  );
};

export default ContactForm;
