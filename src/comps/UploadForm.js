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
    };

    return (
        <div className={"upload"}>
            <div className={"upload__form"}>
                <input type="text" className={"upload__input"} placeholder={"URL to image or .json"}/>
                <div title={"Upload"} className="upload__button" onClick={() => uploadImage($(".upload__input").val())}>
                    <span>+</span>
                </div>
            </div>

            <div className="upload__output">
                {file && <ProgressBar file={file} setFile={setFile}/>}
            </div>
        </div>
    );
}

export default UploadForm;