const base = document.querySelector("div[base]")
const links = document.getElementById("links")

const Links = [];

const STATUS = {
    refreshTime: 50
};

STATUS.refresh = setInterval(() => {

    links.innerText = "Conexões: ";

    Links.forEach(link => {

        const {source, target, pseudoElement} = link;

        links.innerText += `\t(${source.id} -> ${target.id})\t`

        const pos = checkPosition(source, target);

        let vM = getElementMiddle(source);
        let tM = getElementMiddle(target);

        let width, height, top, left, borderTopWidth = 0, borderBottomWidth = 0, borderRightWidth = 0, borderLeftWidth = 0;

        top = (!pos.top ? vM.y : tM.y)
        left = (!pos.left ? vM.x : tM.x)

        if(!pos.top){
            height = (tM.y - vM.y);
            borderTopWidth = 3;
        } else {
            height = (vM.y - tM.y);
            borderBottomWidth = 3;
        }

        if(!pos.left){
            width = (tM.x - vM.x);
            borderRightWidth = 3;
        } else{
            width = (vM.x - tM.x);
            borderLeftWidth = 3;
        }

        pseudoElement.style.borderColor = window.getComputedStyle(source).backgroundColor;

        pseudoElement.style.top =   `${top}px`
        pseudoElement.style.left =  `${left}px`

        pseudoElement.style.width =     `${width}px`
        pseudoElement.style.height =    `${height}px`

        pseudoElement.style.borderLeftWidth =   `${borderLeftWidth}px`
        pseudoElement.style.borderRightWidth =  `${borderRightWidth}px`

        pseudoElement.style.borderTopWidth =    `${borderTopWidth}px`
        pseudoElement.style.borderBottomWidth = `${borderBottomWidth}px`

    })

}, STATUS.refreshTime)

document.addEventListener("DOMContentLoaded", () => {

    const elements = base.querySelectorAll("[link]")

    elements.forEach((value) => {

        const target = value.getAttribute("link");
        const targetElement = document.querySelector(target);

        if(targetElement && value){

            const link = {
                source: value,
                target: targetElement
            }

            const pseudo = createPseudoElement(link)

            Links.push({
                source: value,
                target: targetElement,
                pseudoElement: pseudo,
            })

            base.appendChild(pseudo)
        }
    })

})

const createPseudoElement = (link) => {

    const pseudo = document.createElement('div')

    pseudo.id = `${link.source.id}-to-${link.target.id}`
    pseudo.style.position = 'fixed';
    pseudo.style.zIndex = '-100';

    pseudo.style.borderStyle = 'dashed'
    pseudo.style.borderColor = '#333333'
    pseudo.style.borderRadius = '10px'

    return pseudo;
}

const getElementMiddle = (element) => {

    const rect = element.getBoundingClientRect();

    let x = rect.left + (rect.width / 2);
    let y = rect.top + (rect.height / 2);

    let a = (rect.width * rect.height);

    return {x, y, a};
}

const checkPosition = (elementA, elementB) => {

    const rectA = elementA.getBoundingClientRect();
    const rectB = elementB.getBoundingClientRect();

    let pos = {
        top: false, left: true
    }

    if(rectA.left > (rectB.left + (rectB.width / 2))) {
        pos.left = true;
    }

    if(rectA.right < (rectB.right + (rectB.width / 2))) {
        pos.left = false;
    }

    if(rectA.top > (rectB.top + (rectB.height / 2))){
        pos.top = true;
    }

    if(rectA.top < (rectB.top + (rectB.height / 2))){
        pos.top = false;
    }

    return pos
}



// https://www.w3schools.com/howto/howto_js_draggable.asp

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("div[movable]").forEach((value, key, parent) => {
        dragElement(value)
    })
})

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
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
