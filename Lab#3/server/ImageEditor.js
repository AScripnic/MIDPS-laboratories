'use strict';

let Jimp = require('jimp');

module.exports = class ImageEditor {
  static resize(imageLink) {
    return new Promise((resolve, reject) => {
      Jimp.read(imageLink).then((image) => {
        let previewPath = imageLink.replace('.', '_preview.');

        image
          .resize(250, Jimp.AUTO)
          .quality(60)
          .write(previewPath, () => {
            return resolve(previewPath);
          });
      }).catch(reject);
    });
  }
};