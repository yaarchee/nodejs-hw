import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts/contacts.js";
import program from "./utils/commander.js";

program.parse(process.argv);
const opt = program.opts();

function invokeAction() {
  if (opt.list) {
    listContacts();
    return;
  }
  if (opt.get) {
    getContactById(opt.get);
    return;
  }

  if (opt.remove) {
    removeContact(opt.remove);
    return;
  }
  if (opt.add && opt.name && opt.phone && opt.phone && opt.email) {
    addContact(opt.name, opt.email, opt.phone);
  }
}

invokeAction();
