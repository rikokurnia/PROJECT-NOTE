const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler} = require('./handler'); //import dari file handler
  //make path
const routes = [{
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,    //handler path wich acces in handler
   options: {   //only acces cors from this path
      cors: {
        origin: ["*"],
      },
    },
},
    //get path
{
    method: 'GET',    
    path: '/notes',   //path not spesific and caused error
    handler: getAllNotesHandler,    //handler path wich acces in handler
  },
  {
    method: 'GET',
    path: '/notes/{id}',  //path better spesific
    handler: getNoteByIdHandler,    //handler path wich acces in handler
  },
    //update data
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
    //delete data
    {
      method: 'DELETE',
      path: '/notes/{id}',
      handler: deleteNoteByIdHandler,
    },
];

module.exports = routes;
