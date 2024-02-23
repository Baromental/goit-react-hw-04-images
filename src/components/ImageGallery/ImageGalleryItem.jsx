import React from 'react';
import s from './ImageGallery.module.css';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={s.galleryItem}>
      <img
        src={image.webformatURL}
        alt=""
        onClick={() => onClick(image.largeImageURL)}
        className={s.image}
      />
    </li>
  );
};

export default ImageGalleryItem;
