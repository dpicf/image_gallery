import React, {useState} from 'react';
import ProgressBar from './ProgressBar';
import $ from 'jquery';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    function uploadImage(fileURL) {
        let extension = fileURL.split('.').pop();

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
        let fileDrop = [...e.dataTransfer.files][0];
        setFile(fileDrop);
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
                        <input type="text" className={"upload__input"} placeholder={"URL to image or .json. Or use Drag'n'Drop file on this field"}/>
                        <div title={"Upload"} className="upload__button"
                             onClick={() => uploadImage($(".upload__input").val())}>
                            <span>+</span>
                        </div>
                    </div>
                    <div className="upload__output">
                        {file && <ProgressBar file={file} setFile={setFile}/>}
                    </div>
                </div>
            }
        </div>
    );
}

export default UploadForm;