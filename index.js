console.log('First DB')
const yargs = require("yargs");
const {hideBin} = require("yargs/helpers")
// const { Command } = require('commander');
const contacts = require('./contacts');

// TODO: refactor
async  function invokeAction ({ action, id, name, email, phone}) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts)
      break;

    case "getById":
      const contact = await contacts.getContactById(id);
      console.table(contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name,email,phone);
      console.table(newContact);
      break;

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.table(deleteContact);
      break;

    case 'updateById':
        const updateContact = await contacts.updateContactById(id,{name,email});
        console.table(updateContact);
        break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction(argv);
// invokeAction({action:'list'});
// invokeAction({action:'getById',id:'vza2RIzNGIwutCVCs4mCL'});
// invokeAction({action:'add',name:'Ivan',email:'Ivan2015@mail.com',phone:'+2342029384'});
// invokeAction({action:'updateById',id:'vza2RIzNGIwutCVCs4mCL',name:'Yuliia',email:"yuliia1990@mail.com"});
// invokeAction({action:'remove',id:'vza2RIzNGIwutCVCs4mCL'});

// OR 

console.log(process.argv)
const arr = hideBin(process.argv);
const {argv} = yargs(arr);
invokeAction(argv)
