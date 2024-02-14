import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  await store.put({ value: content, id: 1 });
  await tx.done;

  console.log('Content added to DB');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  // create a connection to the text DB and version we want to use

  const jateDb = await openDB('jate', 1);
  // create a new transaction and specify the database and data privileges

  const tx = jateDb.transaction('jate', 'readonly');

  // open up the desired object store

  const store = tx.objectStore('jate');

  // use the .getAll() method to get all data in the database 

  const request = store.getAll();

  // get confirmation of the request 

  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
