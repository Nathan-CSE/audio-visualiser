import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

const QueueContext = createContext();

export const QueueProvider = ({ userId, children }) => {
  const [queue, setQueue] = useState([]);
  const queueCollectionRef = collection(db, `users/${userId}/videoQueue`);

  useEffect(() => {
    // query -> we get the queue information from the cloud database
    const q = query(queueCollectionRef, orderBy("position"));

    
    // Still confused by how this works -> when this is mounted, onSnapshot creates a listener 
    // that updates the state wheneevr there is a change in the queue collection
    // When the component unmounts, the real-time listener is detached, preventing memory leaks
    // and unnecessary updates 
    const detach = onSnapshot(q, (snapshot) => {
      const queueData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('snapshot ', snapshot);
      console.log('queue data ', queueData);
      setQueue(queueData);
    });

    return () => detach();
  }, []);

  const addToQueue = async (video) => {

    const position = queue.length ? queue[queue.length - 1].position + 1 : 1;
    await addDoc(queueCollectionRef, {
      youtubeUrl: video.url,
      position: position
    });

    // await addDoc(collection(db, "queue"), {
    //   id: uuidv4(),
    //   url: video.url,
    //   pos: queue.length + 1
    // });

    console.log('this is video ', video);
    console.log('this is the queue 2, ', queue);
  };

  const removeFromQueue = async (id) => {
    const queueVid = doc(db, `users/${userId}/videoQueue`, id);
    await deleteDoc(queueVid);
  };

  const updateQueue = async (id, newPosition) => {
    const queueVid = doc(db, `users/${userId}/videoQueue`, id);
    await updateDoc(queueVid, { position: newPosition });
  };

  return (
    <QueueContext.Provider value={{ queue, addToQueue, removeFromQueue, updateQueue }}>
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => useContext(QueueContext);