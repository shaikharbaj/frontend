import ImageCompressor from 'image-compressor.js'
const compressWithQuality = (file, quality) => {
    return new Promise((resolve, reject) => {
      new ImageCompressor(file, {
        quality,
        success: (compressedFile) => {
          resolve(compressedFile);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  };

export default compressWithQuality;