const noteInput = document.getElementById("noteInput");
const saveBtn = document.getElementById("saveBtn");
const notesList = document.getElementById("notesList");

function loadNotes() {
  chrome.storage.local.get(["notes"], (result) => {
    const notes = result.notes || [];
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = note;
      span.className = "noteText"; 

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.className = "deleteBtn";
      deleteBtn.addEventListener("click", () => deleteNote(index));

      li.appendChild(span);
      li.appendChild(deleteBtn);
      notesList.appendChild(li);
    });
  });
}

function saveNote() {
  const newNote = noteInput.value.trim();
  if (newNote) {
    chrome.storage.local.get(["notes"], (result) => {
      const notes = result.notes || [];
      notes.push(newNote);
      chrome.storage.local.set({ notes }, loadNotes);
      noteInput.value = "";
    });
  }
}

function deleteNote(index) {
  chrome.storage.local.get(["notes"], (result) => {
    const notes = result.notes || [];
    notes.splice(index, 1);
    chrome.storage.local.set({ notes }, loadNotes);
  });
}

saveBtn.addEventListener("click", saveNote);
document.addEventListener("DOMContentLoaded", loadNotes);
