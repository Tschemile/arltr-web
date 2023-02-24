import 'react-image-crop/dist/ReactCrop.css';

import type { ChangeEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { Crop, PixelCrop } from 'react-image-crop';
import ReactCrop from 'react-image-crop';

import Rotate from '@/components/Icons/Rotate';
import ZoomIn from '@/components/Icons/ZoomIn';
import ZoomOut from '@/components/Icons/ZoomOut';

import Modal from '../Modal';
import { canvasPreview } from './CanvasPreview';

interface ICropImage {
  children: React.ReactNode;
  id: string;
  className?: string;
  callBack: (e: any) => void;
  type: 'AVATAR' | 'COVER';
}

function CropImage(props: ICropImage) {
  const {
    children,
    id = '',
    className = '',
    callBack = () => {},
    type = 'AVATAR',
  } = props;

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [sourceImg, setSourceImg] = useState('');
  const [sourceFile, setSourceFile] = useState<File>();
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && e.target.files[0]) {
      setSourceFile(e.target.files[0]);
      setShowModal(true);
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setSourceImg(reader.result?.toString() || '')
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const canvas = previewCanvasRef.current;
    const dataBlob = await new Promise<Blob | null>((resolve) => {
      if (canvas)
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(
              new File([blob], sourceFile?.name || '', {
                type: sourceFile?.type,
              })
            );
          }
        }, sourceFile?.type);
      else if (sourceFile) {
        resolve(sourceFile);
      }
    });
    if (dataBlob) {
      callBack(dataBlob);
      setShowModal(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => {
      return (async () => {
        if (
          completedCrop?.width &&
          completedCrop?.height &&
          imgRef.current &&
          previewCanvasRef.current
        ) {
          // We use canvasPreview as it's much faster than imgPreview.
          canvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            completedCrop,
            scale,
            rotate
          );
        }
      }).apply(undefined, []);
    }, 100);

    return () => {
      clearTimeout(t);
    };
  }, [completedCrop, scale, rotate]);

  useEffect(() => {
    if (sourceImg && showModal) {
      setCompletedCrop(undefined);
      setRotate(0);
      setScale(1);
    }
    return () => {
      setCompletedCrop(undefined);
      setRotate(0);
      setScale(1);
    };
  }, [sourceImg, showModal]);

  return (
    <>
      <label htmlFor={id} className={className}>
        {children}
      </label>
      <input
        id={id}
        type="file"
        accept=".jpg, .png, .jpeg"
        hidden
        onChange={handleUpload}
        onClick={(e) => {
          e.currentTarget.value = '';
        }}
      />
      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        content={
          <div className="flex flex-col space-y-4 transition-all">
            <div className="flex space-x-1">
              <label
                className="rounded py-1 px-2 text-sm ring-1 ring-black"
                htmlFor={id}
              >
                Change File
              </label>
              <button
                onClick={() => setScale(scale + 0.25)}
                className="disabled:opacity-50"
                disabled={scale === 5}
              >
                <ZoomIn />
              </button>
              <button
                onClick={() => setScale(scale - 0.25)}
                className="disabled:opacity-50"
                disabled={scale === 0.25}
              >
                <ZoomOut />
              </button>
              <button onClick={() => setRotate(rotate + 90)}>
                <Rotate />
              </button>
            </div>
            {!!sourceImg && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                circularCrop={type === 'AVATAR'}
                keepSelection
                minWidth={100}
              >
                <img
                  draggable={false}
                  ref={imgRef}
                  alt="crop-image"
                  src={sourceImg}
                  style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                />
              </ReactCrop>
            )}
            {!!completedCrop && (
              <>
                <p>After crop image</p>
                <div
                  className="m-auto flex items-center justify-center"
                  style={{
                    minHeight: sourceImg
                      ? (imgRef.current?.height || completedCrop.height * 2) / 2
                      : completedCrop.height,
                  }}
                >
                  <canvas
                    id="previewCanvas"
                    ref={previewCanvasRef}
                    className="border border-solid border-black object-contain"
                    style={{
                      width: completedCrop.width,
                      height: completedCrop.height,
                    }}
                  />
                </div>
              </>
            )}
          </div>
        }
      />
    </>
  );
}

export default CropImage;
