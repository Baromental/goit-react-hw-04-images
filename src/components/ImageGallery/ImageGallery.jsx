import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  render() {
    const { images, onImageClick } = this.props;

    return (
      <ul className={s.gallery}>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} onClick={onImageClick} />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;