var counter = 0;

let addBlog = () => {

    //Grabbing the text input elements
    let titleText = document.getElementById("titleText");
    let articleText = document.getElementById("articleText");
    let imgText = document.getElementById("imgText");

    //do nothing if any of the text fields are empty
    if (titleText.value == "" || articleText.value == "" || imgText == ""){
        alert("PLEASE FILL IN ALL TEXTFIELDS!!! AND MAKE SURE TO CLICK ONE OF THE LINKS AT THE TOP LEFT");
        return;
    }

    counter++;
    

    //making the list item for ordered list
    let listItem = document.createElement("li");
    listItem.setAttribute("data-target","#myCarousel");
    listItem.setAttribute("data-slide-to", counter);

    //getting the ordered list from DOM and appending list item
    let list = document.getElementById("indicators");
    list.appendChild(listItem);

    
    //outer carousel item
    let carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");

    //inner picture
    let picture = document.createElement("img");
    picture.classList.add("h-100"); 
    picture.classList.add("w-100");
    picture.src = imgText.value;

    //inner div carousel content
    let paragraph = document.createElement("div");
    paragraph.classList.add("carousel-content");

    let paragraphContent = document.createElement("p");
    paragraphContent.textContent = articleText.value;
    paragraph.appendChild(paragraphContent);

    //inner div carousel title/caption
    let title = document.createElement("div");
    title.classList.add("carousel-caption");

    let titleContent = document.createElement("h3");
    titleContent.textContent = titleText.value;
    title.appendChild(titleContent);

    //appending all children to the carousel item
   
    carouselItem.appendChild(title);
    carouselItem.appendChild(paragraph);
    carouselItem.appendChild(picture);
    
    

    let carouselInner = document.getElementById("carousel-inner");
    carouselInner.appendChild(carouselItem);



    //RESET TEXT BOX VALUES
    titleText.value = "";
    articleText.value = "";
    imgText.value = "";
}