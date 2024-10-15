// zipJogo.js
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function ziparPastaJogo() {
    const output = fs.createWriteStream(path.join(__dirname, '../../jogo.zip'));
    const archive = archiver('zip', {
        zlib: { level: 9 } // Definindo o nível de compressão
    });

    output.on('close', function () {
        console.log(`Arquivo ZIP criado com sucesso: ${archive.pointer()} total de bytes.`);
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);
    archive.directory(path.join(__dirname, '../../jogo'), false);
    archive.finalize();
}

module.exports = { ziparPastaJogo }; // Certifique-se de que esta linha está correta
