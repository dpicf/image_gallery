import {useState, useEffect} from 'react';
import {storage, firestore, timestamp} from '../firebase/config';

const useStorage = (fileURL) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        // const storageRef = storage.ref(file.name);
        // const collectionRef = firestore.collection('images');
        // storageRef.put(file).on('state_changed', (snap) => {
        //     let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        //     setProgress(percentage);
        // }, (err) => {
        //     setError(err);
        // }, async () => {
        //     const url = await storageRef.getDownloadURL();
        //     const createdAt = timestamp();
        //     await collectionRef.add({url, createdAt});
        //     setUrl(url);
        // });

        let filename = fileURL.split('/').pop();
        const collectionRef = firestore.collection('images');

        fetch(fileURL).then(res => {
            return res.blob();
        }).then(blob => {
            storage.ref().child(filename).put(blob).then(function (snapshot) {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(percentage);
                return snapshot.ref.getDownloadURL()
            }).then(url => {
                const createdAt = timestamp();
                collectionRef.add({url, createdAt});
                setUrl(url);
            })
        }).catch(error => {
            setError(error);
        });

    }, [fileURL]);

    return {progress, url, error};
}

export default useStorage;
