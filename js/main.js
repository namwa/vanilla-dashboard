const addNavBtn = document.querySelector(".add-nav")
const addBlockBtn = document.querySelector(".add-block")
const columnMain = document.querySelector(".column-main")

// create Nav bar
function createNavElement() {
  const nav = document.createElement("nav")
  const ul = document.createElement("ul")

  ul.classList.add("nav")

  let menus = ["Logo", "Home", "Blog", "Pricing"]

  menus.forEach((menu, index) => {
    const li = document.createElement("li")
    li.setAttribute("draggable", "true")

    li.innerText = menu

    if (index === 0) {
      li.classList.add("logo")
    }

    li.addEventListener("dragstart", handleDragStart)
    li.addEventListener("dragover", handleDragOver)
    li.addEventListener("dragenter",handleDragEnter)
    li.addEventListener("dragleave", handleDragLeave)
    li.addEventListener("drop", handleDrop)
    li.addEventListener("dragend", handleDragEnd)

    ul.appendChild(li)
  })

  nav.appendChild(ul)

  return nav
}

function handleDragStart(e) {
  e.target.classList.add("dragging")
  e.dataTransfer.effectAllowed = "move"
  e.dataTransfer.setData("text/html", e.target.innerHTML)

  e.currentTarget.style.backgroundColor = "yellow"
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move"
  return false
}

function handleDragEnter(e) {
  this.classList.add("over")
}

function handleDragLeave(e) {
  this.classList.remove("over")
}

function handleDrop(e) {
  e.stopPropagation()
  const draggingItem = document.querySelector(".dragging")
  if (draggingItem !== this) {
    draggingItem.innerHTML = this.innerHTML
    this.innerHTML = e.dataTransfer.getData("text/html")
  }
  return false
}

function handleDragEnd(e) {
  this.classList.remove("dragging")
  e.currentTarget.style.backgroundColor = ""

  let menus = document.getElementsByTagName("li")
  for (menu of menus) {
    menu.classList.remove("over")
  }
}

// create a block
function createBlockElement() {
  const block = document.createElement("div")
  const textarea = document.createElement("textarea")

  block.classList.add("block")
  textarea.setAttribute("placeholder", "Enter you text here")
  block.appendChild(textarea)
  return block
}

addNavBtn.addEventListener("click", () => {
  const nav = createNavElement()
  columnMain.appendChild(nav)
})

addBlockBtn.addEventListener("click", () => {
  const block = createBlockElement()
  columnMain.appendChild(block)
})
