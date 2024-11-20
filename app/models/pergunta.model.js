const mongoose = require('mongoose');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      disciplina: {
        sigla: { type: String, required: true },       // Sigla da disciplina (ex: "IAC001")
        nomeCompleto: { type: String, required: true }, // Nome completo da disciplina (ex: "Arquitetura e Organização de Computadores")
        cor: { type: String, required: false, match: /^#([0-9A-F]{3}){1,2}$/i } // Hexadecimal para cor da disciplina
      },
      tipo: { type: String, default: '' },
      GUID: { type: String, unique: true, required: true },
      E: { type: Number, default: 0 },
      Q_T: { type: Number, default: 5 },
      Q: { type: String, default: '' },
      T: { type: Number, default: null },
      I: { type: Number, default: null },
      A: { type: Number, default: null },
      C_A: { type: String, default: '' },
      A2: { type: String, default: '' },
      descricao: { type: String, default: '' },
      A3: { type: String, default: '' },
      A3_Why: { type: String, default: '' },
      A4: { type: String, default: '' },
      A4_Why: { type: String, default: '' },
      A5: { type: String, default: '' },
      A5_Why: { type: String, default: '' },
      C_S: { type: Number, default: 0 },
      S: { type: String, default: '' },
      R_T: { type: String, default: 'AddState' },
      R_I: { type: Number, default: 2 },
      R_A: { type: Number, default: 1 },
      P_T: { type: String, default: 'RemoveState' },
      P_I: { type: Number, default: 2 },
      P_A: { type: Number, default: 1 },
      O_L: { type: Number, default: 0 },
      usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
      arquivos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Arquivo' }]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Pergunta = mongoose.model("Pergunta", schema);
  return Pergunta;
};
