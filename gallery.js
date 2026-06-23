// get main to add modal window to later
let currentPageMain = document.querySelector("main");

// get all images in the gallery
let galleryImages = document.querySelectorAll(".gallery img");

// tracks current image enlarged in modal window
let currentImageIndex = 0;

// for each image in a gallery, add an event listener that displays
// a larger image and details
for (let i = 0; i < galleryImages.length; i++) {
    // current image
    let image = galleryImages[i];

    // get current image src
    let currentImgSrc = image.src;

    // create modal on image click
    image.addEventListener("click", () => {
        // set currentImageIndex for image carousel to the index
        // for the image clicked on
        currentImageIndex = i;

        // check if there is currently a modal open and close it if so
        let checkForOpenModal = document.querySelector(".popup");
        if (checkForOpenModal) {
            checkForOpenModal.remove();
        }

        // create new modal
        let modal = document.createElement("div");
        modal.className = "popup";

        // add image to modal
        let image = document.createElement("img");
        image.src = currentImgSrc;

        // if landscape orientation, set width
        if (image.height < image.width) {
            image.width = "100%";
            image.style.maxWidth = "900px";
            image.height = "auto";
        } 
        // if portrait orientation, set height
        else {
            image.width = "auto";
            image.height = "100%";
            image.style.maxHeight = "600px";
        }

        modal.append(image);

        // add close button to modal
        let closeButton = document.createElement("button");
        closeButton.innerHTML = "X";
        closeButton.id = "close-popup-button";
        modal.append(closeButton);

        // flexbox div for forward and backward buttons
        let carouselNav = document.createElement("div");
        carouselNav.id = "carousel-nav-container";

        // add backward button to modal div
        let backwardButton = document.createElement("button");
        backwardButton.innerHTML = "<";

        // update image index to previous image if forward button clicked
        backwardButton.addEventListener("click", () => {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            image.src = galleryImages[currentImageIndex].src;
        });

        // add forward carousel button to modal div
        let forwardButton = document.createElement("button");
        forwardButton.innerHTML = ">";

        // update image index to next image if forward button clicked
        forwardButton.addEventListener("click", () => {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            image.src = galleryImages[currentImageIndex].src;
        });

        carouselNav.append(backwardButton, forwardButton);
        modal.append(carouselNav);

        closeButton.addEventListener("click", () => {
            modal.remove();
        });

        // click anywhere to close modal
        // commented out for now because it interferes with
        // image carousel button functionality
        // modal.addEventListener("click", () => {
        //     modal.remove();
        // });

        // add modal to main
        currentPageMain.append(modal);
    })
};