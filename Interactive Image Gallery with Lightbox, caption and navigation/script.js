import { images } from "./mock-data.js";

const thumbnailContainer = document.getElementById("thumbnail-container");
const nextBtn = document.getElementById("next-btn");
const previousBtn = document.getElementById("previous-btn");
const closeBtn = document.getElementById("close-btn");

const image = document.getElementById("image");
const caption = document.getElementById("caption");
const carousel = document.getElementById("carousel");

let currentIndex = 0;

/**
 * Renders all the images in the gallery.
 * Creates a figure element for each image in the 'images' array and appends it to the
 * 'thumbnailContainer' element. The figure contains the image and its corresponding
 * caption. The image is also given an event listener for a click event, which sets
 * the current index to the index of the clicked image and renders the carousel.
 */
const renderImages = () => {
  images.forEach((img, index) => {
    const figure = document.createElement("figure");
    figure.className = "thumbnail-item";

    figure.innerHTML = `
            <img src="${img.thumbnailUrl}" alt="${img.caption}" class="thumbnail"/>
            <figcaption class="caption">${img.caption}</figcaption>
        `;
    thumbnailContainer.appendChild(figure);

    const thumbnailItem = figure.querySelector(".thumbnail");

    thumbnailItem.addEventListener("click", () => {
      currentIndex = index; // Set the currentIndex to the clicked image's currentIndex
      carousel.classList.add("active"); // Show the carousel container
      renderCarousel(); // Update the carousel with the selected image
    });
  });
};

/**
 * Updates the carousel display with the current image and caption based on `currentIndex`.
 * Adjusts the visibility of the previous and next buttons according to the position
 * in the image array. Disables the previous button if `currentIndex` is 0 (first image)
 * and disables the next button if `currentIndex` is the last image in the array.
 */
const renderCarousel = () => {
  // Disable previous/next buttons based on the currentIndex
  const imagesLength = images.length;
  previousBtn.style.visibility = currentIndex === 0 ? "hidden" : "";
  nextBtn.style.visibility =
    currentIndex === imagesLength - 1 ? "hidden" : "visible";

  image.src = images[currentIndex].imageUrl;
  caption.textContent = images[currentIndex].caption; // Update caption
};

// Event listeners for carousel functionality

nextBtn.addEventListener("click", () => {
  if (currentIndex < images.length - 1) {
    currentIndex += 1;
    renderCarousel();
  }
});

previousBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderCarousel();
  }
});

closeBtn.addEventListener("click", () => {
  carousel.classList.remove("active");
});

window.addEventListener("load", renderImages);
