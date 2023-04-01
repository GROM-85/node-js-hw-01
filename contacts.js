 const {nanoid} = require('nanoid');
const fs = require('fs/promises');
const path = require('path')


const contactsPath = path.join(__dirname,'db/contacts.json');
const updateContacts = async (contacts) => await fs.writeFile(contactsPath,JSON.stringify(contacts,null,2))


// TODO: document each function
 async function listContacts () {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  };
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    return contact || null;
  };

  async function updateContactById(id, body){
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id )
    if(index === -1) return null;
    contacts[index] = {id,...body};
    await updateContacts(contacts);
    return contacts[index];

  };
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId )
    if(index === -1) return null;

    const result = contacts.splice(index,1);
    await updateContacts(contacts);
    return result;
    
  };
  
  async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id:nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    updateContacts(contacts);
    return newContact;
  };

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById,
  }