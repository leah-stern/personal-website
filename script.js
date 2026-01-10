let currentPageMain = document.querySelector("main");
let galleryFigures = document.querySelectorAll(".gallery figure");

// for each image in a gallery, add an event listener that displays
// a larger image and details
galleryFigures.forEach((figure) => {
    // get current image src
    let currentImgSrc = figure.children[0].src;
    let currentImgCaption = figure.children[1].innerText;

    // create modal on figure click
    figure.addEventListener("click", () => {
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
        modal.append(image);

        // add description to modal
        let description = document.createElement("p");
        description.innerText = currentImgCaption;
        modal.append(description);

        // add button to modal
        let closeButton = document.createElement("button");
        closeButton.innerHTML = "X";
        closeButton.addEventListener("click", () => {
            modal.remove();
        });
        modal.append(closeButton);

        // add modal to main
        currentPageMain.append(modal);
    })
});

galleryFigures.forEach((figure) => {
    let figImg = figure.children[0];

    // if image is landscape, have the figure 
    // span the full width of the grid
    if (figImg.height < figImg.width) {
        figure.style.gridColumn = "span 2";
    }

})