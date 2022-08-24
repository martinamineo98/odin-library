
let books = []

class Book {
	
	constructor(name, author, pages, status) {
		this._name = name
		this._author = author
		this._pages = pages
		this._status = status
	}
	
	set name(x) {
		const str = 'Name Error: Length must be at least 1 character.'
		this._name = (x === '') ? str : x
	}
	
	get name() {
		const str = 'Name Error: The Name was never set.'
		return (this._name === '') ? str : this._name
	}
	
	set author(x) {
		const str = 'Author Name Error: Length must be at least 1 character.'
		this._author = (x === '') ? str : x
	}
	
	get author() {
		const str = 'Author Name Error: The Author Name was never set.'
		return (this._author === '') ? str : this._author
	}
	
	set pages(x) {
		const str = 'Page Number Error: The Page Number is not a number.'
		this._pages = (typeof x !== Number || typeof x.toString() !== Number) ? str : this._pages
	}
	
	get pages() {
		const str = 'Page Number Error: The Page Number was never set.'
		return (this._pages === '') ? str : this._pages
	}
	
	set status(x) {
		const str = 'Read Status Error: The Read Status is not a boolean.'
		this._status = (typeof x !== Boolean) ? str : this._status
	}
	
	get status() {
		const str = 'Read Status Error: The Read Status was never set.'
		return (this._status === '') ? str : this._status
	}
	
	// Change the Read Status of a book.
	
	get changeReadStatus() {
		this._status = (this._status) ? false : true
	}
	
	// Get the correct SVG Icon
	
	get getCorrectSVGIcon() {
		return this._status ? './assets/img/feather/eye.svg' : './assets/img/feather/eye-off.svg'
	}
	
}

const addBook = (name, author, pages, status) => {
	let book = new Book (name, author, pages, status)
	books.push(book)
}

addBook('The Hobbit', 'J.R.R. Tolkien', 310, false)
addBook('The Lord of The Rings', 'J.R.R. Tolkien', 1178, true)
addBook('The Silmarillion', 'J.R.R. Tolkien', 365, false)

// Helper Functions
// Just a bunch of functions to make my job a little easier.

const help = (function() {
	
	const containerTable = document.querySelector('tbody')
	const containerForm = document.querySelector('.add-book')
	
	const createElement = (content, parent, type = 'td') => {
		let element = document.createElement(type)
				element.textContent = content
		parent.appendChild(element)
		return element
	}
	
	const changeSVGIcon = (img) => {
		const src = img.getAttribute('src')
		if (src == './assets/img/feather/eye.svg') {
			img.setAttribute('src', './assets/img/feather/eye-off.svg')
		} else {
			img.setAttribute('src', './assets/img/feather/eye.svg')
		}
	}
	
	// Get the book's index in the books array.
	
	const getBookIndex = (x) => {
		return books.map((book) => book.name).indexOf(x)
	}
	
	return {
		createElement,
		changeSVGIcon,
		getBookIndex,
		containerTable,
		containerForm
	}
		
})()

// We need to create a form for the user to add their books to the
// library.

const createForm = (function() {
	const ul = document.querySelector('.add-book ul')
	
	const inputArr = []
	
	// A function to create multiple inputs and labels contained into
	// a <li> element.
	
	const addInput = (content, id, name, parent, type = 'text') => {
		const label = document.createElement('label')
					label.setAttribute('for', id)
					label.textContent = content
					
		const input = document.createElement('input')
					input.setAttribute('id', id)
					input.setAttribute('name', name)
					input.setAttribute('type', type)
		
		const li = document.createElement('li')
					li.appendChild(label)
					li.appendChild(input)
		
		parent.appendChild(li)
		inputArr.push(input)
		return input
	}
	
	// A function that resets the inputs.
	
	const resetInput = () => {
		inputArr.forEach((input) => {
			if (input.getAttribute('type') == 'text') input.value = ''
			if (input.getAttribute('type') == 'checkbox') input.checked = false
		})
	}
	
	// Inputs and Labels.
	
	const inputName = addInput('Name', 'book-name', 'book-name', ul)
	const inputAuthor = addInput('Author', 'book-author', 'book-author', ul)
	const inputPages = addInput('Pages', 'book-pages', 'book-pages', ul)
	const inputRead = addInput('Read Status', 'book-read', 'book-read', ul, 'checkbox')
	
	// Submit Button.
	
	const createSubmitBtn = (function() {
		const li = document.createElement('li')
		const btn = help.createElement('Submit', li, 'button')
					btn.setAttribute('type', 'submit')
					btn.addEventListener('click', () => {
						addBook(inputName.value, inputAuthor.value, inputPages.value, inputRead.checked)
						console.log(books)
						populateDOM.updateTable()
						resetInput()
				})
		help.containerForm.appendChild(li)
	})()
	
})()

const populateDOM = (function() {
	
	const populateTable = function() {
		books.forEach((book) => {
			
			// Create a row for each book.
			
			const row = document.createElement('tr')
						row.classList.toggle('isBookRow')
			
			const del = help.createElement('', row)
			const name = help.createElement(book.name, row)
			const author = help.createElement(book.author, row)
			const pages = help.createElement(book.pages, row)
			const status = help.createElement('', row)
			
			// Delete Button.
			
			const delBtn = help.createElement('', del, 'button')
						delBtn.addEventListener('click', () => {
							removeBook(book.name, row)
						})
						
			const delImg = document.createElement('img')
						delImg.setAttribute('src', './assets/img/feather/trash-2.svg')
						delImg.setAttribute('alt', 'Delete Book')
						
			delBtn.appendChild(delImg)
			
			// Change Read Status Button.
			
			const statusBtn = help.createElement('', status, 'button')
			const statusImg = document.createElement('img')
						statusImg.setAttribute('src', book.getCorrectSVGIcon)
						statusImg.setAttribute('alt', 'Change Book Read State')
						
			statusBtn.appendChild(statusImg)
						
			statusBtn.addEventListener('click', () => {
				changeReadStatus(book.name)
				help.changeSVGIcon(statusImg)
			})
			
			// Append the row to the table.
			
			help.containerTable.appendChild(row)
		})
		
	}
	
	populateTable()
	
	const changeReadStatus = (name) => {
		const index = help.getBookIndex(name)
		books[index].changeReadStatus
	}
	
	const removeBook = (name, row) => {
		const index = help.getBookIndex(name)
		books.splice(index, index)
		row.remove()
	}
	
	const updateTable = () => {
		const rows = help.containerTable.querySelectorAll('.isBookRow')
					rows.forEach((row) => row.remove())
		populateTable()
	}
	
	return {
		populateTable,
		updateTable
	}
	
})()
