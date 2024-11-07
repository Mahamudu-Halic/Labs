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
 * Renders a list of images as thumbnails and attaches event listeners for carousel functionality.
 */
const renderImages = () => {
  // Iterate over the list of images
  images.forEach((img, index) => {
    // Create a new figure element to contain the thumbnail
    const figure = document.createElement("figure");
    figure.className = "thumbnail-item";

    // Set the inner HTML of the figure element to include the image and caption
    figure.innerHTML = `
            <img src="${img.imageUrl}" alt="${img.caption}" class="thumbnail"/>
            <figcaption class="caption">${img.caption}</figcaption>
        `;
    // Append the figure element to the thumbnail container
    thumbnailContainer.appendChild(figure);

    // Get a reference to the thumbnail image element
    const thumbnailItem = figure.querySelector(".thumbnail");

    // Attach an event listener to the thumbnail image to handle clicks
    thumbnailItem.addEventListener("click", () => {
      // Update the currentIndex to the index of the clicked image
      currentIndex = index;
      // Show the carousel container
      carousel.classList.add("active");
      // Update the carousel with the selected image
      renderCarousel();
    });
  });
};const renderImages = () => {
  images.forEach((img, index) => {
    const figure = document.createElement("figure");
    figure.className = "thumbnail-item";

    figure.innerHTML = `
            <img src="${img.imageUrl}" alt="${img.caption}" class="thumbnail"/>
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
