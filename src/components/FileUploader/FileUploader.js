import React, { useRef, useState } from "react";

import "./fileUploader.css";
import { imageConfig } from "../../config/ImageConfig";
import uploadImg from "../../assets/cloud-upload-regular-240.png";
import axios from "axios";

const FileUploader = () => {
    const [fileList, setFileList] = useState(null);
    const dragAndDropRef = useRef(null);

    const onDragEnter = () => {
        dragAndDropRef.current.classList.add("dragover");
    };
    const onDragLeave = () => {
        dragAndDropRef.current.classList.remove("dragover");
    };
    const onDrop = () => {
        dragAndDropRef.current.classList.remove("dragover");
    };
    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            // const updatedFileList = [...fileList, newFile];
            setFileList(newFile);
            console.log(newFile);
        }
    };
    const removeFile = () => {
        // const updatedFileList = [...fileList];
        // updatedFileList.splice(fileList.indexOf(file), 1);
        setFileList(null);
    };

    const handleUpload = async () => {
        // const requestOptions = {
        //     method: "POST",
        //     headers: { "Content-Type": "multipart/form-data" },
        //     body: formData, // Also tried selectedFile
        // };

        if (fileList) {
            const formData = new FormData();
            formData.append("files", fileList);
            const res = await axios.post(
                "https://390c-102-156-50-210.eu.ngrok.io/api/detect",
                formData
            );

            console.log(res);
        }
        // console.log(formData.values);
    };
    return (
        <>
            <div
                ref={dragAndDropRef}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className="drag-and-drop-box"
            >
                <div className="drag-and-drop-logo">
                    <img src={uploadImg} alt="" />
                    <p>Drag &#38; Drop Files</p>
                </div>
                <input
                    type="file"
                    name="files"
                    value=""
                    onChange={onFileDrop}
                />
            </div>
            {fileList ? (
                <div className="files-preview">
                    <p className="files-preview__title">Ready to Upload</p>
                    {/* {fileList.map((item, index) => ( */}
                    <div
                        key={fileList.lastModified}
                        className="files-preview__item"
                    >
                        <img
                            src={
                                fileList.url
                                    ? fileList.url
                                    : URL.createObjectURL(fileList)
                            }
                            alt=""
                            className="file-thumbnail"
                        />
                        <div className="files-preview__item__info">
                            <p>{fileList.name}</p>
                            <p>{fileList.size} B</p>
                        </div>
                        <span
                            className="files-preview__item__delete"
                            onClick={removeFile}
                        >
                            x
                        </span>
                    </div>
                    {/* ))} */}
                </div>
            ) : null}
            <button onClick={handleUpload}>upload</button>
        </>
    );
};

export default FileUploader;
