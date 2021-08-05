const banner = document.querySelector(".banner")
const button = document.querySelector(".btn")
const hidden_boxes = button.nextElementSibling



banner.addEventListener('click', () => {
  if (banner.classList.contains("original-message-changed")){
    banner.firstElementChild.textContent = "Welcome!"
  }else {
    banner.firstElementChild.textContent = "Have a Good Time!"
  }
  banner.classList.toggle("original-message-changed")
})

button.addEventListener('click', () => {
  if (hidden_boxes.style.display === "none"){
    hidden_boxes.style.display = null
  } else{
    hidden_boxes.style.display = "none"
  }
  button.classList.toggle("clicked")
})

