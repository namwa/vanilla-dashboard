const addNavBtn = document.querySelector('.add-nav')
const addBlockBtn = document.querySelector('.add-block')
const columnMain = document.querySelector('.column-main')

// create Nav bar
function createNavElement() {
  const nav = document.createElement('nav')
  const ul = document.createElement('ul')

  ul.classList.add('nav')

  let menus = ['Logo', 'Home', 'Blog', 'Pricing']

  menus.forEach((menu, index) => {
    const li = document.createElement('li')
    li.setAttribute('draggable', 'true')

    li.innerText = menu

    if (index === 0) {
      li.classList.add('logo')
    }

    li.addEventListener('dragstart', handleDragStart)
    li.addEventListener('dragover', handleDragOver)
    li.addEventListener('dragenter',handleDragEnter)
    li.addEventListener('dragleave', handleDragLeave)
    li.addEventListener('drop', handleDrop)
    li.addEventListener('dragend', handleDragEnd)

    ul.appendChild(li)
  })

  nav.appendChild(ul)

  return nav
}

function handleDragStart(e) {
  e.target.classList.add('dragging')
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/html', e.target.innerHTML)

  e.currentTarget.style.backgroundColor = 'yellow'
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move'
  return false
}

function handleDragEnter(e) {
  this.classList.add('over')
}

function handleDragLeave(e) {
  this.classList.remove('over')
}

function handleDrop(e) {
  e.stopPropagation()
  const draggingItem = document.querySelector('.dragging')
  if (draggingItem !== this) {
    draggingItem.innerHTML = this.innerHTML
    this.innerHTML = e.dataTransfer.getData('text/html')
  }
  return false
}

function handleDragEnd(e) {
  this.classList.remove('dragging')
  e.currentTarget.style.backgroundColor = ''

  let menus = document.getElementsByTagName('li')
  for (menu of menus) {
    menu.classList.remove('over')
  }
}

// create a block
function createBlockElement() {
  const block = document.createElement('div')
  const textarea = document.createElement('textarea')

  block.classList.add('block')
  textarea.setAttribute('placeholder', 'Enter you text here')
  block.appendChild(textarea)
  return block
}

addNavBtn.addEventListener('click', () => {
  const nav = createNavElement()
  columnMain.appendChild(nav)
})

addBlockBtn.addEventListener('click', () => {
  const block = createBlockElement()
  columnMain.appendChild(block)
})

// create a comment box


function createCommentBox() {
  let div = document.createElement('div')
  div.classList.add('comment-add-box')
  div.classList.add('comment-reply-box')

  let textarea = document.createElement('textarea')
  textarea.placeholder = "Add a comment"

  let replyBtn = document.createElement('button')
  replyBtn.setAttribute('type', 'button')
  replyBtn.classList.add('btn__submit-comment')
  replyBtn.innerText = 'Reply'

  div.appendChild(textarea)
  div.appendChild(replyBtn)
  return div
}

function addComment(text) {
  let div = document.createElement('div')
  div.classList.add('comment__container')
  div.classList.add('opened')
  div.innerHTML += `
    <div class="comment__card">
      <img src="./assets/avatar-woman.png" alt="">
      <div>
        <div class="comment__text">
          <div>
            <span><b>Cindy</b></span>
            <span>-</span>
            <span>22 Jun</span>
          </div>
          <p>${text}</p>
        </div>
        <div class="comment__action">
          <button class="button-likes" data-count="11">
            <svg fill="none" viewBox="0 0 20 20"><path stroke="currentColor" stroke-width="1.4" d="m10.723 4.632.002-.002c.69-.691 1.61-1.1 2.58-1.154l.228-.006a3.958 3.958 0 0 1 2.79 6.758l-6.29 6.29a.044.044 0 0 1-.063 0l-6.29-6.29A3.959 3.959 0 0 1 9.277 4.63l.227.227.493.494.496-.492.229-.227Z"></path></svg>
            11
          </button>
          <div class="divider-right"></div>
          <button type="button" class="reply">Reply</button>
        </div>
      </div>
    </div>
  `
  return div
}

const reply = document.querySelectorAll('.reply')
const commentContainer = document.querySelectorAll('.comment__container')

commentContainer.forEach((c => {
  c.addEventListener('click', (event) => {
    let replyClicked = event.target.classList.contains('reply')
    let submitCommentClicked = event.target.classList.contains('btn__submit-comment')
    let closestCard = event.target.closest('.comment__container')

    if (replyClicked) {
      closestCard.appendChild(createCommentBox())
      console.log(closestCard);
    }

    if (submitCommentClicked) {
      const commentDetails = event.target.closest('.comment-add-box')
      if (commentDetails.children[0].value) {
        closestCard.appendChild(addComment(commentDetails.children[0].value))
        commentDetails.remove()
      }
    }
  })
}))
