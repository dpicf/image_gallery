import React from 'react';
import useFirestore from '../hooks/useFirestore';
import {motion} from 'framer-motion';
import {firestore, storage} from "../firebase/config";

const ImageGrid = ({setSelectedImg}) => {
    const {docs} = useFirestore('images');

    function deleteImage(fileID, fileURL) {
        firestore.collection('images').doc(fileID).delete();
        storage.refFromURL(fileURL).delete();
    }

    return (
        <div className="grid">
            {docs && docs.map(doc => (
                <motion.div className="grid__imageWrap" key={doc.id}
                            layout
                            whileHover={{opacity: 1}} s
                >
                    <motion.img src={doc.url} alt="uploaded pic" className={"grid__image"}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{delay: 1}}
                                onClick={() => setSelectedImg(doc.url)}
                    />
                    <div title={"Delete"} className="grid__deleteImage" onClick={() => deleteImage(doc.id, doc.url)}>
                        <span>-</span>
                    </div>
                </motion.div>
            ))}
            <div className="grid__imageWrap"/>
        </div>
    )
};

export default ImageGrid;