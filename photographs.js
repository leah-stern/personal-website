let currentPageMain = document.querySelector("main");

let data = {
    photos: [
            "https://res.cloudinary.com/dztbwjpaz/image/upload/v1769364434/IMG_9742_oqnv2x.jpg",
            "https://res.cloudinary.com/dztbwjpaz/image/upload/v1769364432/IMG_9751_otdltl.jpg",
            "https://res.cloudinary.com/dztbwjpaz/image/upload/v1769364433/IMG_0012_wcmt5b.jpg",
            "https://res.cloudinary.com/dztbwjpaz/image/upload/v1769364431/IMG_9770_zfzw1n.jpg",
            "https://res.cloudinary.com/dztbwjpaz/image/upload/v1769364424/IMG_5882_jbhz0n.jpg",
            "https://res.cloudinary.com/dztbwjpaz/image/upload/v1769364420/IMG_4089_csvfpn.jpg",
            "https://res.cloudinary.com/dztbwjpaz/image/upload/v1769364420/IMG_9068_miwigb.jpg",
            "https://res.cloudinary.com/dztbwjpaz/image/upload/v1769364412/IMG_8704_cpgoy1.jpg",
            "https://res.cloudinary.com/dztbwjpaz/image/upload/v1769364405/IMG_6928_szdj6p.jpg",
            "https://res.cloudinary.com/dztbwjpaz/image/upload/v1769364404/IMG_9994_kvcyeg.jpg"
    ]
}

let imageGallery = document.getElementById("all-photos");
displayAllPhotos();

// display all photographs in the photography window
function displayAllPhotos(photographyWindow) {
    data.photos.forEach((photoFilePath) => {
        let img = document.createElement("img");
        img.src = photoFilePath;
        imageGallery.appendChild(img);
    })
}

let galleryImages = document.querySelectorAll("#all-photos img");

// for each image in a gallery, add an event listener that displays
// a larger image and details
for (let i = 0; i < galleryImages.length; i++) {
    // current image
    let image = galleryImages[i];

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
};