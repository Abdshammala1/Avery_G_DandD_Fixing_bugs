;(() => {
	// set up the puzzle pieces and boards
	// navButtons -> images at the bottom of the page
	const navButtons = document.querySelectorAll('#buttonHolder img'),
	  puzzlePiece = document.querySelectorAll('.puzzle-pieces img'),
	  dropZones = document.querySelectorAll('.drop-zone'),
	  puzzleBoard = document.querySelector('.puzzle-board')
  
	// store the image names here
	const pieces = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']
  
	//functions go here => what we want to have happen when our triggers fire
	function changeImageSet() {
	  //resetting the game by removing the puzzle pieces from the puzzle board and putting
	  // them back on the puzzle pieces board
	  // I started by looping through the puzzel board children(the divs) to check if they have
	  // any image children and if they did, I would remove them from the board and then
	  // append them as children to the puzzle pieces board
	  for (let i = 1; i < puzzleBoard.children.length; i++) {
		const element = puzzleBoard.children[i]
		if (element.firstChild) {
		  const removedPuzzlePiece = element.removeChild(element.firstChild)
		  document.querySelector('.puzzle-pieces').appendChild(removedPuzzlePiece)
		}
	  }
  
	  // change the thumbnail images on the left to match the btton images
	  pieces.forEach((piece, index) => {
		puzzlePiece[index].src = `images/${piece + this.dataset.puzzleindex}.jpg`
		puzzlePiece[index].id = `${piece + this.dataset.puzzleindex}`
	  })
  
	  // and set a background image on the drop zone container
	  // debugger;
	  puzzleBoard.style.backgroundImage = `url(images/backGround${this.dataset.puzzleindex}.jpg)`
	}
  
	function dragStart(event) {
	  console.log('started a drag')
  
	  // capture the id of the element we're dragging
	  // the dataTransfer object is part of the drag event -> you can use this
	  // to temporarily store data you can retieve and use later
	  // like an audio track, as an example
	  event.dataTransfer.setData('text/plain', this.id)
	}
  
	function allowDrag(event) {
	  event.preventDefault()
	  console.log('you dragged something onto me!')
	}
  
	function allowDrop(event) {
	  console.log('you dropped something on me')
  
	  let currentPiece = event.dataTransfer.getData('text/plain')
   // I started by wondering why does it take more than one image, then I saw that you were using the event.target to get access to the each puzzle box, so I decided to console.log the event and found information about the targeted tag so I made a condition to only allow the image drop if the puzzle board has no children and only if it wasn't an image tag, because the first condition made it possible forthe user to put more than one image inside of each other so I excluded that option.
	  if (
		event.target.children.length === 0 &&
		!event.target.classList.contains('puzzle-image')
	  ) {
		event.target.appendChild(document.querySelector(`#${currentPiece}`))
	  } else {
		return
	  }
	}
  
	// add some event handling for the nav navButtons
	navButtons.forEach(button => button.addEventListener('click', changeImageSet))
  
	// set up the drag event on our puzzle pieces
	puzzlePiece.forEach(piece => piece.addEventListener('dragstart', dragStart))
  
	// set up the dragover event for our drop Zones
	dropZones.forEach(zone => zone.addEventListener('dragover', allowDrag))
  
	dropZones.forEach(zone => zone.addEventListener('drop', allowDrop))
  
	//call, apply and bind are different ways to invoke functions
	//if you should know what call does -> research in on MDN
	changeImageSet.call(navButtons[0])
  })()
  