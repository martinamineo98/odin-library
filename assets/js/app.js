
let books = []

function Book(name, author, pages, read) {
	this.name = name
	this.author = author
	this.pages = pages
	this.read = read
	this.changeStatus = () => this.read = this.read ? false : true
	
	books.push(this)
}

function addBookToLibrary(name, author, pages, read) {
	let newBook = new Book(name, author, pages, read)
}

// EXAMPLES

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, false)
addBookToLibrary('The Lord of The Rings', 'J.R.R. Tolkien', 1178, true)
addBookToLibrary('The Silmarillion', 'J.R.R. Tolkien', 365, false)

// TABLE ROW: DeleteBtn Name Author Pages ReadBtn

!function showBooks() {
	const container = document.querySelector('tbody')
	
	// Create each needed element by providing its text content,
	// its parent and its type.
	
	function createElement(str, parent, type = 'td') {
		let el = document.createElement(type)
				el.textContent = str
		parent.appendChild(el)
		
		return el
	}
	
	// Get the book's index in the books array.
	function getBookIndex(name) {
		return books.map((el) => el.name).indexOf(name)
	}
	
	// Change the book's status in the array and in the table.
	function changeReadStatus(bookName, btn, img) {
		const index = getBookIndex(bookName)
		const status = books[index].read
		
		books[index].changeStatus()
	}
	
	// Remove the book from the table and from the array.
	
	function removeBook(name, row) {
		const index = getBookIndex(name)
		books.splice(index, index)
		row.remove()
	}
	
	// Create a row for each book.
	// Each row needs a cell for every information about the book, a
	// delete button and a change read status button.
	
	function addBooksToTable() {
		books.forEach((book) => {
			let bookRow = document.createElement('tr')
					bookRow.classList.toggle('isBookRow')
					
			let bookDelete = createElement('', bookRow)
			let bookName = createElement(book.name, bookRow)
			let bookAuthor = createElement(book.author, bookRow)
			let bookPages = createElement(book.pages, bookRow)
			let bookRead = createElement('', bookRow)
			
			// Delete Book from table and array when clicked.
			
			let bookDeleteBtn = createElement('', bookDelete, 'button')
					bookDeleteBtn.addEventListener('click', () => 
																				 removeBook(book.name, bookRow))
								
			// Add a SVG Icon instead of text for both the delete button and the read one.
			
			let bookDeleteBtnImg = document.createElement('img')
					bookDeleteBtnImg.setAttribute('src', './assets/img/feather/trash-2.svg')
					bookDeleteBtnImg.setAttribute('alt', 'Delete Book')
					
			bookDeleteBtn.appendChild(bookDeleteBtnImg)
			
			let bookReadBtn = createElement('', bookRead, 'button')
			
			let bookReadBtnImg = document.createElement('img')
					bookReadBtnImg.setAttribute('src', getCorrectSVGIcon(book.read))
					bookReadBtnImg.setAttribute('alt', 'Change Book Read State')
					
			bookReadBtn.appendChild(bookReadBtnImg)
					
			// Change Book Read Status when clicked.
			
					bookReadBtn.addEventListener('click', () => {
						changeReadStatus(book.name, bookReadBtn, bookReadBtnImg)
						changeSVGIcon(bookReadBtnImg)
					})
					
			// Get the correct SVG Icon.
						
			container.appendChild(bookRow)
		})
	}
	
	addBooksToTable()
	
	function getCorrectSVGIcon(status) {
		return status ? './assets/img/feather/eye.svg' : './assets/img/feather/eye-off.svg'
	}
	
	function changeSVGIcon(img) {
		const imgSrc = img.getAttribute('src')
		if (imgSrc == './assets/img/feather/eye.svg') {
			img.setAttribute('src', './assets/img/feather/eye-off.svg')
		} else {
			img.setAttribute('src', './assets/img/feather/eye.svg')
		}
	}
	
	// Function that updates the table each time a new book is added.
	// It deletes each book rows and creates them anew.
	
	function updateTable() {
		const bookRows = container.querySelectorAll('.isBookRow')
					bookRows.forEach((row) => row.remove())
					
		addBooksToTable()
	}
	
	// Add a Book via the page.
	// We need a input for each needed book information: name, author
	// number of pages and read status.
	
	function addInput(str, id, name, parent, type = 'text') {
		let label = document.createElement('label')
				label.textContent = str
				label.setAttribute('for', id)
				
		let input = document.createElement('input')
				input.setAttribute('type', type)
				input.setAttribute('name', name)
				input.setAttribute('id', id)

		let li = document.createElement('li')
				li.appendChild(label)
				li.appendChild(input)
	
		parent.appendChild(li)
		return input
	}
	
	!function addBookForm() {
		const ulContainer = document.querySelector('.add-book')
		const ul = ulContainer.querySelector('ul')
		
		const inputName = addInput('Name', 'book-name', 'book-name', ul)
		const inputAuthor = addInput('Author', 'book-author', 'book-author', ul)
		const inputPages = addInput('Number of Pages', 'book-pages', 'book-pages', ul)
		const inputRead = addInput('Read Status', 'book-read', 'book-read', ul, 'checkbox')
		
		const inputArr = [inputName, inputAuthor, inputPages, inputRead]
		
		// Reset each input's value and unchecks the read status checkbox.
		
		function resetInput(arr = inputArr) {
			arr.forEach((el) => {
				if (el.getAttribute('type') == 'text') el.value = ''
				if (el.getAttribute('type') == 'checkbox') el.checked = false
			})
		}
		
		inputName.addEventListener('change', () => console.log(inputName.value))
	
		// When the button is submitted, a new object is created and the
		// updateTable() function is invoked.
		
		let submitButton = document.createElement('button')
				submitButton.textContent = 'Submit'
				submitButton.setAttribute('type', 'submit')
				submitButton.addEventListener('click', () => {
					addBookToLibrary(inputName.value, inputAuthor.value, inputPages.value, inputRead.checked)
					updateTable()
					resetInput()
				})
				
		let submitButtonLi = document.createElement('li')
				submitButtonLi.appendChild(submitButton)
				
		ul.appendChild(submitButtonLi)
	}()
}()
