import * as React from 'react'
import {useDropzone} from 'react-dropzone'

interface IDropFileArea {
  onDropFile(file: File): void;
  children: any;
  accept?: string | string[];
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
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    onDropFile(acceptedFiles[0]);
  };
  const {getRootProps, getInputProps} = useDropzone({
    noKeyboard: true,
    noClick: true,
    maxFiles: 1,
    onDrop,
    accept,
  })

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
