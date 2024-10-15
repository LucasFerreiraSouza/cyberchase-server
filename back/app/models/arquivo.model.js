const mongoose = require('mongoose');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nome: { type: String, unique: true }, // Nome do arquivo
      base64: { type: String }, // Armazena a string Base64 do arquivo
      pergunta: { type: mongoose.Schema.Types.ObjectId, ref: 'Pergunta' }
    },
    { timestamps: true }
  );

    // Criando índices
    schema.index({ pergunta: 1 }); // Índice no campo pergunta
    schema.index({ pergunta: 1, nome: 1 }); // Índice composto
    schema.index({ createdAt: -1 }); // Índice no campo createdAt

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Arquivo = mongoose.model("arquivo", schema);
  return Arquivo;
};
