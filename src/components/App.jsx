import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import s from './App.module.css';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    largeImageURL: '',
    isLoading: false,
    showModal: false,
    hasMoreImages: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  onChangeQuery = (query) => {
    this.setState({ query, page: 1, images: [], hasMoreImages: true });
  };

  fetchImages = () => {
  const { query, page, images } = this.state;
  const apiKey = '42006022-41a20d969efbb704c546dcbcd';
  const baseUrl = 'https://pixabay.com/api/';
  const perPage = 12;

  this.setState({ isLoading: true });

  axios
    .get(
      `${baseUrl}?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
    .then((response) => {
      const newImages = response.data.hits;
      const totalImages = images.length + newImages.length;

      this.setState((prevState) => ({
        images: [...prevState.images, ...newImages],
        page: prevState.page + 1,
        isLoading: false,
        hasMoreImages: newImages.length === perPage && newImages.length > 0,
      }));

      setTimeout(() => {
        window.scrollBy({
          top: totalImages * 260,
          behavior: 'smooth',
        });
      }, 100);
    }) 
};


  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = (largeImageURL) => {
    this.setState({ largeImageURL });
    this.toggleModal();
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, hasMoreImages } = this.state;

    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && hasMoreImages && (
  <Button onClick={this.fetchImages} />
)}
        {showModal && <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />}
      </div>
    );
  }
}

export default App;