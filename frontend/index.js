import { backend } from 'declarations/backend';

let selectedPersonId = null;

async function addPerson(event) {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const contactDetails = document.getElementById('contactDetails').value;

    try {
        const personId = await backend.addPerson(firstName, lastName, address, contactDetails);
        document.getElementById('person-form').reset();
        await loadPeople();
    } catch (error) {
        console.error('Error adding person:', error);
    }
}

async function loadPeople() {
    try {
        const people = await backend.getAllPeople();
        const peopleList = document.getElementById('people');
        peopleList.innerHTML = '';
        people.forEach(person => {
            const li = document.createElement('li');
            li.textContent = `${person.firstName} ${person.lastName}`;
            li.onclick = () => loadPersonDetails(person.id);
            peopleList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading people:', error);
    }
}

async function loadPersonDetails(personId) {
    try {
        const person = await backend.getPerson(personId);
        if (person) {
            selectedPersonId = personId;
            const detailsSection = document.getElementById('person-details');
            detailsSection.style.display = 'block';
            const selectedPerson = document.getElementById('selected-person');
            selectedPerson.innerHTML = `
                <p><strong>Name:</strong> ${person.firstName || ''} ${person.lastName || ''}</p>
                <p><strong>Address:</strong> ${person.address || 'N/A'}</p>
                <p><strong>Contact:</strong> ${person.contactDetails || 'N/A'}</p>
            `;
            await loadNotes(personId);
            await loadComments(personId);
        } else {
            console.error('Person not found');
        }
    } catch (error) {
        console.error('Error loading person details:', error);
    }
}

async function loadNotes(personId) {
    try {
        const notes = await backend.getNotesForPerson(personId);
        const notesList = document.getElementById('notes');
        notesList.innerHTML = '';
        notes.forEach(note => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h4>${note.title || 'Untitled'}</h4>
                <p>${note.content || ''}</p>
                <small>${new Date(Number(note.creationDate) / 1000000).toLocaleString()}</small>
            `;
            notesList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading notes:', error);
    }
}

async function addNote(event) {
    event.preventDefault();
    if (!selectedPersonId) return;

    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    try {
        await backend.addNote(selectedPersonId, title, content);
        document.getElementById('note-form').reset();
        await loadNotes(selectedPersonId);
    } catch (error) {
        console.error('Error adding note:', error);
    }
}

async function loadComments(personId) {
    try {
        const comments = await backend.getCommentsForPerson(personId);
        const commentsList = document.getElementById('comments');
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const li = document.createElement('li');
            li.innerHTML = `
                <p>${comment.content || ''}</p>
                <small>${new Date(Number(comment.creationDate) / 1000000).toLocaleString()}</small>
            `;
            commentsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading comments:', error);
    }
}

async function addComment(event) {
    event.preventDefault();
    if (!selectedPersonId) return;

    const content = document.getElementById('commentContent').value;

    try {
        await backend.addComment(selectedPersonId, content);
        document.getElementById('comment-form').reset();
        await loadComments(selectedPersonId);
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}

window.onload = () => {
    loadPeople();
    document.getElementById('person-form').onsubmit = addPerson;
    document.getElementById('note-form').onsubmit = addNote;
    document.getElementById('comment-form').onsubmit = addComment;
};
