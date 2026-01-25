let currentPageMain = document.querySelector("main");
let galleryImages = document.querySelectorAll(".gallery img");

// for each image in a gallery, add an event listener that displays
// a larger image and details
galleryImages.forEach((image) => {
    // get current image src
    let currentImgSrc = image.src;

    // create modal on image click
    image.addEventListener("click", () => {
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

        // add backward and forward carousel buttons to div
        let backwardButton = document.createElement("button");
        backwardButton.innerHTML = "<";

        let forwardButton = document.createElement("button");
        forwardButton.innerHTML = ">";

        carouselNav.append(backwardButton, forwardButton);
        modal.append(carouselNav);

        closeButton.addEventListener("click", () => {
            modal.remove();
        });

        // click anywhere to close modal
        modal.addEventListener("click", () => {
            modal.remove();
        });

        // add modal to main
        currentPageMain.append(modal);
    })
});

galleryImages.forEach((image) => {
    // if image is landscape, have the image
    // span 2 columns in the gallery grid
    if (image.height < image.width) {
        image.style.gridColumn = "span 2";
    }

})