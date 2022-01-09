import React, {useEffect} from 'react';
import useStorage from '../hooks/useStorage';
import {motion} from 'framer-motion';

const ProgressBar = ({file, setFile}) => {
    const {progress, url} = useStorage(file);

    useEffect(() => {
        if (url) {
            setFile(null);
        }
    }, [url, setFile]);

    return (
        <motion.div className="progressBar"
                    initial={{width: 0}}
                    animate={{width: progress + '%'}}
        />
    );
}

export default ProgressBar;