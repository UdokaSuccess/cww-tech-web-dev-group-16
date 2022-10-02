const addNoteBtn = document.querySelector('.add-note')
 const noteContainer = document.querySelector('.note-app')


//to display the notes onload of the page
   getNotes().forEach(function(note) {
	// body...
	const noteItem = createNewNote(note.id, note.content)
	noteContainer.insertBefore(noteItem, addNoteBtn)

})

   // To convert the JSON to javascript object
	function getNotes() {
		// body...
		return JSON.parse(localStorage.getItem('noteLog-notes') || "[]")
	}

	// To save the notes, by converting the object to JSON
	function saveNote(notes) {
		// body...
		localStorage.setItem('noteLog-notes', JSON.stringify(notes))
	}

// To update a particular note
	function updateNote(id, addedContent) {
		// body...
		const notes = getNotes()
		const targetNote = notes.filter(note => note.id == id)[0]

		targetNote.content = addedContent
			saveNote(notes)
		}
// To create a New Note Element
	function createNewNote(id, content) {
		// body...
		const newNote = document.createElement("textarea")
		newNote.classList.add('text')
		newNote.value = content 
		newNote.placeholder = 'Enter a note'

		newNote.addEventListener('dblclick', function() {
			// body...
		const check = confirm("You are about to delete this note")
			if (check) {
				deleteNote(id, newNote)
			}
		})

		newNote.addEventListener('change', function() {
        //body
        console.log("saved")
        updateNote(id, newNote.value)			
		})


	 return newNote;
	}
	
   //To add note - get all notes, add a new one , resave all notes
        function addNote() {
		// body...
		const addnotes = getNotes()
		const addNoteObject = {
			id: Math.floor(Math.random() * 1000000),
			content: ""
				}
	   const noteItem = createNewNote(addNoteObject.id, addNoteObject.content)

	   noteContainer.insertBefore(noteItem, addNoteBtn)
       addnotes.push(addNoteObject)
       saveNote(addnotes)
	}


// To delete a particular note
	   function deleteNote(id, noteElement) {
		// body...
		console.log('deleted')
		const notes = getNotes().filter(note => note.id != id)

		saveNote(notes)
		noteContainer.removeChild(noteElement)
	}


