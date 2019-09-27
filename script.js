// Make the DIV element draggable:

//main content page
const content = document.getElementById("content");
var contentBC = content.getBoundingClientRect();

//sidebar div
const sidebar = document.getElementById("sidebar");
const sidebarBC = sidebar.getBoundingClientRect();
var initialSidebar = getElemInitialPos(sidebar);

//get stickers
var stickers = document.getElementsByClassName("sticker");

//array of the coordinates of the stickers
var stickerPositions = Array(stickers.length)

//initalize array and start drag function
for(var i = 0; i < stickers.length; i++) {
  stickerPositions[i] = getElemInitialPos(stickers[i]);
  dragElement(stickers[i]);
}
console.log(stickerPositions);

function getElemInitialPos(element) {
  var elementX = 0;
  var elementY = 0;
  var elementW = element.offsetWidth;
  var elementH = element.offsetHeight;
 
  while (element.offsetParent) {
      elementX += element.offsetLeft;
      elementY += element.offsetTop;
      element = element.offsetParent;
  }
 
  elementX += element.offsetLeft;
  elementY += element.offsetTop;
  elementW += elementX;
  elementH += elementY;
 
  return {x1: elementX, y1: elementY, x2: elementW, y2: elementH};
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var contentSide = false;
  var firstTime = true;

  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    
  } else {
    // otherwise, move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;
  }

  //mouse down
  function dragMouseDown(e) {
    console.log("mouse down");

    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;

    if(firstTime){
      sidebar.appendChild(elmnt);
      firstTime = false;


      elmnt.style.top = (e.clientY - elmnt.offsetHeight/2) + "px";
      elmnt.style.left = (elmnt.offsetLeft + e.clientX - elmnt.offsetWidth/2) + "px";
    }

    document.onmouseup = closeDragElement;

    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }
  
  //mouse dragging
  function elementDrag(e) {
    console.log("dragging");
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    //if sticker is in the sidebar  
      if(contentSide == false){

        elmnt.style.top = (e.clientY - elmnt.offsetHeight/2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

        //if crossing over to other side
        if (elmnt.offsetLeft > contentBC.left) {
          console.log("crossing over to main content Side!");
          contentSide = true;
          content.appendChild(elmnt);

          elmnt.offsetLeft = 0 + "px";
          elmnt.style.left = 0 + "px";
          elmnt.style.top = (elmnt.offsetTop + content.scrollTop) + "px";
        }
      }

      // if sticker is in the content zone
      else {
        elmnt.style.top = ((elmnt.offsetTop - pos2) ) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

        if (elmnt.offsetLeft <= 0) {
          console.log("crossing over to sidebar again");
          contentSide = false;
          sidebar.appendChild(elmnt);

          elmnt.style.left = (elmnt.offsetLeft + contentBC.left) + "px";
        }
      }
  }

  //mouse up
  function closeDragElement() {
    console.log("mouse up");
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

}