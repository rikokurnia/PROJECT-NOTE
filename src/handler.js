const { nanoid } = require('nanoid'); //acces library nanoid
const notes = require('./notes');

    //nambahin data
const addNoteHandler = (request, h) => {
    const {title,tags,body} = request.payload;

    const id = nanoid(16); //value unique from nanoid
    const createdAt = new Date().toISOString(); //make data > shows calendar 
    const updatedAt = createdAt; //update data

        const newNote = {title,tags,body,id,createdAt,updatedAt}; //variable make newnote
    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0; //saw array note and make condition (true, false)

    if (isSuccess) {   //condiiton > for false and true added data
        const response = h.response({     //condition > true
          status: 'success',
          message: 'Catatan berhasil ditambahkan',
          data: {
            noteId: id,
          },
        });
        response.code(201);
        return response;
      }

      const response = h.response({       //condition > false
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
      });
      response.code(500);
      return response;
 };


  //show up data part 1
  const getAllNotesHandler = () => ({     //acces from path GET
    status: 'success',
    data: {
      notes,
    },
  });
  //show up data part 2
const getNoteByIdHandler = (request, h) => {  //acces from path GET by id (more spesific)
  const { id } = request.params;  //acces path spesific
 
  const note = notes.filter((n) => n.id === id)[0];  //saw array note and make condition (find, undefined)
 
 if (note !== undefined) {    //condiiton > for search data
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

    //For data ter-update
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
 
  const index = notes.findIndex((note) => note.id === id);
 
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
 
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

      //For Delete data
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const index = notes.findIndex((note) => note.id === id);
 
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
 
 const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

 module.exports = {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler};   //module exports
