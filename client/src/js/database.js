import { openDB } from 'idb';

const initdb = async () =>
  openDB('text', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('text')) {
        console.log('text database already exists');
        return;
      }
      db.createObjectStore('text', { keyPath: 'id', autoIncrement: true });
      console.log('text database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  const textDb = await openDB('text', 1);

  const tx = textDb.transaction('text', 'readwrite');

  const store = tx.objectStore('text');

  await store.put({ value: content, id: 1 });
  await tx.done;

  console.log('Content added to DB');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  // create a connection to the text DB and version we want to use

  const textDb = await openDB('text', 1);
  // create a new transaction and specify the database and data privileges

  const tx = textDb.transaction('text', 'readonly');

  // open up the desired object store

  const store = tx.objectStore('text');

  // use the .getAll() method to get all data in the database 

  const request = store.getAll();

  // get confirmation of the request 

  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
