// Make the DIV element draggable:

const content = document.getElementById("content");
var contentBC = content.getBoundingClientRect();
console.log(contentBC);

const sidebar = document.getElementById("sidebar");
const sidebarBC = sidebar.getBoundingClientRect();
console.log(sidebarBC);
var initialSidebar = getElemInitialPos(sidebar);

var stickers = document.getElementsByClassName("sticker");
console.log(stickers);
console.log(stickers.length);
var stickerPositions = Array(stickers.length)
for(var i = 0; i < stickers.length; i++) {
  stickerPositions[i] = getElemInitialPos(stickers[i]);
  dragElement(stickers[i]);
}
console.log(stickerPositions)

const sticker = document.getElementById("sticker1");
const stickerBC = sticker.getBoundingClientRect();
var initialSticker = getElemInitialPos(sticker);

var stickerFlag = true;

//dragElement(sticker);

content.addEventListener("scroll", function(){})
 
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
 
  return {x1: elementX, y1: elementY, x2: elementW, y2: elementH, flag: true};
}


function dragElement(elmnt) {
  
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    
    
  } else {
    // otherwise, move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;

    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;

  }

  function elementDrag(e) {
    
    console.log("id: " + elmnt.id.slice(-1));
    var index = parseInt(elmnt.id.slice(-1));
    var currentSticker = stickerPositions[index - 1];
    //stickerPositions[index]
    console.log(currentSticker);
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    var ok = elmnt.offsetLeft > contentBC.left ? "is greater" : "is not greater"
    //console.log("test: " +  elmnt.offsetLeft + " " + ok + " " + contentBC.left)
    //console.log("initial: " + initialSidebar.x2)
    console.log("left: " +  elmnt.offsetLeft)
    if (elmnt.offsetLeft > contentBC.left) {
        
        if (currentSticker.flag) {
          content.appendChild(elmnt);
          elmnt.style.top = (elmnt.offsetTop + currentSticker.y1) + "px";
          elmnt.style.left = (elmnt.offsetLeft - initialSidebar.x2) + "px";
          currentSticker.flag = false;
        }
        
        //elmnt.style.top = (elmnt.offsetTop + stickerBC.top) + "px";
        //elmnt.style.left = (elmnt.offsetLeft - sidebarBC.right) + "px";

    } 

    
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}