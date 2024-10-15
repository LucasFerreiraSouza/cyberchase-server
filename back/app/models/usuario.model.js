const mongoose = require('mongoose');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nome: { type: String, unique: true, required: true },
      email: { type: String, unique: true, required: true },
      senha: { type: String, required: true },
      
      // Alterado para array de objetos de disciplinas
      disciplinas: [{
        sigla: { type: String, required: true },
        nomeCompleto: { type: String, required: true },
        cor: { type: String, required: false, match: /^#([0-9A-F]{3}){1,2}$/i } // Hexadecimal para cor
      }],
      
      perguntas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pergunta' }]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Usuario = mongoose.model("Usuario", schema);
  return Usuario;
};
