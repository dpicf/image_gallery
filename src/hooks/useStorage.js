import {useState, useEffect} from 'react';
import {storage, firestore, timestamp} from '../firebase/config';

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        try {
            let filename = file.split('/').pop();
            const collectionRef = firestore.collection('images');
            fetch(file).then(res => {
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
        }
        catch {
            const storageRef = storage.ref(file.name);
            const collectionRef = firestore.collection('images');
            storageRef.put(file).on('state_changed', (snap) => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage);
            }, (err) => {
                setError(err);
            }, async () => {
                const url = await storageRef.getDownloadURL();
                const createdAt = timestamp();
                await collectionRef.add({url, createdAt});
                setUrl(url);
            });
        }

    }, [file]);

    return {progress, url, error};
}

export default useStorage;
