let data = {
   "websites": [
      {
         "title": "Trees Grow in Brooklyn",
         "description": "A custom HTML, CSS, and JS website with information about some of my favorite NYC trees, featuring some of my photos.",
         "link": "https://lstern36.github.io/info-654-web-basics/"
      },
      {
         "title": "Jade Segre Psychotherapy",
         "description": "A custom HTML, CSS, and JS website I made for my friend Jade's psychotherapy practice.",
         "link": "https://segrepsychotherapy.com/"
      },
      {
         "title": "A Beginner's Guide to CollectiveAccess",
         "description": "A WordPress website about my experience using CollectiveAccess for cataloging a small (pretend) museum collection.",
         "link": "https://guidetocollectiveaccess.wordpress.com/"
      },
      {
         "title": "Paper Cuts Zines: The Art of Independent Publishing",
         "description": "A WordPress website created for a research fellowship with the Center for Book Arts about independent publishing.",
         "link": "https://indiepublishingcba.wordpress.com"
      }
   ],
   "photos": [
        "images/photographs/IMG_0012.JPG",
        "images/photographs/IMG_8194.JPG",
        "images/photographs/IMG_8221.JPG",
        "images/photographs/IMG_9055.JPG",
        "images/photographs/IMG_9066.JPG",
        "images/photographs/IMG_9751.JPG",
        "images/photographs/IMG_9983.JPG",
        "images/photographs/IMG_9984.JPG"
   ]
}

console.log(data);

document.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
});

document.addEventListener("dragover", function(event) {
  event.preventDefault();
});

document.addEventListener("drop", (event) => {
    // get id from window data
    let windowId = event.dataTransfer.getData("text/plain");

    // move the window to where the cursor is when dropped
    let windowElement = document.getElementById(windowId);
    windowElement.style.left = `${Number(event.screenX)}px`;
    windowElement.style.top = `${Number(event.screenY)}px`;
});

// get all folders to do stuff with
let allFolders = document.getElementsByClassName("folder");
for (let i = 0; i < allFolders.length; i++) {

    // open a folder by clicking!
    allFolders[i].addEventListener("click", () => {
        let [folderType, _] = allFolders[i].id.split("-");
        createWindow(folderType);
    })

    // tilt a folder and change font on hover
    allFolders[i].addEventListener("mouseover", () => {
        let folderImg = allFolders[i].children[0];
        let folderName = allFolders[i].children[1];

        console.log(allFolders[i].children);
        folderImg.style.transform = "rotate(7deg)";
        folderName.style.fontFamily = "Nabla";
    })

    // tilt back change font back to normal on hover away
    allFolders[i].addEventListener("mouseout", () => {
        let folderImg = allFolders[i].children[0];
        let folderName = allFolders[i].children[1];

        folderImg.style.transform = "rotate(0deg)";
        folderName.style.fontFamily = "";
    })
}

// make window full screen!
let allFullScreenButtons = document.getElementsByClassName("full-screen");
for (let i = 0; i < allFullScreenButtons.length; i++) {
    allFullScreenButtons[i].addEventListener("click", () => {
        windowToEnlarge = allFullScreenButtons[i].parentElement.parentElement;
        windowToEnlarge.style.width = "80vw";
        windowToEnlarge.style.height = "80vh";
        windowToEnlarge.style.top = "20px";
        windowToEnlarge.style.left = "20px";
    })
}

// close window!
let allCloseButtons = document.getElementsByClassName("close");
for (let i = 0; i < allCloseButtons.length; i++) {
    allCloseButtons[i].addEventListener("click", () => {
        windowToClose = allFullScreenButtons[i].parentElement.parentElement;
        windowToClose.remove();
    });
}

function createWindow(windowType) {
    let numExistingWindows = document.getElementsByClassName("lil-window").length;

    let newWindow = document.createElement("div");
    newWindow.id = `window${numExistingWindows+1}`;
    newWindow.className = "lil-window";
    newWindow.draggable = "true";

    newWindow.innerHTML = `
        <div class="ctrl-buttons">
            <button class="full-screen">☐</button>
            <button class="minimize">_</button>
            <button class="close">X</button>
        </div>
        <div class="info">
            <h2>${windowType}</h2>
        </div>
    `;
    
    // enlarge window event listener
    newEnlargeButton = newWindow.children[0].children[0];
    newEnlargeButton.addEventListener("click", () => {
        newWindow.style.width = "80vw";
        newWindow.style.height = "80vh";
        newWindow.style.top = "20px";
        newWindow.style.left = "20px";
    })

    // minimize window event listener
    newCloseButton = newWindow.children[0].children[1];
    newCloseButton.addEventListener("click", () => {
       newWindow.style.width = "";
        newWindow.style.height = "";
        newWindow.style.top = "";
        newWindow.style.left = "";
    });

    
    // close window event listener
    newCloseButton = newWindow.children[0].children[2];
    newCloseButton.addEventListener("click", () => {
       newWindow.remove();
    });

    newWindow.style.top = "30vh";
    newWindow.style.left = "30vw";

    // call relevant function for window type
    if (windowType == "websites") {
        newWindow.id = "websites-window";
        displayAllWebsites(newWindow);
    } else if (windowType == "photography") {
        newWindow.id = "photography-window";
        displayAllPhotos(newWindow);
    }

    document.body.appendChild(newWindow);

    return newWindow;
}

// display all websites as a list of links in the websites window
function displayAllWebsites(websitesWindow) {
    data.websites.forEach((website) => {
        let websiteInfoDiv = document.createElement("div");
        websiteInfoDiv.className = "website-info";

        let h3Title = document.createElement("h3");
        h3Title.innerHTML = `<a href="${website.link}" target="_blank">${website.title}</a>`;
        websiteInfoDiv.appendChild(h3Title);

        let pDescription = document.createElement("p");
        pDescription.innerText = website.description;
        websiteInfoDiv.appendChild(pDescription);

        websitesWindow.children[1].appendChild(websiteInfoDiv);
    })
}

// display all photographs in the photography window
function displayAllPhotos(photographyWindow) {
    data.photos.forEach((photoFilePath) => {
        let img = document.createElement("img");
        img.src = photoFilePath;
        photographyWindow.children[1].appendChild(img);
    })
}