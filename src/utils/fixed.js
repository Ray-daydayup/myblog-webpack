const leftCard = document.querySelector('#left-area')
const rightCard = document.querySelector('#right-area')
const centerCard = document.querySelector('#center-area')
window.onscroll = function () {
  fixCard(leftCard, centerCard)
  fixCard(rightCard, centerCard)
}
function fixCard(card, scrollCard) {
  if (!card) {
    return
  }
  let startHeight =
    card.offsetHeight - document.documentElement.clientHeight * 0.88
  let endHeight = scrollCard.offsetHeight - card.offsetHeight
  let scrollHeight =
    startHeight > 0
      ? document.documentElement.scrollTop - startHeight
      : document.documentElement.scrollTop - 0
  if (scrollHeight >= 0 && endHeight > 0) {
    if (scrollHeight <= endHeight) {
      card.style.transform = `translateY(${scrollHeight}px)`
    } else {
      card.style.transform = `translateY(${endHeight}px)`
    }
  } else {
    card.style.transform = `translateY(0px)`
  }
}
