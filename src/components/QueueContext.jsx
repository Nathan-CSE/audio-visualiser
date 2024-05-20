import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);         

  useEffect(() => {
    // query -> we get the queue information from the cloud database
    const q = query(collection(db, "queue"), orderBy("timestamp"));

    // Still confused by how this works -> when this is mounted, onSnapshot creates a listener 
    // that updates the state wheneevr there is a change in the queue collection
    // When the component unmounts, the real-time listener is detached, preventing memory leaks
    // and unnecessary updates 
    const detach = onSnapshot(q, (snapshot) => {
      const queueData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQueue(queueData);
    });

    return () => detach();
  }, []);

  const addToQueue = async (video) => {
    await addDoc(collection(db, "queue"), {
      id: uuidv4(),
      url: video.url,
      pos: queue.length + 1
    });

    console.log('this is video ', video);
    console.log('this is the queue 2, ', queue);
  };

  const removeFromQueue = async (id) => {
    const queueVid = doc(db, "queue", id);
    await deleteDoc(queueVid);
  };

  return (
    <QueueContext.Provider value={{ queue, addToQueue, removeFromQueue }}>
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => useContext(QueueContext);