const ContactsModel = require("../models/contacts.model");
const contactsModel = new ContactsModel;

class ContactsController {
    getAllContacts() {
        return contactsModel.getAllContacts();
    }

    getContactByID(contactId) {
        return contactsModel.getContactByID(contactId);
    }

    addNewContact(contactObj) {
        return contactsModel.addNewContact(contactObj);
    }

    updateContact(contactId, updateContactObj) {
        return contactsModel.updateContact(contactId, updateContactObj);
    }

    deleteContact(contactId) {
        return contactsModel.deleteContact(contactId);
    }
}

module.exports = ContactsController;