import * as React from 'react'
import {useDropzone, DropzoneRef} from 'react-dropzone'

interface IDropFileArea {
  onDropFile(file: File): void;
  children: any;
  accept?: string | string[];
  dropzoneRef?: React.MutableRefObject<DropzoneRef | null>,
}

const fileDropAreaStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

const DropFileArea: React.FC<IDropFileArea> = ({
  onDropFile,
  children,
  accept,
  dropzoneRef,
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    onDropFile(acceptedFiles[0]);
  };
  const {getRootProps, getInputProps, open} = useDropzone({
    noKeyboard: true,
    noClick: true,
    maxFiles: 1,
    onDrop,
    accept,
  })

  if (dropzoneRef) {
    dropzoneRef.current = {open};
  }

  return (
    <div {...getRootProps({
        onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => event.stopPropagation(),
      })}
      style={fileDropAreaStyle}
    >
      <input {...getInputProps()} />
      { children }
    </div>
  )
}

export {
  DropFileArea
};
