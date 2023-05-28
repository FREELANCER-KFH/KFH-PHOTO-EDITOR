document.addEventListener('DOMContentLoaded', () => {
    const inputImage = document.getElementById('inputImage');
    const applyButton = document.getElementById('applyButton');
    const saveButton = document.getElementById('saveButton');
    const imageContainer = document.getElementById('imageContainer');
  
    let currentImage = null;
  
    inputImage.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (readerEvent) => {
        const image = new Image();
        image.src = readerEvent.target.result;
  
        image.onload = () => {
          currentImage = image;
          imageContainer.innerHTML = '';
          imageContainer.appendChild(image);
          applyButton.disabled = false;
        };
      };
  
      reader.readAsDataURL(file);
    });
  
    applyButton.addEventListener('click', () => {
      if (currentImage) {
        const filter = document.getElementById('filterSelect').value;
        const newImage = applyFilter(currentImage, filter);
        imageContainer.innerHTML = '';
        imageContainer.appendChild(newImage);
        currentImage = newImage;
        if(filter !== 'none'){
            saveButton.disabled = false;
        }else{
            saveButton.disabled = true;
        }
      }
    });
  
    saveButton.addEventListener('click', () => {
      if (currentImage) {
        const link = document.createElement('a');
        link.href = currentImage.src;
        link.download = 'filtered_image.png';
        link.click();
      }
    });
  
    function applyFilter(image, filter) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
  
      context.drawImage(image, 0, 0);
  
      switch (filter) {
        case 'none':
          context.filter = 'none';
          break;
        case 'grayscale':
          context.filter = 'grayscale(100%)';
          break;
        case 'sepia':
          context.filter = 'sepia(100%)';
          break;
        case 'blur':
          context.filter = 'blur(5px)';
          break;
        case 'saturate':
          context.filter = 'saturate(200%)';
          break;
        case 'invert':
          context.filter = 'invert(100%)';
          break;
        case 'brightness':
          context.filter = 'brightness(150%)';
          break;
        case 'contrast':
          context.filter = 'contrast(200%)';
          break;
        default:
          context.filter = 'none';
          break;
      }
  
      context.drawImage(image, 0, 0);
  
      const newImage = new Image();
      newImage.src = canvas.toDataURL();
      return newImage;
    }
  });  