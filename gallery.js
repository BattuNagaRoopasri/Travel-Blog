// Get all gallery images
const galleryImages = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentImageIndex = 0; // Track current image in the gallery

// Function to open the lightbox and display image
function openLightbox(index) {
    lightbox.style.display = 'block';
    currentImageIndex = index;
    lightboxImg.src = galleryImages[currentImageIndex].src;
}

// Function to close the lightbox
function closeLightbox() {
    lightbox.style.display = 'none';
}

// Event listeners to open images in lightbox
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
});

// Event listener to close the lightbox
closeBtn.addEventListener('click', closeLightbox);

// Function to go to the next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
}

// Function to go to the previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
}

// Event listeners for next and previous buttons
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Close the lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg && e.target !== nextBtn && e.target !== prevBtn) {
        closeLightbox();
    }
});