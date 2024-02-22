import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import s from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(true);

  useEffect(() => {
    if (query.trim() === '') return;

    fetchImages();
  }, [query]);

  const onChangeQuery = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setHasMoreImages(true);
  };

  const fetchImages = () => {
    const apiKey = '42006022-41a20d969efbb704c546dcbcd';
    const baseUrl = 'https://pixabay.com/api/';
    const perPage = 12;

    setIsLoading(true);

    axios
      .get(
        `${baseUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      )
      .then((response) => {
        const newImages = response.data.hits;
        const totalImages = images.length + newImages.length;

        setImages((prevImages) => [...prevImages, ...newImages]);
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
        setHasMoreImages(newImages.length === perPage && newImages.length > 0);

        setTimeout(() => {
          window.scrollBy({
            top: totalImages * 260,
            behavior: 'smooth',
          });
        }, 100);
      });
  };

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const openModal = (imageURL) => {
    setLargeImageURL(imageURL);
    toggleModal();
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={onChangeQuery} />
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && hasMoreImages && <Button onClick={fetchImages} />}
      {showModal && <Modal largeImageURL={largeImageURL} onClose={toggleModal} />}
    </div>
  );
};

export default App;
