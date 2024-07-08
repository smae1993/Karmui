import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsImage } from 'react-icons/bs';

export const ImageUpload = ({id, defaultImage}) => {
    const { t } = useTranslation();

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState(defaultImage)

    const fileInput = useRef();
    const selectFile = () => {
        fileInput.current.click();
    }

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(defaultImage)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    return (
        <div className='text-center flex justify-center'>
        <input type="file" id={id} style={{ "display": "none" }} ref={fileInput} onChange={onSelectFile} />
        {preview ? <img src={preview} style={{'width': "64px" , 'height' : "64px"}}  /> : <BsImage size={40} className="text-gray-600" style={{'padding': '5px'}}/>}

        {selectedFile == null ? <Button color='textColor' onClick={selectFile}>{t("selectImage")}</Button> : <div className='flex justify-center'>

        <Button className='mx-auto' color='error' onClick={() => setSelectedFile(undefined)}>{t("delete")} </Button>
        <Button color='textColor' onClick={selectFile}>{t("edit")}</Button>
            {/* <input type='file' onChange={onSelectFile} /> */}
            {/* {selectedFile &&   } */}
        </div>}
        </div>

    )
}
