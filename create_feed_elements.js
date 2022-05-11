let pictures = [];

const doc = document;
let modal = doc.getElementById("myModal");
let modalLike = doc.getElementById("myModalLike");
let span = doc.getElementsByClassName("close")[0];
let spanLike = doc.getElementsByClassName("closeLike")[0];
let request = doc.getElementById('input');

fetch('https://62729d8825fed8fcb5f7281a.mockapi.io/photos')
    .then ((response) => response.json())
    .then ((array) => {
        for (let i = 0; i < 60; i++) {
            pictures[i] = array[i];
        }
    })
    .then(() => {
        const body = doc.getElementById('start_content');
        let feedElemCounter = 0;
        let currentInputValue = '';
        let dropdown = doc.getElementById('dropdown');
        let expandButton = doc.getElementById('expandButton');

        let board_element_1 = doc.getElementById('board_element_1');
        let board_element_2 = doc.getElementById('board_element_2');
        let board_element_3 = doc.getElementById('board_element_3');

        let range = [0, 60];

        board_element_1.addEventListener('click', function() {
            range = [0, 20];
        });
        board_element_2.addEventListener('click', function() {
            range = [20, 40];
        });
        board_element_3.addEventListener('click', function() {
            range = [40, 60];
        });

        let picturesCounter = range[0];
        
        let section_1 = doc.getElementById('section_1');
        let section_2 = doc.getElementById('section_2');
        let section_3 = doc.getElementById('section_3');
        let section_4 = doc.getElementById('section_4');
        let section_5 = doc.getElementById('section_5');

        let lastElem_1;
        let lastElem_2;
        let lastElem_3;
        let lastElem_4;
        let lastElem_5;

        let lastElem_1_Rect;
        let lastElem_2_Rect;
        let lastElem_3_Rect;
        let lastElem_4_Rect;
        let lastElem_5_Rect;

        let lastElemsRectArr = [lastElem_1_Rect, lastElem_2_Rect, lastElem_3_Rect,
            lastElem_4_Rect, lastElem_5_Rect];
        
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        request.addEventListener('keydown', function(e) {
            currentInputValue = request.value;
            currentInputValue = currentInputValue.trim();
            currentInputValue = currentInputValue.toLowerCase();
            if (e.key == 'Backspace') {
                emptyFeed();
            }
            else {
                for (let i = 1; i <= 5; i++) {
                    let section = doc.getElementById(`section_${i}`);
                    let sectionsChildren = section.childNodes;
                    for (let i = 0; i < sectionsChildren.length; i++) {
                        if (!(`${sectionsChildren[i].getAttribute('name')}`.includes(`${currentInputValue}`))) {
                            sectionsChildren[i].style.display = 'none';
                        }
                        else {
                            sectionsChildren[i].style.display = 'flex';
                            feelFeed();
                        }
                    }
                }
            }
        });

        expandButton.addEventListener('click', function () {
            if (dropdown.style.display == "flex") {
                dropdown.style.display = "none";
                return;
            }
            dropdown.style.display = "flex";
        });

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
            if (event.target == modalLike) {
                modalLike.style.display = "none";
            }
            if (event.target == dropdown) {
                dropdown.style.display = "none";
            }
        }

        span.onclick = function() {
            modal.style.display = "none";
        }
        spanLike.onclick = function() {
            modalLike.style.display = "none";
        }

        function createFeedElement(section){
            if (`${pictures[picturesCounter].name}`.includes(`${currentInputValue}`)) {
                feedElemCounter++;
                let feed_elem = doc.createElement("div");
                let photo = doc.createElement("img");
                let inside = doc.createElement("div");
                let editButton = doc.createElement("button");
                editButton.addEventListener('click', function() {
                    modal.style.display = "block";
                });
                let likeButton = doc.createElement("button");
                likeButton.addEventListener('click', function() {
                    modalLike.style.display = "block";
                });
                let buttons_padding_div = doc.createElement("div");
                let hasTextValue = Math.floor(getRandomArbitrary (1, 7));
            
                let section_ = section;
                
                feed_elem.setAttribute("class", "photo_element");
                photo.setAttribute('src', `${pictures[picturesCounter].url}`)
                inside.setAttribute('class', 'inside');
                buttons_padding_div.setAttribute('class', 'buttons_padding');
                feed_elem.setAttribute('id', `feed_elem_${feedElemCounter}`);
                feed_elem.setAttribute('name', `${pictures[picturesCounter].name}`);
                editButton.setAttribute('class', 'feed_button_margin');
                
                picturesCounter++;
                if (picturesCounter == range[1]) { 
                    picturesCounter = range[0];
                }
            
                section_.append(feed_elem);
                feed_elem.append(photo);
                feed_elem.append(inside);
                inside.append(buttons_padding_div);
                buttons_padding_div.append(editButton);
                editButton.innerHTML = '&#9998;';
                buttons_padding_div.append(likeButton);
                likeButton.innerHTML = '&#9825;';
    
                if (hasTextValue == 3) {
                    let text_element = doc.createElement("p");
                    let sample_text = doc.createTextNode("Sample Text");
                    feed_elem.append(text_element);
                    text_element.appendChild(sample_text);
                }
            }
            else {
                picturesCounter++;
                if (picturesCounter == range[1]) { 
                    picturesCounter = range[0];
                }
            }
        }
        
        function feelFeed() {
            bodyRect = body.getBoundingClientRect();
            let minBottom;
            let minIndex;
            lastElem_1 = section_1.lastElementChild;
            lastElem_2 = section_2.lastElementChild;
            lastElem_3 = section_3.lastElementChild;
            lastElem_4 = section_4.lastElementChild;
            lastElem_5 = section_5.lastElementChild;
            let lastElems = [lastElem_1, lastElem_2, lastElem_3, lastElem_4, lastElem_5];
        
            for (let i = 0; i < 5; i++) {
                lastElemsRectArr[i] = lastElems[i].getBoundingClientRect();
            }
            minIndex = 0;
            minBottom = lastElemsRectArr[0].bottom;
            for (let i = 1; i < 5; i++) {
                if (minBottom > lastElemsRectArr[i].bottom) { 
                    minBottom = lastElemsRectArr[i].bottom;
                    minIndex = i;
                }
            }
            let currentSection = doc.getElementById(`section_${minIndex + 1}`);
            while (lastElemsRectArr[minIndex].bottom < doc.documentElement.clientHeight + 200) {
                createFeedElement(currentSection);
                lastElems[minIndex] = currentSection.lastElementChild;
                lastElemsRectArr[minIndex] = lastElems[minIndex].getBoundingClientRect();
            }
        }

        function emptyFeed() {
            bodyRect = body.getBoundingClientRect();
            let maxBottom;
            let maxIndex;
            lastElem_1 = section_1.lastElementChild;
            lastElem_2 = section_2.lastElementChild;
            lastElem_3 = section_3.lastElementChild;
            lastElem_4 = section_4.lastElementChild;
            lastElem_5 = section_5.lastElementChild;
            let lastElems = [lastElem_1, lastElem_2, lastElem_3, lastElem_4, lastElem_5];
        
            for (let i = 0; i < 5; i++) {
                lastElemsRectArr[i] = lastElems[i].getBoundingClientRect();
            }
            maxIndex = 0;
            maxBottom = lastElemsRectArr[0].bottom;
            for (let i = 1; i < 5; i++) {
                if (maxBottom < lastElemsRectArr[i].bottom) { 
                    maxBottom = lastElemsRectArr[i].bottom;
                    maxIndex = i;
                }
            }
            let currentSection = doc.getElementById(`section_${maxIndex + 1}`);
            while (lastElemsRectArr[maxIndex].bottom > doc.documentElement.clientHeight + 200) {
                currentSection.removeChild(currentSection.lastElementChild);
                lastElems[maxIndex] = currentSection.lastElementChild;
                lastElemsRectArr[maxIndex] = lastElems[maxIndex].getBoundingClientRect();
            }
        }

        window.addEventListener('scroll', () => {
            feelFeed();
        });
        
        for (let i = 0; i < 7; i++) {
            createFeedElement(section_1);
            createFeedElement(section_2);
            createFeedElement(section_3);
            createFeedElement(section_4);
            createFeedElement(section_5);
        }
    });