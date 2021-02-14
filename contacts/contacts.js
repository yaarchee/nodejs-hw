import createDirnameAndFileName from "../utils/dirname.js";
import { readFile, writeFile } from "../utils/fs.js";
import uniqid from "uniqid";
import path from "path";

const { __filename, __dirname } = createDirnameAndFileName(import.meta.url);
const contactsPath = path.join(__dirname, "..", "./db/contacts.json");

console.log(contactsPath);

async function listContacts() {
  const data = await readFile(contactsPath);
  console.table(data);
}

async function getContactById(contactId) {
  const data = await readFile(contactsPath);
  const contact = data.find((obj) => String(obj.id) === contactId);
  if (!contact) {
    console.log("Контакт не найден");
  }

  console.log(contact);
}

async function removeContact(contactId) {
  const data = await readFile(contactsPath);
  const contacts = data.filter((obj) => String(obj.id) !== contactId);

  if (contacts.length === data.length) {
    console.log("Контакт не найден");
    return;
  }
  await writeFile(contactsPath, contacts);
  console.table(contacts);
}

async function addContact(name, email, phone) {
  const data = await readFile(contactsPath);
  data.push({ id: uniqid(), name, email, phone });
  await writeFile(contactsPath, data);
  console.table(data);
}

export { listContacts, getContactById, removeContact, addContact };
