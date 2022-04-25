const path = require("path");
const dataService = require("../services/data.service");
const { v4: uuid } = require("uuid");
const { resolve } = require("path");

const contactsPath = path.join(__dirname, "..", "data", "contacts.json");

class ContactsModel {

    getAllContacts() {
        return new Promise((resolve, reject) => {
            const contactsData = dataService.readDataFromDB(contactsPath);
            resolve(JSON.parse(contactsData))
        });
    }

    getContactByID(itemId) {
        return new Promise((resolve, reject) => {
            const data = JSON.parse(dataService.readDataFromDB(contactsPath));
            const foundItem = data.contacts.filter(item => item.id === itemId);

            if (foundItem) {
                resolve(foundItem);
            } else {
                reject({
                    message: "Error! Item not found!",
                });
            }
        });
    }

    addNewContact(contactObj) {
        return new Promise((resolve, reject) => {
            const contactsData = JSON.parse(dataService.readDataFromDB(contactsPath));
            const newContact = { id: uuid(), ...contactObj };
            contactsData.contacts.push(newContact);
            dataService.writeDataToDB(contactsPath, JSON.stringify(contactsData));

            resolve({
                message: "New contact added successfully!"
            })
        });
    }

    updateContact(contactId, updateContactObj) {
        return new Promise((resolve, reject) => {
            const contactsData = JSON.parse(dataService.readDataFromDB(contactsPath));
            contactsData.contacts.forEach(contact => {
                if (contact.id === contactId) {
                    contact.name = updateContactObj.name,
                        contact.phoneNumber = updateContactObj.phoneNumber,
                        contact.imgSrc = updateContactObj.imgSrc
                }
            }),

                dataService.writeDataToDB(contactsPath, JSON.stringify(contactsData));

            resolve({
                message: "Contact successfully updated!"
            });
        })
    }

    deleteContact(contactId) {
        return new Promise((resolve, reject) => {
            const contactsData = JSON.parse(dataService.readDataFromDB(contactsPath));

            const filteredContacts = contactsData.contacts.filter(contact => contact.id !== contactId);

            dataService.writeDataToDB(contactsPath, JSON.stringify(filteredContacts));

            resolve({ message: "Contact successfully deleted!" });
        });
    }
}

module.exports = ContactsModel;