const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require("./handler");

const routes = [
  // membuat route untuk menambahkan catatan
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
  },
  // membuat route untuk menampilkan catatan
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },
  //membuat route untuk menampilkan detail catatan
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteByIdHandler,
  },
  // membuat route agat note bisa di ubah
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteByIdHandler,
  },
  // membuat route untuk menghapus catatan
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
