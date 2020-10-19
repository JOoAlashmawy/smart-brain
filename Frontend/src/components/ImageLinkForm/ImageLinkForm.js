import React from 'react';
import './ImageLinkForm.css';
// import Tilt from 'react-tilt';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="ma4 mt0">
      <p className="center f3">
        {'This App will detect face in your pictures'}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="bare f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />{' '}
          {/*size=4 pading=2 width=70 center*/}
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple center"
            onClick={onButtonSubmit}
          >
            {/* w-70 grow f4 link ph3 pv2 dib white bg-light-purple */}
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
