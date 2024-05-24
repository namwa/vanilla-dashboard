const addNavBtn = document.querySelector(".add-nav")
const columnMain = document.querySelector(".column-main")

function createNavElement() {
  const nav = document.createElement("nav")
  const ul = document.createElement("ul")

  ul.classList.add("nav")

  let menus = ["Logo", "Home", "Blog", "Pricing"]

  menus.forEach((menu, index) => {
    const li = document.createElement("li")
    li.setAttribute("contenteditable", "true")
    li.setAttribute("draggable", "true")

    li.innerText = menu

    if (index === 0) {
      li.classList.add("logo")
    }

    li.addEventListener("dragstart", handleDragStart)
    li.addEventListener("dragover", handleDragOver)
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
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move"
  return false
}

function handleDrop(e) {
  const draggingItem = document.querySelector(".dragging")
  if (draggingItem !== this) {
    draggingItem.innerHTML = this.innerHTML
    this.innerHTML = e.dataTransfer.getData("text/html")
  }
  return false
}

function handleDragEnd(e) {
  this.classList.remove("dragging")
}

addNavBtn.addEventListener("click", () => {
  const nav = createNavElement()
  columnMain.appendChild(nav)
})
