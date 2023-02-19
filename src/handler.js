const { nanoid } = require("nanoid");
const notes = require("./notes");

// membuat handler untuk membuat catatan
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  // membuat id dengan maksimal 16 karakter menggunakan nanoid
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };
  notes.push(newNote);

  //menentukan apakah note sudah dibuat dengan metode filter
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  //memastikan apakah note sudah dibuat
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

// handler untuk menampilkan catatan
const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

// handler untuk menampilkan detail catatan
const getNoteByIdHandler = (request, h) => {
  //mendapatkan nilai id dari request.params
  const { id } = request.params;

  //mendapatkan objek note dengan id dari object array notes
  const note = notes.filter((n) => n.id === id)[0];

  // mengembalikan fungsi handler dengan data objek note didalamnya, dengan memastikan note tidak bernilai undefined
  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

//membuat handler untuk mengubah catatan
const editNoteByIdHandler = (request, h) => {
  //mendapatkan nilai id dari request.params
  const { id } = request.params;

  //memdapatkan data notes terbaru yang dikirimkan oleh client
  const { title, tags, body } = request.payload;

  // memperbaharui nilai dari properti updateAt menjadi nilai terbaru
  const updateAt = new Date().toISOString();

  //mendapatkan index array pada object catatan sesuai id yang ditentukan menggunakan method array findIndex().
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };

    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbaharui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbaharui catatan. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// membuat handler untuk menghapus catatan
const deleteNoteByIdHandler = (request, h) => {
  // mendapatkan nilai id
  const {id} = request.params;

  //mendapatkan index catatan berdasarkan id
  const index = notes.findIndex((note) => note.id === id);

  // melakukan pengecekan terhadap nilai index, memastikan nilainya tidak -1. untuk menghapus data pada array berdasarkan index dapat menggunakan metode splice()
  if (index !== -1){
    notes.splice(index, 1);
    const response = h.response ({
      status : 'success',
      message : 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  // bila nilai index bernilai -1, handler yang dikemballikan akan direspon gagal
  const response = h.response ({
    status : 'fail',
    message : 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler
};
