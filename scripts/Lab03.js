let header = document.getElementById('header');
let artists = document.getElementById('artists');

let artistFields = document.createElement('div');
let artistName = document.createElement('input');
let artistDesc = document.createElement('input');
let artistImage = document.createElement('input');
let buttonAdd = document.createElement('button');
artistName.className = "artistField";
artistName.placeholder= "Name";
artistName.maxLength = 40;
artistDesc.className = "artistField";
artistDesc.placeholder = "Description";
artistDesc.maxLength = 40;
artistImage.className = "artistField";
artistImage.placeholder = "Image URL";
buttonAdd.className = "buttonAdd";
buttonAdd.textContent = "Add";

console.log("Made it past initialization");

artistFields.appendChild(artistName);
artistFields.appendChild(artistDesc);
artistFields.appendChild(artistImage);
artistFields.appendChild(buttonAdd);
let artistFieldsOpen = false;

buttonAdd.onclick = function() {
    console.log("Made it into createArtistEntry");
    let newArtist = document.createElement("div");

    let newImageHolder = document.createElement("div");
    newImageHolder.className = "image";
    let newImage = document.createElement("img");
    newImage.src = artistImage.value;
    newImage.alt = "-No image-";

    let newDescription = document.createElement("div");
    newDescription.className = "description";

    let newName = document.createElement("p");
    let newTextName = document.createTextNode(artistName.value);
    newName.appendChild(newTextName);
    newName.className = "first";
    let newSubtitle = document.createElement("p");
    let newTextSubtitle = document.createTextNode(artistDesc.value);
    newSubtitle.appendChild(newTextSubtitle);

    newArtist.appendChild(newImageHolder);
    newArtist.appendChild(newDescription);
    newImageHolder.appendChild(newImage);
    newDescription.appendChild(newName);
    newDescription.appendChild(newSubtitle);
    artists.appendChild(newArtist);

    let newDeleteButton = document.createElement("button");
    newDeleteButton.className = "buttonDelete";
    newDeleteButton.textContent = "Delete";
    newDeleteButton.onclick = function() {
        console.log("Removal start");
        newArtist.remove();
    }
    newArtist.appendChild(newDeleteButton);

    addArtist();
    console.log("Made it out");
}

function addArtist() {
    console.log("Made it into addArtist");
    if(!artistFieldsOpen) {
        header.parentNode.insertBefore(artistFields, header.nextSibling);
        artistFieldsOpen = true;
    } else {
        artistName.value = "";
        artistDesc.value = "";
        artistImage.value = "";
        header.parentNode.removeChild(artistFields);
        artistFieldsOpen = false;
    }
    console.log("Made it out of addArtist");
}