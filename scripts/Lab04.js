my4711NameSpace = function() {
    let header = document.getElementById('header');
    let artists = document.getElementById('artists');
    let artistID = 0;
    if(localStorage.getItem("IDCounter") == null) {
        localStorage.setItem("IDCounter", "" + artistID);
    } else {
        artistID = localStorage.getItem("IDCounter");
    }

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

    artistFields.appendChild(artistName);
    artistFields.appendChild(artistDesc);
    artistFields.appendChild(artistImage);
    artistFields.appendChild(buttonAdd);
    let artistFieldsOpen = false;

    loadEntries();

    function searchArtists() {
        let searchQuery = document.getElementById("searchBar").value;
        let ArtistsChildElements = artists.children;
        console.log(ArtistsChildElements.length);
        console.log(ArtistsChildElements);
        for(i = 0; i < ArtistsChildElements.length; i++) {
            if(String(ArtistsChildElements[i].children[1].firstChild.textContent).toLowerCase().includes(searchQuery)) {
                ArtistsChildElements[i].style.display = "block";
            } else {
                ArtistsChildElements[i].style.display = "none";
            }
        }
    }

    function loadEntries() {
        let length = localStorage.length;
        if(length <= 1) {
            return
        }
        for(i = 0; i < length; i++) {
            if(localStorage.key(i) != "IDCounter") {
                createEntryByID(localStorage.key(i));
            }
        }
    }

    buttonAdd.onclick = function() {
        createEntry(artistName.value, artistDesc.value, artistImage.value);
        addArtist();
    }

    function createEntry(name, desc, image) {
        let newArtist = document.createElement("div");
        let newImageHolder = document.createElement("div");
        let newImage = document.createElement("img");
        let newDescription = document.createElement("div");
        let newName = document.createElement("p");
        let newSubtitle = document.createElement("p");
        let newTextName = document.createTextNode(name);
        let newTextSubtitle = document.createTextNode(desc);
        let newDeleteButton = document.createElement("button");

        newArtist.id = "ID" + artistID++;
        newImageHolder.className = "image";
        newImage.src = image;
        newImage.alt = "-No image-";
        newDescription.className = "description";
        newName.className = "first";
        newDeleteButton.className = "buttonDelete";
        newDeleteButton.textContent = "Delete";

        newDeleteButton.onclick = function() {
            localStorage.removeItem(newArtist.id);
            newArtist.remove();
        }
        
        newName.appendChild(newTextName);
        newSubtitle.appendChild(newTextSubtitle);
        newArtist.appendChild(newImageHolder);
        newArtist.appendChild(newDescription);
        newImageHolder.appendChild(newImage);
        newDescription.appendChild(newName);
        newDescription.appendChild(newSubtitle);
        artists.appendChild(newArtist);
        newArtist.appendChild(newDeleteButton);

        localStorage.setItem("IDCounter", artistID);
        localStorage.setItem("" + newArtist.id, "" + newArtist.innerHTML);
    }

    function createEntryByID(id) {
        let newArtist = document.createElement("div");
        newArtist.innerHTML = localStorage.getItem(id);
        artists.appendChild(newArtist);
        newArtist.lastChild.onclick = function() {
            localStorage.removeItem(id);
            newArtist.remove();
        }
    }

    function addArtist() {
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
    }

    return {
        addArtist:addArtist,
        searchArtists:searchArtists
    }
}();
