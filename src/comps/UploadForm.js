import React, {useState} from 'react';
import ProgressBar from './ProgressBar';
import $ from 'jquery';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    let types;

    function uploadImage(fileURL) {
        let extension = fileURL.split('.').pop();
        types = ['jpg', 'png', 'json'];

        if (types.includes(extension)) {
            if (extension !== 'json') {
                setFile(fileURL);
            } else {
                $.getJSON(fileURL, function (json) {
                    $.each(json["galleryImages"], function (key, value) {
                        $.each(value, function (key, value) {
                            if (key === "url") {
                                setFile(value);
                            }
                        });
                    });
                });
            }
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png, jpg or json)');
        }
    }

    const [drag, setDrag] = useState(false);
    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true)
    }
    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false)
    }
    function onDropHandler(e) {
        e.preventDefault()
        // console.log([...e.dataTransfer.files][0]);
        types = ['image/png', 'image/jpeg'];
        let fileDrop = [...e.dataTransfer.files][0];

        if (types.includes(fileDrop.type)) {
            setFile(fileDrop);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png or jpg)');
        }
        setDrag(false)
    }

    return (
        <div>
            {drag
                ? <div className={"dropArea"}
                       onDragStart={e => dragStartHandler(e)}
                       onDragLeave={e => dragLeaveHandler(e)}
                       onDragOver={e => dragStartHandler(e)}
                       onDrop={e => onDropHandler(e)}
                >drop to upload file</div>
                : <div className={"upload"}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                >
                    <div className={"upload__form"}>
                        <input type="text" className={"upload__input"} placeholder={"URL to image or .json. Or use Drag'n'Drop image on this field"}/>
                        <div title={"Upload"} className="upload__button"
                             onClick={() => uploadImage($(".upload__input").val())}>
                            <span>⇧</span>
                        </div>
                    </div>
                    <div className="upload__output">
                        { error && <div className="upload__error">{ error }</div>}
                        {file && <ProgressBar file={file} setFile={setFile}/>}
                    </div>
                </div>
            }
        </div>
    );
}

export default UploadForm;