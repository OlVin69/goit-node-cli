const fs = require ('node:fs/promises');
const path = require('node:path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db/contacts.json');
 
async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      const  contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
      return [];
    }  
  }
  
  async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        return contacts.find(contact => contact.id === contactId) || null;
    } catch (error) {
        return null;
    }  
  }
  
  async function removeContact(contactId) {
    try {
      const contacts = await listContacts();
        const index = contacts.findIndex((contact)=> contact.id === contactId);
        if (index === -1) {
          return null;
        } 
        const deletedContact = contacts.splice(index, 1)[0];
        const updatedContacts = contacts.filter(contact => contact.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
        return deletedContact;
        
    } catch (error) {
      throw error;
    } 
      } 
    
  
  
  async function addContact(name, email, phone) {
    try {
      const contacts = await listContacts();
        const newContact = {id:uuidv4(), name, email, phone};
        const updatedContacts = [...contacts, newContact];
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
        return newContact;
    } catch (error) {
        return null;
    }
  }

  module.exports = { listContacts, getContactById, removeContact, addContact };