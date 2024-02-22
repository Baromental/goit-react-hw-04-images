import React, { Component } from 'react';
import { Puff as LoaderSpinner } from 'react-loader-spinner';
import s from './Loader.module.css';


class Loader extends Component {
  render() {
    return (
      <div className={s.loader}>
        <LoaderSpinner type="Puff" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }
}

export default Loader;