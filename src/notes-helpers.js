
export const findFolder = (folders = [], folderId) => {
  let folder;
  if (folders && folders.length > 0 && folderId) {
    folder = folders.find(folder => folder.id.toString() === folderId.toString())
  }
  return folder
}

export const findNote = (notes = [], noteId) => {
  let note;
  if (notes && notes.length > 0 && noteId) {
    note = notes.find(note => note.id.toString() === noteId.toString())
  }
  return note
}

export const getNotesForFolder = (notes = [], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId === folderId)
)

export const countNotesForFolder = (notes = [], folderId) =>
  notes.filter(note => note.folderId === folderId).length
