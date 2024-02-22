import React, { Component } from 'react';
import s from './ImageGallery.module.css';

class ImageGalleryItem extends Component {
  render() {
    const { image, onClick } = this.props;

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
  }
}

export default ImageGalleryItem;
