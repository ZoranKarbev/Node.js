const router = require("express").Router();
const ContactsController = require("../controllers/contacts.controller");
const contactsController = new ContactsController;

router.get("/:id?", (req, res) => {

    if (req.params && req.params.id) {
        const contactId = req.params.id;
        contactsController.getContactByID(contactId)
            .then(contact => {
                res.status(200).json(contact);
            })
            .catch(error => {
                res.status(404).json(error);
            });
    } else {
        contactsController.getAllContacts()

            .then(contacts => {
                res.status(200).json(contacts);
            })
            .catch(error => {
                res.status(400).json(error);
            });
    }
});

router.post("/add", (req, res) => {
    const newContact = req.body;
    contactsController.addNewContact(newContact)
        .then((response) => res.status(201).json(response))
        .catch(error => res.status(400).json(error));
});

router.put("/:id/update", (req, res) => {
    const contactId = req.params.id;
    const updates = req.body;

    if (updates) {
        contactsController.updateContact(contactId, updates)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json(error));
    } else {
        res.status(400).json({ message: "No request body found!" });
    }
})

router.delete("/:id?", (req, res) => {
    const contactId = req.params.id;
    if (!id) {
        res.status(400).json({ message: "No such contact in database!" });
    }
    contactsController.deleteContact(contactId)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(400).json(error));
})

module.exports = router;