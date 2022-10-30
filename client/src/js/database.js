import { openDB } from 'idb';

// initiates db
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: false });
      console.log('jate database created');
    },
  });

// Added logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {  
  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put( { id: 1, content: content } );
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Added logic for a method that gets all the content from the database
export const getDb = async () => {
  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('Data retrieved!');
  if (result.length > 0) {
    return result[0].content;
  } else {
    return '';
  };
};

initdb();
