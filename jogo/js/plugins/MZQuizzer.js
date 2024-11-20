//=============================================================================
// MZ-Quiz-Engine.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v0.0.1 Quiz Engine for MZ
 * @author Starbird
 * @help MZ-Quiz-Engine.js
 *
 * Basic Quiz Engine for RPG Maker MZ
 *
 * @command getQuestionExerciseIAC001
 * @command getQuestionExerciseIAL002
 * @command getQuestionExerciseILM001
 * @command getQuestionExerciseISI002
 * @command getQuestionExerciseMMD001
 * @command getQuestionExerciseAAG001
 * @command getQuestionExerciseILP010
 * @command getQuestionExerciseILP029
 * @command getQuestionExerciseLPO001
 * @command getQuestionExerciseMCA002
 * @command getQuestionExerciseCCG001
 * @command getQuestionExerciseIED001
 * @command getQuestionExerciseIHC001
 * @command getQuestionExerciseIHW100
 * @command getQuestionExerciseISO100
 * @command getQuestionExerciseLIN100
 * @command getQuestionExerciseCEF100
 * @command getQuestionExerciseIBD002
 * @command getQuestionExerciseIES100
 * @command getQuestionExerciseILP007
 * @command getQuestionExerciseISO200
 * @command getQuestionExerciseLIN200
 * @command getQuestionExerciseHST002
 * @command getQuestionExerciseIBD100
 * @command getQuestionExerciseIES200
 * @command getQuestionExerciseILP023
 * @command getQuestionExerciseISD001
 * @command getQuestionExerciseLIN300
 * @command getQuestionExerciseMET100
 * @command getQuestionExerciseAGO005
 * @command getQuestionExerciseIES300
 * @command getQuestionExerciseIRC008
 * @command getQuestionExerciseISG003
 * @command getQuestionExerciseLIN400
 * @command getQuestionExerciseMPL001
 * @command getQuestionExerciseAGR101
 * @command getQuestionExerciseCEE002
 * @command getQuestionExerciseIES301
 * @command getQuestionExerciseIRC100
 * @command getQuestionExerciseITE002
 * @command getQuestionExerciseLIN500
 * @command getQuestionExerciseTTG001
 * @command getQuestionExerciseTTG003
 * @command getQuestionExerciseHSO003
 * @command getQuestionExerciseIIA002
 * @command getQuestionExerciseISA002
 * @command getQuestionExerciseITI004
 * @command getQuestionExerciseLIN600
 * @command getQuestionExerciseTES001
 * @command getQuestionExerciseTTG103
 * 
 * @command getQuestionTeachingIAC001
 * @command getQuestionTeachingIAL002
 * @command getQuestionTeachingILM001
 * @command getQuestionTeachingISI002
 * @command getQuestionTeachingMMD001
 * @command getQuestionTeachingAAG001
 * @command getQuestionTeachingILP010
 * @command getQuestionTeachingILP029
 * @command getQuestionTeachingLPO001
 * @command getQuestionTeachingMCA002
 * @command getQuestionTeachingCCG001
 * @command getQuestionTeachingIED001
 * @command getQuestionTeachingIHC001
 * @command getQuestionTeachingIHW100
 * @command getQuestionTeachingISO100
 * @command getQuestionTeachingLIN100
 * @command getQuestionTeachingCEF100
 * @command getQuestionTeachingIBD002
 * @command getQuestionTeachingIES100
 * @command getQuestionTeachingILP007
 * @command getQuestionTeachingISO200
 * @command getQuestionTeachingLIN200
 * @command getQuestionTeachingHST002
 * @command getQuestionTeachingIBD100
 * @command getQuestionTeachingIES200
 * @command getQuestionTeachingILP023
 * @command getQuestionTeachingISD001
 * @command getQuestionTeachingLIN300
 * @command getQuestionTeachingMET100
 * @command getQuestionTeachingAGO005
 * @command getQuestionTeachingIES300
 * @command getQuestionTeachingIRC008
 * @command getQuestionTeachingISG003
 * @command getQuestionTeachingLIN400
 * @command getQuestionTeachingMPL001
 * @command getQuestionTeachingAGR101
 * @command getQuestionTeachingCEE002
 * @command getQuestionTeachingIES301
 * @command getQuestionTeachingIRC100
 * @command getQuestionTeachingITE002
 * @command getQuestionTeachingLIN500
 * @command getQuestionTeachingTTG001
 * @command getQuestionTeachingTTG003
 * @command getQuestionTeachingHSO003
 * @command getQuestionTeachingIIA002
 * @command getQuestionTeachingISA002
 * @command getQuestionTeachingITI004
 * @command getQuestionTeachingLIN600
 * @command getQuestionTeachingTES001
 * @command getQuestionTeachingTTG103
 * 
 * @desc This pulls the next question from questionDatabase.js
 *
 * @help Please see MZ Quizzer documentation for more help. 
 *
 * Game VARIABLES and SWITCHES begin at 991 and are reserved up to 999 
 * for this plugin. 
 *
 * Game Switch 991 - Switch that activates upon correct answer response
 *
 * Game Switch 992 - Switch that activates upon wrong answer response
 *
 * Game Variable 991 - stores text input strings 
 * for answering Short Answer questions. 
 * 
 * Game Variable 992 - the current question number and determines which 
 * question to pull next from the database. 
 *
 * Game Variable 993 - total number of correct answers. 
 *
 * Game Variable 994 - total number of wrong answers. 
 *
 * Game Variable 995 - Question Timer Result. 
 *
 * Game Variable 996 - Streak Count (correct answers in a row). 
 *
 * Game Variable 997 - Slump Count (wrong answers in a row). 
 *
 * Game Variable 998 - Reward ID. 
 *
 * Game Variable 999 - Reward Amount.
 *
 * Game Variable 1000 - Incorrect Answer Explanation Text 
 *
 * PICTURES 96, 97, 98, and 99 are used. DO NOT USE THESE PICTURE NUMBERS.
 * 
 * CREDITS
 * Text Input adapted from darkkitten's CMDInput.js
 * Text instant display adapted from Jatopian's InstantText.js 
 * Force-cancel on timer expiration adapted from HIME_TimedChoiceSelection.js himeworks.com
 * Force-stop audio on answer completion adapted from Chaucer's Stop Sound Clip 
 * All plugins adapted and used in compliance with respective Terms of Use.
 *  
 */
 

Scene_MenuBase.prototype.createBackground = function() {
    this._backgroundFilter = new PIXI.filters.BlurFilter, this._backgroundSprite = new Sprite, this._backgroundSprite.bitmap = SceneManager.backgroundBitmap(), this._backgroundSprite.filters = [this._backgroundFilter], this.addChild(this._backgroundSprite), this.setBackgroundOpacity(0)
};
const pluginName = "MZQuizzer";


function Scene_TextInput() {
    this.initialize(...arguments)
}

function Window_TextEdit() {
    this.initialize(...arguments)
}

function Window_TextInput() {
    this.initialize(...arguments)
}

function calculateAverage(e, t) {
    let s = e / (t + 1) * 100;
    return s = +s.toFixed(2), s
}

function stringDivider(e, t, s) {
    if (e.length > t) {
        for (var a = t; 0 < a && " " != e[a]; a--);
        if (0 < a) return e.substring(0, a) + s + stringDivider(e.substring(a + 1), t, s)
    }
    return e
}

function rotHex(e) {
    var t = e => "䷏䷙䷒䷲䷋䷎䷅䷌䷠䷺䷵䷘䷆䷥䷛䷡䷑䷔䷪䷃䷊䷖䷝䷓䷁䷱䷄䷴䷀䷇䷳䷗䷩䷟䷮䷈䷹䷜䷯䷍䷿䷶䷸䷢䷚䷂䷕䷣䷭䷨䷦䷧䷉䷾䷷䷤䷰䷐䷽䷼䷻䷫䷞䷬=".indexOf(e);
    return e.split("").map(e => -1 < t(e) ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890+/=" [t(e)] : e).join("")
}

// Definição da função replaceAll
function replaceAll(string, pattern, replacement) {
    // Utiliza expressão regular global para substituir todas as ocorrências
    return string.replace(new RegExp(pattern, 'g'), replacement);
}

//-------------------------------------------getQuestionExercise-----------------------------------------


// Código JavaScript como string
var getQuestionExercise = "function getQuestionExerciseIAC001(e) {\n    var foundQuestionIAC001 = false;\n    var i = e;\n    while (!foundQuestionIAC001 && i < questionDatabase.Questions.length) {\n        // Verificar se a pergunta é da disciplina \"IAC001\" e tem \"tipo\" igual a \"exercicio\"\n        if (questionDatabase.Questions[i].disciplina.sigla === \"IAC001\" && questionDatabase.Questions[i].tipo === \"exercicio\") {\n            // Adicionar aqui a lógica para processar perguntas específicas da disciplina \"IAC001\"\n            console.log(\"Pergunta IAC001\");\n            // Lógica para processar perguntas específicas da disciplina \"IAC001\"\n            var t = questionDatabase.Questions[i].T;\n            questionDatabase.Questions[i].Q_T;\n            if (t > 1) setChoiceTimer(t);\n            var s, a;\n            questionDatabase.Questions[i].I;\n            switch (1 == questionDatabase.Questions[i].E ? (s = questionDatabase.Questions[i].Q, console.log(s), s = rotHex(s), s = atob(s)) : (s = questionDatabase.Questions[i].Q, console.log(s)), questionDatabase.Questions[i].Q_T) {\n                case 1:\n                    a = 200 < s.length ? stringDivider(s = \"}\" + s, 95, \"\\n\") : stringDivider(s, 56, \"\\n\"), window.formattedQuestion = a, askShortAnswerQuestion(i, a);\n                    break;\n                case 2:\n                    a = 200 < s.length ? stringDivider(s = \"}\" + s, 95, \"\\n\") : stringDivider(s, 56, \"\\n\"), askMultipleChoiceQuestion2(i, a);\n                    break;\n                case 3:\n                    a = 200 < s.length ? stringDivider(s = \"}\" + s, 95, \"\\n\") : stringDivider(s, 56, \"\\n\"), askMultipleChoiceQuestion3(i, a);\n                    break;\n                case 4:\n                    a = 200 < s.length ? stringDivider(s = \"}\" + s, 95, \"\\n\") : stringDivider(s, 56, \"\\n\"), askMultipleChoiceQuestion4(i, a);\n                    break;\n                case 5:\n                    a = 200 < s.length ? stringDivider(s = \"}\" + s, 95, \"\\n\") : stringDivider(s, 56, \"\\n\"), askMultipleChoiceQuestion5(i, a);\n                    break;\n                case 9:\n                    a = 200 < s.length ? stringDivider(s = \"}\" + s, 95, \"\\n\") : stringDivider(s, 56, \"\\n\"), askTrueOrFalseQuestion(i, a);\n                    break;\n                default:\n                    console.log(\"check question type for question #\" + i + \" in database\")\n            }\n            foundQuestionIAC001 = true;\n        }\n        i++; // Ir para a próxima pergunta\n    }\n\n    // Se não encontrou nenhuma pergunta de IAC001 com \"tipo\" igual a \"exercicio\", exibir uma mensagem de erro\n    if (!foundQuestionIAC001) {\n        console.log(\"Nenhuma pergunta de IAC001 com tipo igual a 'exercicio' encontrada após a pergunta atual.\");\n    }\n}\n\nPluginManager.registerCommand(pluginName, \"getQuestionExerciseIAC001\", e => {\n    $gameScreen.erasePicture(99), $gameScreen.erasePicture(98), $gameScreen.erasePicture(97), $gameScreen.erasePicture(96), $gameScreen.erasePicture(95), $gameSwitches.setValue(991, !1), $gameSwitches.setValue(992, !1), $gameVariables.setValue(1e3, 0);\n    var currentQuestionIndex = $gameVariables.value(992);\n    var totalQuestions = questionDatabase.Questions.length;\n    \n    // Embaralhar as perguntas aleatoriamente\n    questionDatabase.Questions.sort(() => Math.random() - 0.5);\n\n    // Exibir o total de perguntas apenas uma vez antes de entrar no loop\n    console.log(\"Total de perguntas:\", totalQuestions);\n    \n    // Se chegou ao final da lista de perguntas, voltar para o início\n    if (currentQuestionIndex >= totalQuestions) {\n        currentQuestionIndex = 0;\n        console.log(\"Restarting question index. Current question index:\", currentQuestionIndex);\n        \n    }\n    \n    // Variável para controlar se encontrou alguma pergunta da disciplina \"IAC001\" com \"tipo\" igual a \"exercicio\"\n    var foundQuestionIAC001 = false;\n    \n    // Loop para encontrar a próxima pergunta da disciplina \"IAC001\" com \"tipo\" igual a \"exercicio\"\n    for (var i = currentQuestionIndex; i < totalQuestions; i++) {\n        // Verificar se a próxima pergunta é da disciplina \"IAC001\" e tem \"tipo\" igual a \"exercicio\"\n        if (questionDatabase.Questions[i].disciplina.sigla === \"IAC001\" && questionDatabase.Questions[i].tipo === \"exercicio\") {\n            console.log(\"Número da pergunta:\", i);\n            // Definir a variável questionNumber\n            window.questionNumber = i;\n            getQuestionExerciseIAC001(i); // Chamar a função getQuestionExerciseIAC001 com o índice da pergunta\n            \n            // Marcar que encontrou uma pergunta de IAC001 com \"tipo\" igual a \"exercicio\"\n            foundQuestionIAC001 = true;\n            \n            // Sair do loop após encontrar a primeira pergunta de IAC001 com \"tipo\" igual a \"exercicio\"\n            break;\n        }\n    }\n    \n    // Se não encontrou nenhuma pergunta de IAC001 com \"tipo\" igual a \"exercicio\", reiniciar o índice\n    if (!foundQuestionIAC001) {\n        console.log(\"Nenhuma pergunta de IAC001 com tipo igual a 'exercicio' encontrada após a pergunta atual.\");\n        console.log(\"Restarting question index.\");\n        \n        // Definir o índice atual como 0 para começar novamente do início\n        currentQuestionIndex = 0;\n        \n        // Variável para controlar se encontrou alguma pergunta de IAC001 com \"tipo\" igual a \"exercicio\" após reiniciar\n        var foundAfterRestart = false;\n        \n        // Loop para encontrar a próxima pergunta da disciplina \"IAC001\" com \"tipo\" igual a \"exercicio\" após reiniciar\n        for (var i = currentQuestionIndex; i < totalQuestions; i++) {\n            // Verificar se a próxima pergunta é da disciplina \"IAC001\" e tem \"tipo\" igual a \"exercicio\"\n            if (questionDatabase.Questions[i].disciplina.sigla === \"IAC001\" && questionDatabase.Questions[i].tipo === \"exercicio\") {\n                console.log(\"Número da pergunta:\", i);\n                // Definir a variável questionNumber\n                window.questionNumber = i;\n                getQuestionExerciseIAC001(i); // Chamar a função getQuestionExerciseIAC001 com o índice da pergunta\n                \n                // Marcar que encontrou uma pergunta de IAC001 com \"tipo\" igual a \"exercicio\" após reiniciar\n                foundAfterRestart = true;\n                \n                // Sair do loop após encontrar a primeira pergunta de IAC001 com \"tipo\" igual a \"exercicio\" após reiniciar\n                break;\n            }\n        }\n        \n        // Se não encontrou nenhuma pergunta de IAC001 com \"tipo\" igual a \"exercicio\" após reiniciar, imprimir uma mensagem de erro\n        if (!foundAfterRestart) {\n            console.log(\"Nenhuma pergunta de IAC001 com tipo igual a 'exercicio' encontrada após reiniciar.\");\n        }\n    }\n\n    \n    // Atualizar o índice da pergunta atual\n    $gameVariables.setValue(992, currentQuestionIndex);\n\n});";

// Definição da função IAC001
function IAC001(disciplina = 'IAC001', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IAC001();

// Definição da função IAL002
function IAL002(disciplina = 'IAL002', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IAL002();


// Definição da função ILM001
function ILM001(disciplina = 'ILM001', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ILM001();


// Definição da função ISI002
function ISI002(disciplina = 'ISI002', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ISI002();

// Definição da função MMD001
function MMD001(disciplina = 'MMD001', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
MMD001();

// Definição da função AAG001
function AAG001(disciplina = 'AAG001', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
AAG001();

// Definição da função ILP010
function ILP010(disciplina = 'ILP010', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ILP010();

// Definição da função ILP029
function ILP029(disciplina = 'ILP029', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ILP029();

// Definição da função LPO001
function LPO001(disciplina = 'LPO001', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
LPO001();

// Definição da função MCA002
function MCA002(disciplina = 'MCA002', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
MCA002();

// Definição da função CCG001
function CCG001(disciplina = 'CCG001', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
CCG001();

// Definição da função IED001
function IED001(disciplina = 'IED001', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IED001();

// Definição da função IHC001
function IHC001(disciplina = 'IHC001', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IHC001();

// Definição da função IHW100
function IHW100(disciplina = 'IHW100', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IHW100();

// Definição da função ISO100
function ISO100(disciplina = 'ISO100', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ISO100();

// Definição da função LIN100
function LIN100(disciplina = 'LIN100', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
LIN100();

// Definição da função CEF100
function CEF100(disciplina = 'CEF100', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
CEF100();

// Definição da função IBD002
function IBD002(disciplina = 'IBD002', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IBD002();

// Definição da função IES100
function IES100(disciplina = 'IES100', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IES100();

// Definição da função ILP007
function ILP007(disciplina = 'ILP007', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ILP007();

// Definição da função ISO200
function ISO200(disciplina = 'ISO200', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ISO200();

// Definição da função LIN200
function LIN200(disciplina = 'LIN200', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
LIN200();

// Definição da função HST002
function HST002(disciplina = 'HST002', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
HST002();

// Definição da função IBD100
function IBD100(disciplina = 'IBD100', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IBD100();

// Definição da função IES200
function IES200(disciplina = 'IES200', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IES200();

// Definição da função ILP023
function ILP023(disciplina = 'ILP023', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ILP023();

// Definição da função ISD001
function ISD001(disciplina = 'ISD001', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ISD001();

// Definição da função LIN300
function LIN300(disciplina = 'LIN300', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
LIN300();

// Definição da função MET100
function MET100(disciplina = 'MET100', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
MET100();

// Definição da função AGO005
function AGO005(disciplina = 'AGO005', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
AGO005();

// Definição da função IES300
function IES300(disciplina = 'IES300', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IES300();

// Definição da função IRC008
function IRC008(disciplina = 'IRC008', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IRC008();

// Definição da função ISG003
function ISG003(disciplina = 'ISG003', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ISG003();

// Definição da função LIN400
function LIN400(disciplina = 'LIN400', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
LIN400();

// Definição da função MPL001
function MPL001(disciplina = 'MPL001', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
MPL001();

// Definição da função AGR101
function AGR101(disciplina = 'AGR101', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
AGR101();

// Definição da função CEE002
function CEE002(disciplina = 'CEE002', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
CEE002();

// Definição da função IES301
function IES301(disciplina = 'IES301', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IES301();

// Definição da função IRC100
function IRC100(disciplina = 'IRC100', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IRC100();

// Definição da função ITE002
function ITE002(disciplina = 'ITE002', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ITE002();

// Definição da função LIN500
function LIN500(disciplina = 'LIN500', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
LIN500();

// Definição da função TTG001
function TTG001(disciplina = 'TTG001', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
TTG001();

// Definição da função TTG003
function TTG003(disciplina = 'TTG003', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
TTG003();

// Definição da função HSO003
function HSO003(disciplina = 'HSO003', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
HSO003();

// Definição da função IIA002
function IIA002(disciplina = 'IIA002', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IIA002();

// Definição da função ISA002
function ISA002(disciplina = 'ISA002', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ISA002();

// Definição da função ITI004
function ITI004(disciplina = 'ITI004', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ITI004();

// Definição da função LIN600
function LIN600(disciplina = 'LIN600', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
LIN600();

// Definição da função TES001
function TES001(disciplina = 'TES001', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
TES001();

// Definição da função TTG103
function TTG103(disciplina = 'TTG103', tipo = 'exercicio') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionExercise, "IAC001", disciplina);
    // Substitui todas as ocorrências de "exercicio" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"exercicio\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
TTG103();

//-------------------------------------------getQuestionTeaching-----------------------------------------


// Código JavaScript como string
var getQuestionTeaching = "function getQuestionTeachingIAC001(e) {\n    var foundQuestionIAC001 = false;\n    var i = e;\n    while (!foundQuestionIAC001 && i < questionDatabase.Questions.length) {\n        // Verificar se a pergunta é da disciplina \"IAC001\" e tem \"tipo\" igual a \"ensino\"\n        if (questionDatabase.Questions[i].disciplina.sigla === \"IAC001\" && questionDatabase.Questions[i].tipo === \"ensino\") {\n            // Adicionar aqui a lógica para processar perguntas específicas da disciplina \"IAC001\"\n            console.log(\"Pergunta IAC001\");\n            // Lógica para processar perguntas específicas da disciplina \"IAC001\"\n            var t = questionDatabase.Questions[i].T;\n            questionDatabase.Questions[i].Q_T;\n            if (t > 1) setChoiceTimer(t);\n            var s, a;\n            questionDatabase.Questions[i].I;\n            switch (1 == questionDatabase.Questions[i].E ? (s = questionDatabase.Questions[i].Q, console.log(s), s = rotHex(s), s = atob(s)) : (s = questionDatabase.Questions[i].Q, console.log(s)), questionDatabase.Questions[i].Q_T) {\n                case 1:\n                    a = 200 < s.length ? stringDivider(s = \"}\" + s, 95, \"\\n\") : stringDivider(s, 56, \"\\n\"), window.formattedQuestion = a, askShortAnswerQuestion(i, a);\n                    break;\n                case 2:\n                    a = 200 < s.length ? stringDivider(s = \"}\" + s, 95, \"\\n\") : stringDivider(s, 56, \"\\n\"), askMultipleChoiceQuestion2(i, a);\n                    break;\n                case 3:\n                    a = 200 < s.length ? stringDivider(s = \"}\" + s, 95, \"\\n\") : stringDivider(s, 56, \"\\n\"), askMultipleChoiceQuestion3(i, a);\n                    break;\n                case 4:\n                    a = 200 < s.length ? stringDivider(s = \"}\" + s, 95, \"\\n\") : stringDivider(s, 56, \"\\n\"), askMultipleChoiceQuestion4(i, a);\n                    break;\n                case 5:\n                    a = 200 < s.length ? stringDivider(s = \"}\" + s, 95, \"\\n\") : stringDivider(s, 56, \"\\n\"), askMultipleChoiceQuestion5(i, a);\n                    break;\n                case 9:\n                    a = 200 < s.length ? stringDivider(s = \"}\" + s, 95, \"\\n\") : stringDivider(s, 56, \"\\n\"), askTrueOrFalseQuestion(i, a);\n                    break;\n                default:\n                    console.log(\"check question type for question #\" + i + \" in database\")\n            }\n            foundQuestionIAC001 = true;\n        }\n        i++; // Ir para a próxima pergunta\n    }\n\n    // Se não encontrou nenhuma pergunta de IAC001 com \"tipo\" igual a \"ensino\", exibir uma mensagem de erro\n    if (!foundQuestionIAC001) {\n        console.log(\"Nenhuma pergunta de IAC001 com tipo igual a 'ensino' encontrada após a pergunta atual.\");\n    }\n}\n\nPluginManager.registerCommand(pluginName, \"getQuestionTeachingIAC001\", e => {\n    $gameScreen.erasePicture(99), $gameScreen.erasePicture(98), $gameScreen.erasePicture(97), $gameScreen.erasePicture(96), $gameScreen.erasePicture(95), $gameSwitches.setValue(991, !1), $gameSwitches.setValue(992, !1), $gameVariables.setValue(1e3, 0);\n    var currentQuestionIndex = $gameVariables.value(992);\n    var totalQuestions = questionDatabase.Questions.length;\n    \n    // Embaralhar as perguntas aleatoriamente\n    questionDatabase.Questions.sort(() => Math.random() - 0.5);\n\n    // Exibir o total de perguntas apenas uma vez antes de entrar no loop\n    console.log(\"Total de perguntas:\", totalQuestions);\n    \n    // Se chegou ao final da lista de perguntas, voltar para o início\n    if (currentQuestionIndex >= totalQuestions) {\n        currentQuestionIndex = 0;\n        console.log(\"Restarting question index. Current question index:\", currentQuestionIndex);\n        \n    }\n    \n    // Variável para controlar se encontrou alguma pergunta da disciplina \"IAC001\" com \"tipo\" igual a \"ensino\"\n    var foundQuestionIAC001 = false;\n    \n    // Loop para encontrar a próxima pergunta da disciplina \"IAC001\" com \"tipo\" igual a \"ensino\"\n    for (var i = currentQuestionIndex; i < totalQuestions; i++) {\n        // Verificar se a próxima pergunta é da disciplina \"IAC001\" e tem \"tipo\" igual a \"ensino\"\n        if (questionDatabase.Questions[i].disciplina.sigla === \"IAC001\" && questionDatabase.Questions[i].tipo === \"ensino\") {\n            console.log(\"Número da pergunta:\", i);\n            // Definir a variável questionNumber\n            window.questionNumber = i;\n            getQuestionTeachingIAC001(i); // Chamar a função getQuestionTeachingIAC001 com o índice da pergunta\n            \n            // Marcar que encontrou uma pergunta de IAC001 com \"tipo\" igual a \"ensino\"\n            foundQuestionIAC001 = true;\n            \n            // Sair do loop após encontrar a primeira pergunta de IAC001 com \"tipo\" igual a \"ensino\"\n            break;\n        }\n    }\n    \n    // Se não encontrou nenhuma pergunta de IAC001 com \"tipo\" igual a \"ensino\", reiniciar o índice\n    if (!foundQuestionIAC001) {\n        console.log(\"Nenhuma pergunta de IAC001 com tipo igual a 'ensino' encontrada após a pergunta atual.\");\n        console.log(\"Restarting question index.\");\n        \n        // Definir o índice atual como 0 para começar novamente do início\n        currentQuestionIndex = 0;\n        \n        // Variável para controlar se encontrou alguma pergunta de IAC001 com \"tipo\" igual a \"ensino\" após reiniciar\n        var foundAfterRestart = false;\n        \n        // Loop para encontrar a próxima pergunta da disciplina \"IAC001\" com \"tipo\" igual a \"ensino\" após reiniciar\n        for (var i = currentQuestionIndex; i < totalQuestions; i++) {\n            // Verificar se a próxima pergunta é da disciplina \"IAC001\" e tem \"tipo\" igual a \"ensino\"\n            if (questionDatabase.Questions[i].disciplina.sigla === \"IAC001\" && questionDatabase.Questions[i].tipo === \"ensino\") {\n                console.log(\"Número da pergunta:\", i);\n                // Definir a variável questionNumber\n                window.questionNumber = i;\n                getQuestionTeachingIAC001(i); // Chamar a função getQuestionTeachingIAC001 com o índice da pergunta\n                \n                // Marcar que encontrou uma pergunta de IAC001 com \"tipo\" igual a \"ensino\" após reiniciar\n                foundAfterRestart = true;\n                \n                // Sair do loop após encontrar a primeira pergunta de IAC001 com \"tipo\" igual a \"ensino\" após reiniciar\n                break;\n            }\n        }\n        \n        // Se não encontrou nenhuma pergunta de IAC001 com \"tipo\" igual a \"ensino\" após reiniciar, imprimir uma mensagem de erro\n        if (!foundAfterRestart) {\n            console.log(\"Nenhuma pergunta de IAC001 com tipo igual a 'ensino' encontrada após reiniciar.\");\n        }\n    }\n\n    \n    // Atualizar o índice da pergunta atual\n    $gameVariables.setValue(992, currentQuestionIndex);\n\n});";

// Definição da função IAC001
function IAC001_(disciplina = 'IAC001', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IAC001_();

// Definição da função IAL002
function IAL002_(disciplina = 'IAL002', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IAL002_();


// Definição da função ILM001
function ILM001_(disciplina = 'ILM001', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ILM001_();


// Definição da função ISI002
function ISI002_(disciplina = 'ISI002', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ISI002_();

// Definição da função MMD001
function MMD001_(disciplina = 'MMD001', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
MMD001_();

// Definição da função AAG001
function AAG001_(disciplina = 'AAG001', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
AAG001_();

// Definição da função ILP010
function ILP010_(disciplina = 'ILP010', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ILP010_();

// Definição da função ILP029
function ILP029_(disciplina = 'ILP029', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ILP029_();

// Definição da função LPO001
function LPO001_(disciplina = 'LPO001', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
LPO001_();

// Definição da função MCA002
function MCA002_(disciplina = 'MCA002', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
MCA002_();

// Definição da função CCG001
function CCG001_(disciplina = 'CCG001', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
CCG001_();

// Definição da função IED001
function IED001_(disciplina = 'IED001', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IED001_();

// Definição da função IHC001
function IHC001_(disciplina = 'IHC001', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IHC001_();

// Definição da função IHW100
function IHW100_(disciplina = 'IHW100', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IHW100_();

// Definição da função ISO100
function ISO100_(disciplina = 'ISO100', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ISO100_();

// Definição da função LIN100
function LIN100_(disciplina = 'LIN100', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
LIN100_();

// Definição da função CEF100
function CEF100_(disciplina = 'CEF100', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
CEF100_();

// Definição da função IBD002
function IBD002_(disciplina = 'IBD002', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IBD002_();

// Definição da função IES100
function IES100_(disciplina = 'IES100', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IES100_();

// Definição da função ILP007
function ILP007_(disciplina = 'ILP007', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ILP007_();

// Definição da função ISO200
function ISO200_(disciplina = 'ISO200', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ISO200_();

// Definição da função LIN200
function LIN200_(disciplina = 'LIN200', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
LIN200_();

// Definição da função HST002
function HST002_(disciplina = 'HST002', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
HST002_();

// Definição da função IBD100
function IBD100_(disciplina = 'IBD100', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IBD100_();

// Definição da função IES200
function IES200_(disciplina = 'IES200', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IES200_();

// Definição da função ILP023
function ILP023_(disciplina = 'ILP023', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ILP023_();

// Definição da função ISD001
function ISD001_(disciplina = 'ISD001', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ISD001_();

// Definição da função LIN300
function LIN300_(disciplina = 'LIN300', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
LIN300_();

// Definição da função MET100
function MET100_(disciplina = 'MET100', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
MET100_();

// Definição da função AGO005
function AGO005_(disciplina = 'AGO005', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
AGO005_();

// Definição da função IES300
function IES300_(disciplina = 'IES300', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IES300_();

// Definição da função IRC008
function IRC008_(disciplina = 'IRC008', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IRC008_();

// Definição da função ISG003
function ISG003_(disciplina = 'ISG003', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ISG003_();

// Definição da função LIN400
function LIN400_(disciplina = 'LIN400', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
LIN400_();

// Definição da função MPL001
function MPL001_(disciplina = 'MPL001', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
MPL001_();

// Definição da função AGR101
function AGR101_(disciplina = 'AGR101', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
AGR101_();

// Definição da função CEE002
function CEE002_(disciplina = 'CEE002', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
CEE002_();

// Definição da função IES301
function IES301_(disciplina = 'IES301', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IES301_();

// Definição da função IRC100
function IRC100_(disciplina = 'IRC100', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IRC100_();

// Definição da função ITE002
function ITE002_(disciplina = 'ITE002', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ITE002_();

// Definição da função LIN500
function LIN500_(disciplina = 'LIN500', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
LIN500_();

// Definição da função TTG001
function TTG001_(disciplina = 'TTG001', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
TTG001_();

// Definição da função TTG003
function TTG003_(disciplina = 'TTG003', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
TTG003_();

// Definição da função HSO003
function HSO003_(disciplina = 'HSO003', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
HSO003_();

// Definição da função IIA002
function IIA002_(disciplina = 'IIA002', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
IIA002_();

// Definição da função ISA002
function ISA002_(disciplina = 'ISA002', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ISA002_();

// Definição da função ITI004
function ITI004_(disciplina = 'ITI004', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
ITI004_();

// Definição da função LIN600
function LIN600_(disciplina = 'LIN600', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
LIN600_();

// Definição da função TES001
function TES001_(disciplina = 'TES001', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
TES001_();

// Definição da função TTG103
function TTG103_(disciplina = 'TTG103', tipo = 'ensino') {
    // Substitui todas as ocorrências de "IAC001" por "disciplina"
    var novoCodigo = replaceAll(getQuestionTeaching, "IAC001", disciplina);
    // Substitui todas as ocorrências de "ensino" por "tipo"
    novoCodigo = replaceAll(novoCodigo, "\"ensino\"", "\"" + tipo + "\"");

    // Executa o novo código
    eval(novoCodigo);
}
TTG103_();



askMultipleChoiceQuestion2 = function(e, t) {
    var s = questionDatabase.Questions[e].E,
        a = questionDatabase.Questions[e].C_A,
        i = questionDatabase.Questions[e].A2;
    1 == s && (a = rotHex(a), a = atob(a), i = rotHex(i), i = atob(i)), a = 200 < a.length ? stringDivider(a = "\\}" + a, 95, "\n") : stringDivider(a, 56, "\n"), i = 200 < i.length ? stringDivider(i = "\\}" + i, 95, "\n") : stringDivider(i, 56, "\n");
    var n = questionDatabase.Questions[e].I;
    1 == n && ($gameScreen.showPicture(97, "MZQ_picBG", 0, 4, 174, 100, 100, 255, 0), $gameScreen.showPicture(98, questionDatabase.Questions[e].GUID, 0, 14, 192, 100, 100, 255, 0));
    var r = questionDatabase.Questions[e].A;
    $gameMessage.setPositionType(0), $gameMessage.add(t), 1 == (r = questionDatabase.Questions[e].A) && ($gameScreen.showPicture(99, "MZQ_audio", 0, 0, 574, 100, 100, 255, 0), t = questionDatabase.Questions[e].GUID, PlayAudio1(t));
    var o = (new Date).getTime();
    switch (Math.floor(2 * Math.random()) + 1) {
        case 1:
            $gameMessage.setChoices([a, i], 0, -1), $gameMessage.choicePositionType(0);
            var d = [0, 0];
            checkAnswer_MC(o, e, d, n, r);
            break;
        case 2:
            $gameMessage.setChoices([i, a], 0, -1), $gameMessage.choicePositionType(0);
            d = [-1, 1];
            checkAnswer_MC(o, e, d, n, r);
            break;
        default:
            console.log("something is wrong")
    }
}, askMultipleChoiceQuestion3 = function(e, t) {
    var s = questionDatabase.Questions[e].E,
        a = questionDatabase.Questions[e].C_A,
        i = questionDatabase.Questions[e].A2,
        n = questionDatabase.Questions[e].A3;
    1 == s && (a = rotHex(a), a = atob(a), i = rotHex(i), i = atob(i), n = rotHex(n), n = atob(n)), a = 200 < a.length ? stringDivider(a = "\\}" + a, 95, "\n") : stringDivider(a, 56, "\n"), i = 200 < i.length ? stringDivider(i = "\\}" + i, 95, "\n") : stringDivider(i, 56, "\n"), n = 200 < n.length ? stringDivider(n = "\\}" + n, 95, "\n") : stringDivider(n, 56, "\n");
    var r = questionDatabase.Questions[e].I;
    1 == r && ($gameScreen.showPicture(97, "MZQ_picBG", 0, 4, 174, 100, 100, 255, 0), $gameScreen.showPicture(98, questionDatabase.Questions[e].GUID, 0, 14, 192, 100, 100, 255, 0)), $gameMessage.setPositionType(0), $gameMessage.add(t);
    var o = questionDatabase.Questions[e].A;
    1 == o && ($gameScreen.showPicture(99, "MZQ_audio", 0, 0, 574, 100, 100, 255, 0), t = questionDatabase.Questions[e].GUID, PlayAudio1(t));
    var d = (new Date).getTime();
    switch (Math.floor(6 * Math.random()) + 1) {
        case 1:
            $gameMessage.setChoices([a, i, n], 0, -1), $gameMessage.choicePositionType(0);
            var u = [0, 0, 0];
            checkAnswer_MC(d, e, u, r, o);
            break;
        case 2:
            $gameMessage.setChoices([a, n, i], 0, -1), $gameMessage.choicePositionType(0);
            u = [0, -1, 1];
            checkAnswer_MC(d, e, u, r, o);
            break;
        case 3:
            $gameMessage.setChoices([n, a, i], 0, -1), $gameMessage.choicePositionType(0);
            u = [-2, 1, 1];
            checkAnswer_MC(d, e, u, r, o);
            break;
        case 4:
            $gameMessage.setChoices([n, i, a], 0, -1), $gameMessage.choicePositionType(0);
            u = [-2, 0, 2];
            checkAnswer_MC(d, e, u, r, o);
            break;
        case 5:
            $gameMessage.setChoices([i, a, n], 0, -1), $gameMessage.choicePositionType(0);
            u = [-1, 1, 0];
            checkAnswer_MC(d, e, u, r, o);
            break;
        case 6:
            $gameMessage.setChoices([i, n, a], 0, -1), $gameMessage.choicePositionType(0);
            u = [-1, -1, 2];
            checkAnswer_MC(d, e, u, r, o);
            break;
        default:
            console.log("something is wrong")
    }
}, askMultipleChoiceQuestion4 = function(e, t) {
    var s = questionDatabase.Questions[e].E,
        a = questionDatabase.Questions[e].C_A,
        i = questionDatabase.Questions[e].A2,
        n = questionDatabase.Questions[e].A3,
        r = questionDatabase.Questions[e].A4;
    1 == s && (a = rotHex(a), a = atob(a), i = rotHex(i), i = atob(i), n = rotHex(n), n = atob(n), r = rotHex(r), r = atob(r)), a = 200 < a.length ? stringDivider(a = "\\}" + a, 95, "\n") : stringDivider(a, 56, "\n"), i = 200 < i.length ? stringDivider(i = "\\}" + i, 95, "\n") : stringDivider(i, 56, "\n"), n = 200 < n.length ? stringDivider(n = "\\}" + n, 95, "\n") : stringDivider(n, 56, "\n"), r = 200 < r.length ? stringDivider(r = "\\}" + r, 95, "\n") : stringDivider(r, 56, "\n");
    var o = questionDatabase.Questions[e].I;
    1 == o && ($gameScreen.showPicture(97, "MZQ_picBG", 0, 4, 174, 100, 100, 255, 0), $gameScreen.showPicture(98, questionDatabase.Questions[e].GUID, 0, 14, 192, 100, 100, 255, 0)), $gameMessage.setPositionType(0), $gameMessage.add(t);
    var d = questionDatabase.Questions[e].A;
    1 == d && ($gameScreen.showPicture(99, "MZQ_audio", 0, 0, 574, 100, 100, 255, 0), t = questionDatabase.Questions[e].GUID, PlayAudio1(t));
    var u = (new Date).getTime();
    switch (Math.floor(24 * Math.random()) + 1) {
        case 1:
            $gameMessage.setChoices([a, i, n, r], 0, -1), $gameMessage.choicePositionType(0);
            var g = [0, 0, 0, 0];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 2:
            $gameMessage.setChoices([a, i, r, n], 0, -1), $gameMessage.choicePositionType(0);
            g = [0, 0, -1, 1];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 3:
            $gameMessage.setChoices([a, n, i, r], 0, -1), $gameMessage.choicePositionType(0);
            g = [0, -1, 1, 0];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 4:
            $gameMessage.setChoices([a, n, r, i], 0, -1), $gameMessage.choicePositionType(0);
            g = [0, -1, -1, 2];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 5:
            $gameMessage.setChoices([a, r, i, n], 0, -1), $gameMessage.choicePositionType(0);
            g = [0, -2, 1, 1];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 6:
            $gameMessage.setChoices([a, r, n, i], 0, -1), $gameMessage.choicePositionType(0);
            g = [0, -2, 0, 2];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 7:
            $gameMessage.setChoices([i, a, r, n], 0, -1), $gameMessage.choicePositionType(0);
            g = [-1, 1, -1, 1];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 8:
            $gameMessage.setChoices([i, a, n, r], 0, -1), $gameMessage.choicePositionType(0);
            g = [-1, 1, 0, 0];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 9:
            $gameMessage.setChoices([i, n, r, a], 0, -1), $gameMessage.choicePositionType(0);
            g = [-1, -1, -1, 3];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 10:
            $gameMessage.setChoices([i, n, a, r], 0, -1), $gameMessage.choicePositionType(0);
            g = [-1, -1, 2, 0];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 11:
            $gameMessage.setChoices([i, r, n, a], 0, -1), $gameMessage.choicePositionType(0);
            g = [-1, -2, 0, 3];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 12:
            $gameMessage.setChoices([i, r, a, n], 0, -1), $gameMessage.choicePositionType(0);
            g = [-1, -2, 2, 1];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 13:
            $gameMessage.setChoices([n, a, i, r], 0, -1), $gameMessage.choicePositionType(0);
            g = [-2, 1, 1, 0];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 14:
            $gameMessage.setChoices([n, a, r, i], 0, -1), $gameMessage.choicePositionType(0);
            g = [-2, 1, -1, 2];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 15:
            $gameMessage.setChoices([n, i, a, r], 0, -1), $gameMessage.choicePositionType(0);
            g = [-2, 0, 2, 0];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 16:
            $gameMessage.setChoices([n, i, r, a], 0, -1), $gameMessage.choicePositionType(0);
            g = [-2, 0, -1, 3];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 17:
            $gameMessage.setChoices([n, r, a, i], 0, -1), $gameMessage.choicePositionType(0);
            g = [-2, -2, 2, 2];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 18:
            $gameMessage.setChoices([n, r, i, a], 0, -1), $gameMessage.choicePositionType(0);
            g = [-2, -2, 1, 3];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 19:
            $gameMessage.setChoices([r, a, n, i], 0, -1), $gameMessage.choicePositionType(0);
            g = [-3, 1, 0, 2];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 20:
            $gameMessage.setChoices([r, a, i, n], 0, -1), $gameMessage.choicePositionType(0);
            g = [-3, 1, 1, 1];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 21:
            $gameMessage.setChoices([r, i, n, a], 0, -1), $gameMessage.choicePositionType(0);
            g = [-3, 0, 0, 3];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 22:
            $gameMessage.setChoices([r, i, a, n], 0, -1), $gameMessage.choicePositionType(0);
            g = [-3, 0, 2, 1];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 23:
            $gameMessage.setChoices([r, n, i, a], 0, -1), $gameMessage.choicePositionType(0);
            g = [-3, -1, 1, 3];
            checkAnswer_MC(u, e, g, o, d);
            break;
        case 24:
            $gameMessage.setChoices([r, n, a, i], 0, -1), $gameMessage.choicePositionType(0);
            g = [-3, -1, 2, 2];
            checkAnswer_MC(u, e, g, o, d);
            break;
        default:
            console.log("something went wrong")
    }
},askMultipleChoiceQuestion5 = function(e, t) {
    // Obtém os valores das perguntas e alternativas
    var s = questionDatabase.Questions[e].E,
        a = questionDatabase.Questions[e].C_A,
        i = questionDatabase.Questions[e].A2,
        n = questionDatabase.Questions[e].A3,
        r = questionDatabase.Questions[e].A4,
        o = questionDatabase.Questions[e].A5;

    // Decodifica e formata os valores das alternativas
    if (s == 1) {
        a = rotHex(a);
        a = atob(a);
        i = rotHex(i);
        i = atob(i);
        n = rotHex(n);
        n = atob(n);
        r = rotHex(r);
        r = atob(r);
        o = rotHex(o);
        o = atob(o);
    }

    a = 200 < a.length ? stringDivider(a = "\\}" + a, 95, "\n") : stringDivider(a, 56, "\n");
    i = 200 < i.length ? stringDivider(i = "\\}" + i, 95, "\n") : stringDivider(i, 56, "\n");
    n = 200 < n.length ? stringDivider(n = "\\}" + n, 95, "\n") : stringDivider(n, 56, "\n");
    r = 200 < r.length ? stringDivider(r = "\\}" + r, 95, "\n") : stringDivider(r, 56, "\n");
    o = 200 < o.length ? stringDivider(o = "\\}" + o, 95, "\n") : stringDivider(o, 56, "\n");

    // Adiciona a pergunta à caixa de mensagem
    $gameMessage.add(t);

    // Limpa a caixa de mensagem (esconde o texto da pergunta)
    $gameMessage.clear();

    // Verifica se deve exibir imagens
    var d = questionDatabase.Questions[e].I;
    if (d == 1) {
        $gameScreen.showPicture(97, "MZQ_picBG", 0, 4, 174, 100, 100, 255, 0);
        $gameScreen.showPicture(98, questionDatabase.Questions[e].GUID, 0, 0, 0, 100, 100, 255, 0);
    }

    // Verifica se deve tocar um áudio
    var u = questionDatabase.Questions[e].A;
    if (u == 1) {
        $gameScreen.showPicture(99, "MZQ_audio", 0, 0, 574, 100, 100, 255, 0);
        t = questionDatabase.Questions[e].GUID;
        PlayAudio1(t);
    }

    // Prepara as alternativas
    var g = (new Date).getTime();
    switch (Math.floor(5 * Math.random()) + 1) {
        case 1:
            $gameMessage.setChoices([a, i, n, r, o], 0, -1);
            var c = [0, 0, 0, 0, 0];
            checkAnswer_MC(g, e, c, d, u);
            break;
        case 2:
            $gameMessage.setChoices([i, a, n, r, o], 0, -1);
            c = [-1, 1, 0, 0, 0];
            checkAnswer_MC(g, e, c, d, u);
            break;
        case 3:
            $gameMessage.setChoices([i, n, a, r, o], 0, -1);
            c = [-1, -1, 2, 0, 0];
            checkAnswer_MC(g, e, c, d, u);
            break;
        case 4:
            $gameMessage.setChoices([i, n, r, a, o], 0, -1);
            c = [-1, -1, -1, 3, 0];
            checkAnswer_MC(g, e, c, d, u);
            break;
        case 5:
            $gameMessage.setChoices([i, n, r, o, a], 0, -1);
            c = [-1, -1, -1, -1, 4];
            checkAnswer_MC(g, e, c, d, u);
            break;
        default:
            console.log("something is wrong");
    }

},checkAnswer_MC = function(u, g, c, e, t) {
    var s = questionDatabase.Questions[g].E,
        h = questionDatabase.Questions[g].Q_T,
        m = questionDatabase.Questions[g].GUID,
        p = questionDatabase.Questions[g].Q,
        l = questionDatabase.Questions[g].C_A,
        _ = questionDatabase.Questions[g].A2,
        $ = questionDatabase.Questions[g].A3 || "",
        P = questionDatabase.Questions[g].A4 || "",
        M = questionDatabase.Questions[g].A5 || "",
        b = questionDatabase.Questions[g].S || "";
    1 == s && (p = rotHex(p), p = atob(p), l = rotHex(l), l = atob(l), _ = rotHex(_), _ = atob(_), $ = rotHex($), $ = atob($), P = rotHex(P), P = atob(P), M = rotHex(M), M = atob(M)), $gameMessage.setChoiceCallback(function(e) {
        var t = (new Date).getTime(),
            s = Math.round((t - u) / 1e3 * 10) / 10;
        switch ($gameVariables.setValue(995, s), $gameScreen.erasePicture(97), $gameScreen.erasePicture(98), $gameScreen.erasePicture(99), d = e - c[e]) {
            case 0:
                var a = '{"GUID":' + m + ',"Q_N":' + g + ',"I_C":"Y","T":' + s + ',"Q_T":' + h + '"Q":"' + p + '","C_A":"' + l + '","A2":"' + _ + '","A3":"' + $ + '","A4":"' + P + '","A5":"' + M + '","S":"' + b + '"},';
                console.log(a);
                var i = $gameVariables.value(993) + 1;
                $gameVariables.setValue(993, i), calculateAverage(i, g), rewardSystem();
                break;
            case 1:
                a = '{"GUID":' + m + ',"Q_N":' + g + ',"I_C":"N","G_A":"' + _ + '","T":' + s + ',"Q_T":4,"Q":"' + p + '","C_A":"' + l + '","A2":"' + _ + '","A3":"' + $ + '","A4":"' + P + '","A5":"' + M + '","S":"' + b + '"},';
                console.log(a);
                var n = $gameVariables.value(994) + 1;
                $gameVariables.setValue(994, n);
                var r = i / g * 100,
                    r = Math.floor(r),
                    o = questionDatabase.Questions[g].descricao || 0;
                penaltySystem(o);
                break;
            case 2:
                a = '{"GUID":' + m + ',"Q_N":' + g + ',"I_C":"N","G_A":"' + $ + '","T":' + s + ',"Q_T":' + h + ',"Q":"' + p + '","C_A":"' + l + '","A2":"' + _ + '","A3":"' + $ + '","A4":"' + P + '","A5":"' + M + '","S":"' + b + '"},';
                console.log(a);
                n = $gameVariables.value(994) + 1;
                $gameVariables.setValue(994, n);
                r = i / g * 100, r = Math.floor(r), o = questionDatabase.Questions[g].A3_Why || 0;
                penaltySystem(o);
                break;
            case 3:
                a = '{"GUID":' + m + ',"Q_N":' + g + ',"I_C":"N","G_A":"' + P + '","T":' + s + ',"Q_T":4,"Q":"' + p + '","C_A":"' + l + '","Two":"' + _ + '","Three":"' + $ + '","Four":"' + P + '","S":"' + b + '"},';
                console.log(a);
                n = $gameVariables.value(994) + 1;
                $gameVariables.setValue(994, n);
                r = i / g * 100, r = Math.floor(r), o = questionDatabase.Questions[g].A4_Why || 0;
                penaltySystem(o);
                break;
            case 4:
                a = '{"GUID":' + m + ',"Q_N":' + g + ',"I_C":"N","G_A":"' + M + '","T":' + s + ',"Q_T":4,"Q":"' + p + '","C_A":"' + l + '","Two":"' + _ + '","Three":"' + $ + '","Four":"' + P + '","Five":"' + M + '","S":"' + b + '"},';
                console.log(a);
                n = $gameVariables.value(994) + 1;
                $gameVariables.setValue(994, n);
                r = i / g * 100, r = Math.floor(r), o = questionDatabase.Questions[g].A5_Why || 0;
                penaltySystem(o);
                break;
            default:
                var d = "Timer expired. No answer given";
                console.log(d)
        }
    })
}, askTrueOrFalseQuestion = function(e, t) {
    questionDatabase.Questions[e].Q, questionDatabase.Questions[e].C_A;
    var s = questionDatabase.Questions[e].I,
        a = questionDatabase.Questions[e].A;
    1 == s && ($gameScreen.showPicture(97, "MZQ_picBG", 0, 4, 174, 100, 100, 255, 0), $gameScreen.showPicture(98, questionDatabase.Questions[e].GUID, 0, 14, 192, 100, 100, 255, 0)), 1 == a && ($gameScreen.showPicture(99, "MZQ_audio", 0, 0, 574, 100, 100, 255, 0), PlayAudio1(questionDatabase.Questions[e].GUID)), $gameMessage.setPositionType(0), $gameMessage.add(t);
    t = (new Date).getTime();
    $gameMessage.choicePositionType(0), $gameMessage.setChoices(["True", "False"], 0, -1), $gameMessage.choicePositionType(0), checkAnswer_TF(e, t)
}, checkAnswer_TF = function(g, c) {
    $gameMessage.setChoiceCallback(function(e) {
        var t = questionDatabase.Questions[g].E,
            s = questionDatabase.Questions[g].GUID,
            a = (questionDatabase.Questions[g].Q_T, questionDatabase.Questions[g].Q),
            i = (questionDatabase.Questions[g].I, questionDatabase.Questions[g].A, questionDatabase.Questions[g].C_A),
            n = questionDatabase.Questions[g].S || "",
            r = questionDatabase.Questions[g].descricao || 0;
        console.log(r), 1 == t && (a = rotHex(a), a = atob(a), i = rotHex(i), i = atob(i)), i = i <= 1e3 ? 0 : 1;
        var o, d, u, t = (new Date).getTime(),
            t = Math.round((t - c) / 1e3 * 10) / 10;
        $gameVariables.setValue(995, t), $gameScreen.erasePicture(97), $gameScreen.erasePicture(98), $gameScreen.erasePicture(99), e == i ? (d = '{"GUID":' + s + ',"Q_N":' + g + ',"I_C":"Y","T":' + t + ',"Q_T":2,"Q":"' + a + '","C_A":"' + (i = 0 == i ? "TRUE" : "FALSE") + '","S":"' + n + '"},', console.log(d), o = $gameVariables.value(993) + 1, $gameVariables.setValue(993, o), u = o / g * 100, u = Math.floor(u), rewardSystem()) : (u = (u = (d = (d = 0 == i ? '{"GUID":' + s + ',"Q_N":' + g + ',"I_C":"N","G_A":"FALSE","T":' + t + ',"Q_T":2,"Q":"' + a + '","C_A": "TRUE", "S":"' + n + '"},' : '{"GUID":' + s + ',"Q_N":' + g + ',"I_C":"N","G_A":"TRUE","T":' + t + ',"Q_T":2,"Q":"' + a + '","C_A":"FALSE","S":"' + n + '"},', console.log(d), $gameVariables.value(994) + 1), $gameVariables.setValue(994, d), o / g * 100), Math.floor(u)), penaltySystem(r))
    })
}, askShortAnswerQuestion = function(e) {
    SceneManager.push(Scene_TextInput), SceneManager.prepareNextScene()
}, Scene_TextInput.prototype = Object.create(Scene_MenuBase.prototype), (Scene_TextInput.prototype.constructor = Scene_TextInput).prototype.needsCancelButton = function() {
    return !1
}, Scene_TextInput.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this)
}, Scene_TextInput.prototype.prepare = function(e, t, s, a, i, n) {
    this.createSpriteset(), this._varID = 991;
    var r = questionDatabase.Questions[questionNumber].C_A;
    answerLength = r.length, this._maxLength = answerLength, this._ImageName = 0, this._InputWindowName = 0, this._useVariableforInput = !0, this._InputDefaultext = 0
}, Scene_TextInput.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this), this._text = $gameVariables.value(this._varID), this.createEditWindow(), this.createInputWindow()
}, Scene_TextInput.prototype.start = function() {
    var e;
    Scene_MenuBase.prototype.start.call(this), 1 == questionDatabase.Questions[questionNumber].I && (e = questionDatabase.Questions[questionNumber].GUID, this._myPic = new Sprite(ImageManager.loadPicture(e)), this.addChild(this._myPic), this._myPic.x = 460, this._myPic.y = 205), this._editWindow.refresh()
}, Scene_TextInput.prototype.createEditWindow = function() {
    var e = this.editWindowRect();
    this._editWindow = new Window_TextEdit(e), this._editWindow.setup(this.InputDefaultext, this._maxLength, this._useVariableforInput, this._varID, this._UseImage, this._ImageName), this.addWindow(this._editWindow)
}, Scene_TextInput.prototype.editWindowRect = function() {
    var e = this.calcWindowHeight(9, !0),
        t = $gameSystem.windowPadding(),
        s = ImageManager.faceHeight + 2 * t,
        t = (Graphics.boxWidth - 800) / 2,
        e = (Graphics.boxHeight - (s + e + 8)) / 2;
    return new Rectangle(t, e, 800, s)
}, Scene_TextInput.prototype.createInputWindow = function() {
    var e = this.inputWindowRect();
    this._inputWindow = new Window_TextInput(e), this._inputWindow.setEditWindow(this._editWindow), this._inputWindow.setHandler("ok", this.onInputOk.bind(this)), this.addWindow(this._inputWindow)
}, Scene_TextInput.prototype.inputWindowRect = function() {
    var e = this._editWindow.x,
        t = this._editWindow.y + this._editWindow.height + 8,
        s = this._editWindow.width,
        a = this.calcWindowHeight(9, !0) - 16;
    return new Rectangle(e, t, s, a)
}, Scene_TextInput.prototype.onInputOk = function() {
    $gameVariables.setValue(991, this._editWindow.text()), this.popScene(), checkAnswer_SA(questionNumber)
}, Scene_TextInput.prototype.createSpriteset = function() {
    this._spriteset = new Spriteset_Map, this.addChild(this._spriteset), this._spriteset.update(), console.log("Made it to createSpriteset")
}, Scene_TextInput.prototype.createWindowLayer = function() {
    this._windowLayer = new WindowLayer, this._windowLayer.x = (Graphics.width - Graphics.boxWidth) / 2, this._windowLayer.y = (Graphics.height - Graphics.boxHeight) / 2, this.addChild(this._windowLayer), console.log("create window layer")
}, Scene_TextInput.prototype.update = function() {
    this.updateMainMultiply(), Scene_Base.prototype.update.call(this)
}, Scene_TextInput.prototype.updateMainMultiply = function() {
    this.updateMain()
}, Scene_TextInput.prototype.updateMain = function() {
    var e = this.isActive();
    $gameTimer.update(e), $gameScreen.update()
}, Window_TextEdit.prototype = Object.create(Window_StatusBase.prototype), (Window_TextEdit.prototype.constructor = Window_TextEdit).prototype.initialize = function(e) {
    Window_StatusBase.prototype.initialize.call(this, e), console.log("Setting up Text Editor Window."), this._useImage = !1, this._imageName = "", this._MaxLength = 0, this._text = "", this._index = 0, this._defaultText = "", this.deactivate()
}, Window_TextEdit.prototype.setup = function(e, t, s, a, i, n) {
    this._useImage = i, this._imageName = n, this._MaxLength = t, !0 === this._useImage && ImageManager.loadPicture(this._imageName), this._index = this._text.length, this._defaultText = this._text, this.activate(), this.refresh()
}, Window_TextEdit.prototype.text = function() {
    return this._text
}, Window_TextEdit.prototype.restoreDefault = function() {
    return this._text = this._defaultText, this._index = this._text.length, this.refresh(), 0 < this._text.length
}, Window_TextEdit.prototype.add = function(e) {
    return this._index < this._MaxLength && (this._text += e, this._index++, this.refresh(), !0)
}, Window_TextEdit.prototype.back = function() {
    return 0 < this._index && (this._index--, this._text = this._text.slice(0, this._index), this.refresh(), !0)
}, Window_TextEdit.prototype.faceWidth = function() {
    return 100
}, Window_TextEdit.prototype.charWidth = function() {
    var e = $gameSystem.isJapanese() ? "Ａ" : "A";
    return this.DefaultTextWidth(e)
}, Window_TextEdit.prototype.DefaultTextWidth = function(e) {
    return this.contents.measureTextWidth(e)
}, Window_TextEdit.prototype.left = function() {
    if (!0 === this._useImage) {
        var e = (this.innerWidth + this.faceWidth()) / 2,
            t = (this._MaxLength + 1) * this.charWidth();
        return Math.min(e - t / 2, this.innerWidth - t)
    }
    e = this.innerWidth + this._defaultText / 2, t = (this._MaxLength + 1) * this.charWidth();
    return Math.min(e - t / 2, this.innerWidth - t)
}, Window_TextEdit.prototype.right = function() {
    return 10
}, Window_TextEdit.prototype.itemRect = function(e) {
    var t = this.left() + e * this.charWidth(),
        s = this.charWidth(),
        e = this.lineHeight();
    return new Rectangle(t, 110, s, e)
}, Window_TextEdit.prototype.underlineRect = function(e) {
    const t = this.itemRect(e);
    return t.x++, t.y += t.height - 4, t.width -= 2, t.height = 2, t
}, Window_TextEdit.prototype.underlineColor = function() {
    return ColorManager.normalColor()
}, Window_TextEdit.prototype.drawUnderline = function(e) {
    var t = this.underlineRect(e),
        e = this.underlineColor();
    this.contents.paintOpacity = 128, this.contents.fillRect(t.x, t.y, t.width, t.height, e), this.contents.paintOpacity = 255
}, Window_TextEdit.prototype.drawChar = function(e) {
    var t = this.itemRect(e);
    this.resetTextColor(), this.drawText(this._text[e] || "", t.x, t.y)
}, Window_TextEdit.prototype.refresh = function() {
    this.contents.clear(), this.drawTextEx(formattedQuestion, 0, 0);
    for (let e = 0; e < this._MaxLength; e++) this.drawUnderline(e);
    for (let e = 0; e < this._text.length; e++) this.drawChar(e);
    var e = this.itemRect(this._index);
    this.setCursorRect(e.x, e.y, e.width, e.height)
}, Window_TextInput.prototype = Object.create(Window_Selectable.prototype), (Window_TextInput.prototype.constructor = Window_TextInput).LATIN1 = ["A", "B", "C", "D", "E", "a", "b", "c", "d", "e", "F", "G", "H", "I", "J", "f", "g", "h", "i", "j", "K", "L", "M", "N", "O", "k", "l", "m", "n", "o", "P", "Q", "R", "S", "T", "p", "q", "r", "s", "t", "U", "V", "W", "X", "Y", "u", "v", "w", "x", "y", "Z", "[", "]", "^", "_", "z", "{", "}", "|", "~", "0", "1", "2", "3", "4", "!", "#", "$", "'", ";", "5", "6", "7", "8", "9", "(", ")", "*", "+", "-", "/", "=", "@", "<", ">", ":", ";", " ", "→", "OK"], Window_TextInput.LATIN2 = ["Á", "É", "Í", "Ó", "Ú", "á", "é", "í", "ó", "ú", "À", "È", "Ì", "Ò", "Ù", "à", "è", "ì", "ò", "ù", "Â", "Ê", "Î", "Ô", "Û", "â", "ê", "î", "ô", "û", "Ä", "Ë", "Ï", "Ö", "Ü", "ä", "ë", "ï", "ö", "ü", "Ā", "Ē", "Ī", "Ō", "Ū", "ā", "ē", "ī", "ō", "ū", "Ã", "Å", "Æ", "Ç", "Ð", "ã", "å", "æ", "ç", "ð", "Ñ", "Õ", "Ø", "Š", "Ŵ", "ñ", "õ", "ø", "š", "ŵ", "Ý", "Ŷ", "Ÿ", "Ž", "Þ", "ý", "ÿ", "ŷ", "ž", "þ", "Ĳ", "Œ", "ĳ", "œ", "ß", "«", "»", " ", "←", "OK"], Window_TextInput.prototype.initialize = function(e) {
    Window_Selectable.prototype.initialize.call(this, e), this._editWindow = null, this._page = 0, this._index = 0
}, Window_TextInput.prototype.setEditWindow = function(e) {
    this._editWindow = e, this.refresh(), this.updateCursor(), this.activate()
}, Window_TextInput.prototype.table = function() {
    return [Window_TextInput.LATIN1, Window_TextInput.LATIN2]
}, Window_TextInput.prototype.maxCols = function() {
    return 10
}, Window_TextInput.prototype.maxItems = function() {
    return 90
}, Window_TextInput.prototype.itemWidth = function() {
    return Math.floor((this.innerWidth - this.groupSpacing()) / 18)
}, Window_TextInput.prototype.groupSpacing = function() {
    return 24
}, Window_TextInput.prototype.character = function() {
    return this._index < 88 ? this.table()[this._page][this._index] : ""
}, Window_TextInput.prototype.isPageChange = function() {
    return 88 === this._index
}, Window_TextInput.prototype.isOk = function() {
    return 89 === this._index
}, Window_TextInput.prototype.itemRect = function(e) {
    var t = this.itemWidth(),
        s = this.itemHeight() - 3,
        a = this.colSpacing(),
        i = this.rowSpacing(),
        n = this.groupSpacing(),
        r = e % 10,
        n = r * t + Math.floor(r / 5) * n + a / 2,
        e = Math.floor(e / 10) * s + i / 2;
    return new Rectangle(n, e, t - a, s - i)
}, Window_TextInput.prototype.drawItem = function(e) {
    var t = this.table()[this._page][e],
        e = this.itemLineRect(e);
    this.drawText(t, e.x, e.y, e.width, "center")
}, Window_TextInput.prototype.updateCursor = function() {
    var e = this.itemRect(this._index);
    this.setCursorRect(e.x, e.y, e.width, e.height)
}, Window_TextInput.prototype.isCursorMovable = function() {
    return this.active
}, Window_TextInput.prototype.cursorDown = function(e) {
    (this._index < 80 || e) && (this._index = (this._index + 10) % 90)
}, Window_TextInput.prototype.cursorUp = function(e) {
    (10 <= this._index || e) && (this._index = (this._index + 80) % 90)
}, Window_TextInput.prototype.cursorRight = function(e) {
    this._index % 10 < 9 ? this._index++ : e && (this._index -= 9)
}, Window_TextInput.prototype.cursorLeft = function(e) {
    0 < this._index % 10 ? this._index-- : e && (this._index += 9)
}, Window_TextInput.prototype.cursorPagedown = function() {
    this._page = (this._page + 1) % this.table().length, this.refresh()
}, Window_TextInput.prototype.cursorPageup = function() {
    this._page = (this._page + this.table().length - 1) % this.table().length, this.refresh()
}, Window_TextInput.prototype.processCursorMove = function() {
    var e = this._page;
    Window_Selectable.prototype.processCursorMove.call(this), this.updateCursor(), this._page !== e && this.playCursorSound()
}, Window_TextInput.prototype.processHandling = function() {
    this.isOpen() && this.active && (Input.isTriggered("shift") && this.processJump(), Input.isPressed("cancel") && this.processBack(), Input.isRepeated("ok") && this.processOk())
}, Window_TextInput.prototype.isCancelEnabled = function() {
    return !1
}, Window_TextInput.prototype.processCancel = function() {
    this.processBack()
}, Window_TextInput.prototype.processJump = function() {
    89 !== this._index && (this._index = 89, this.playCursorSound())
}, Window_TextInput.prototype.processBack = function() {
    this._editWindow.back() && SoundManager.playCancel()
}, Window_TextInput.prototype.processOk = function() {
    this.character() ? this.onNameAdd() : this.isPageChange() ? (this.playOkSound(), this.cursorPagedown()) : this.isOk() && this.onNameOk()
}, Window_TextInput.prototype.onNameAdd = function() {
    this._editWindow.add(this.character()) ? this.playOkSound() : this.playBuzzerSound()
}, Window_TextInput.prototype.onNameOk = function() {
    "" === this._editWindow.text() ? this._editWindow.restoreDefault() ? this.playOkSound() : this.playBuzzerSound() : (this.playOkSound(), this.callOkHandler())
}, Window_TextInput.prototype.processHandling = function() {
    this.isOpen() && this.active && (!Input.isPressed("shift") && Input.isTriggered("a") && (this._index = 5, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("b") && (this._index = 6, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("c") && (this._index = 7, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("d") && (this._index = 8, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("e") && (this._index = 9, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("f") && (this._index = 15, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("g") && (this._index = 16, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("h") && (this._index = 17, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("i") && (this._index = 18, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("j") && (this._index = 19, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("k") && (this._index = 25, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("l") && (this._index = 26, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("m") && (this._index = 27, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("n") && (this._index = 28, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("o") && (this._index = 29, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("p") && (this._index = 35, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("q") && (this._index = 36, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("r") && (this._index = 37, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("s") && (this._index = 38, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("t") && (this._index = 39, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("u") && (this._index = 45, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("v") && (this._index = 46, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("w") && (this._index = 47, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("x") && (this._index = 48, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("y") && (this._index = 49, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("z") && (this._index = 55, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("a") && (this._index = 0, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("b") && (this._index = 1, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("c") && (this._index = 2, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("d") && (this._index = 3, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("e") && (this._index = 4, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("f") && (this._index = 10, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("g") && (this._index = 11, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("h") && (this._index = 12, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("i") && (this._index = 13, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("j") && (this._index = 14, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("k") && (this._index = 20, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("l") && (this._index = 21, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("m") && (this._index = 22, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("n") && (this._index = 23, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("o") && (this._index = 24, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("p") && (this._index = 30, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("q") && (this._index = 31, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("r") && (this._index = 32, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("s") && (this._index = 33, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("t") && (this._index = 34, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("u") && (this._index = 40, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("v") && (this._index = 41, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("w") && (this._index = 42, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("x") && (this._index = 43, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("y") && (this._index = 44, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("z") && (this._index = 50, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("0") && (this._index = 60, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("1") && (this._index = 61, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("2") && (this._index = 62, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("3") && (this._index = 63, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("4") && (this._index = 64, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered(">") && (this._index = 65, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("?") && (this._index = 66, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("<") && (this._index = 67, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("'") && (this._index = 68, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered(";") && (this._index = 69, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("5") && (this._index = 70, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("6") && (this._index = 71, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("7") && (this._index = 72, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("8") && (this._index = 73, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("9") && (this._index = 74, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("=") && (this._index = 75, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("-") && (this._index = 76, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("8") && (this._index = 77, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("?") && (this._index = 78, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("5") && (this._index = 79, this.onNameAdd()), !Input.isPressed("shift") && Input.isTriggered("=") && (this._index = 80, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered("<") && (this._index = 81, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered(">") && (this._index = 82, this.onNameAdd()), Input.isPressed("shift") && Input.isTriggered(";") && (this._index = 85, this.onNameAdd()), Input.isTriggered("space") && (this._index = 86, this.onNameAdd()), Input.isRepeated("cancel") && this.processBack(), Input.isRepeated("backspace") && this.processBack(), Input.isRepeated("ok") && (this._index = 13, this.callOkHandler(), checkAnswer_SA(questionNumber)))
}, Input.keyMapper = {
    8: "backspace",
    9: "tab",
    13: "ok",
    16: "shift",
    17: "control",
    18: "alt",
    19: "pause",
    20: "capslock",
    //27: "escape",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    44: "printscreen",
    45: "insert",
    46: "delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    //96: "escape",
    97: "numpad1",
    98: "down",
    99: "numpad3",
    100: "left",
    101: "numpad5",
    102: "right",
    103: "numpad7",
    104: "up",
    105: "numpad9",
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "debug",
    121: "f10",
    122: "f11",
    123: "f12",
    144: "numlock",
    145: "scrolllock",
    186: ";",
    187: "=",
    188: "<",
    189: "-",
    190: ">",
    191: "?",
    192: "`",
    219: "[",
    220: "|",
    221: "]",
    222: "'"
}, checkAnswer_SA = function(e, t) {
    var s = questionDatabase.Questions[e].GUID,
        a = (questionDatabase.Questions[e].Q_T, questionDatabase.Questions[e].Q),
        i = (questionDatabase.Questions[e].I, questionDatabase.Questions[e].A, questionDatabase.Questions[e].C_A),
        n = questionDatabase.Questions[e].C_S,
        r = questionDatabase.Questions[e].S || "";
    1 == questionDatabase.Questions[e].E && (i = rotHex(i), i = atob(i));
    var o = $gameVariables.value(991);
    0 == o && (o = "qvxxxv No Answer Given vxxxvq"), 0 == n && (i = i.toLowerCase(), o = o.toLowerCase());
    var d, u, n = (new Date).getTime(),
        t = Math.round((n - t) / 1e3 * 10) / 10;
    $gameVariables.setValue(995, t), o == i ? (u = '{"GUID":' + s + ',"Q_N":' + e + ',"I_C":"Y","T":' + t + ',"Q_T":1,"Q":"' + a + '","C_A":"' + i + '","S":"' + r + '"},', console.log(u), d = $gameVariables.value(993) + 1, $gameVariables.setValue(993, d), calculateAverage(d, e), rewardSystem()) : (u = '{"GUID":' + s + ',"Q_N":' + e + ',"I_C":"N","G_A":"' + o + '","T":' + t + ',"Q_T":1,"Q":"' + a + '","C_A":"' + i + '","S":"' + r + '"},', console.log(u), u = $gameVariables.value(994) + 1, $gameVariables.setValue(994, u), o = o + " is not the correct answer.", calculateAverage(d, e), penaltySystem(o))
}, showCorrectAnswerPicture = function() {
    $gameScreen.showPicture(96, "MZQ_correctAnswer", 0, 330, 230, 100, 100, 255, 0), setTimeout(function() {
        $gameScreen.erasePicture(96), $gameSystem.onBeforeSave(), DataManager.saveGame(1)
    }, 800)
}, rewardSystem = function() {
    console.log(questionNumber), $gameTimer.stop(), playSoundEffect("MZQ_correctAnswer");
    var e = questionDatabase.Questions[questionNumber].A,
        t = questionDatabase.Questions[questionNumber].GUID;
    1 == e && AudioManager.stopSeAt(t), showCorrectAnswerPicture();
    e = $gameVariables.value(996) + 1;
    $gameVariables.setValue(996, e), $gameVariables.setValue(997, 0);
    var t = questionDatabase.Questions[questionNumber].R_T,
        s = questionDatabase.Questions[questionNumber].R_I,
        a = questionDatabase.Questions[questionNumber].R_A,
        e = questionDatabase.Questions[questionNumber].O_L;
    "Enemy" == t && (BattleManager.setup(s, !0, !0), $gamePlayer.makeEncounterCount(), SceneManager.push(Scene_Battle)), "Gold" == t && ($gameParty.gainGold(a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[14]Gain \\G"), $gameMessage.add("\\{+\\v[999]\\c[14]\\G")), "Armor" == t && ($gameParty.gainItem($dataArmors[s], a, !0), $gameVariables.setValue(998, $dataArmors[s].name), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Gain Armor"), $gameMessage.add("\\{+\\c[6]\\v[998] \\c[0]\\{x\\c[6]\\v[999]")), "Item" == t && ($gameParty.gainItem($dataItems[s], a), $gameVariables.setValue(998, $dataItems[s].name), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Gain Item"), $gameMessage.add("\\{+\\c[6]\\v[998] \\c[0]\\{x\\c[6]\\v[999]")), "Weapon" == t && ($gameParty.gainItem($dataWeapons[s], a, !0), $gameVariables.setValue(998, $dataWeapons[s].name), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Gain Weapon"), $gameMessage.add("\\{+\\c[6]\\v[998] \\c[0]\\{x\\c[6]\\v[999]")), "HP" == t && (1 == e ? ($gameParty.leader().gainHp(a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Gains HP")) : ($gameParty.members().forEach(function(e) {
        e.gainHp(a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Gains HP")), $gameMessage.add("\\{+\\v[999] \\c[6]HP")), "XP" == t && (1 == e ? ($gameParty.leader().gainExp(a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Gains XP")) : ($gameParty.members().forEach(function(e) {
        e.gainExp(a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Gains XP")), $gameMessage.add("\\{+\\v[999] \\c[6]XP")), "MP" == t && (1 == e ? ($gameParty.leader().gainHp(a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Gains MP"), $gameMessage.add("\\{+\\v[999] \\c[6]MP")) : ($gameParty.members().forEach(function(e) {
        e.gainMp(a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Gains XP"), $gameMessage.add("\\{+\\v[999] \\c[6]XP"))), "TP" == t && (1 == e ? ($gameParty.leader().gainTp(a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Gains TP")) : ($gameParty.members().forEach(function(e) {
        e.gainTp(a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Gains TP")), $gameMessage.add("\\{+\\v[999] \\c[6]TP")), "Skill" == t && (1 == e ? ($gameParty.leader().learnSkill(s), $gameVariables.setValue(998, $dataSkills[s].name), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Learns Skill")) : ($gameParty.members().forEach(function(e) {
        e.learnSkill(s)
    }), $gameVariables.setValue(998, $dataSkills[s].name), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Learns Skill")), $gameMessage.add("\\{+\\c[6]\\v[998]")), "MHP" == t && (1 == e ? ($gameParty.leader().addParam(0, a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Increases Max HP")) : ($gameParty.members().forEach(function(e) {
        e.addParam(0, a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Increase Max HP")), $gameMessage.add("\\{+\\v[999] \\c[6]Max HP")), "MMP" == t && (1 == e ? ($gameParty.leader().addParam(1, a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Increases Max MP")) : ($gameParty.members().forEach(function(e) {
        e.addParam(1, a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Increases Max MP")), $gameMessage.add("\\{+\\v[999] \\c[6]Max MP")), "ATK" == t && (1 == e ? ($gameParty.leader().addParam(2, a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Increases ATK")) : ($gameParty.members().forEach(function(e) {
        e.addParam(2, a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Increases ATK")), $gameMessage.add("\\{+\\v[999] \\c[6]ATK")), "DEF" == t && (1 == e ? ($gameParty.leader().addParam(3, a), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Party Leader Increases DEF")) : ($gameParty.members().forEach(function(e) {
        e.addParam(3, a)
    }), $gameVariables.setValue(999, a), $gameMessage.add("REWARD: \\{\\c[4]Entire Party Increases DEF")), $gameMessage.add("\\{+\\v[999] \\c[6]DEF")), "AddState" == t && (1 == e ? ($gameParty.leader().addState(s), $gameVariables.setValue(998, $dataStates[s].name), $gameMessage.add("REWARD: \\{\\c[4]Party Leader State Added")) : ($gameParty.members().forEach(function(e) {
        e.addState(s)
    }), $gameVariables.setValue(998, $dataStates[s].name), $gameMessage.add("REWARD: \\{\\c[4]Entire Party State Added")), $gameMessage.add("\\{+\\c[6]\\v[998]")), "RemoveState" == t && (1 == e ? ($gameParty.leader().removeState(s), $gameVariables.setValue(998, $dataStates[s].name), $gameMessage.add("REWARD: \\{\\c[4]Party Leader State Removed")) : ($gameParty.members().forEach(function(e) {
        e.removeState(s)
    }), $gameVariables.setValue(998, $dataStates[s].name), $gameMessage.add("REWARD: \\{\\c[4]Entire Party State Removed")), $gameMessage.add("\\{-\\c[6]\\v[998]")), $gameVariables.setValue(992, questionNumber + 1), console.log("Question number " + $gameVariables.value(992)), $gameSwitches.setValue(991, !0)
}, showWrongAnswerPicture = function() {
    $gameScreen.showPicture(96, "MZQ_wrongAnswer", 0, 330, 230, 100, 100, 255, 0), setTimeout(function() {
        $gameScreen.erasePicture(96), $gameSystem.onBeforeSave(), DataManager.saveGame(1)
    }, 800)
}, penaltySystem = function(e) {
    $gameTimer.stop(), playSoundEffect("MZQ_wrongAnswer");
    var t = questionDatabase.Questions[questionNumber].A,
        s = questionDatabase.Questions[questionNumber].E,
        a = questionDatabase.Questions[questionNumber].GUID;
    null != e && 1 == s && (e = rotHex(e), e = atob(e)), null == e && (e = "The question timer expired."), 0 == e && (e = "No explanation for wrong answer provided."), e = 200 < e.length ? stringDivider(e = "\\}" + e, 95, "\n") : stringDivider(e, 56, "\n"), $gameVariables.setValue(1e3, e), console.log(e), 1 == t && AudioManager.stopSeAt(a), showWrongAnswerPicture();
    t = $gameVariables.value(997) + 1;
    $gameVariables.setValue(997, t), $gameVariables.setValue(996, 0);
    var a = questionDatabase.Questions[questionNumber].P_T,
        i = questionDatabase.Questions[questionNumber].P_I,
        n = questionDatabase.Questions[questionNumber].P_A,
        t = questionDatabase.Questions[questionNumber].O_L;
    "Enemy" == a && (BattleManager.setup(i, !1, !1), $gamePlayer.makeEncounterCount(), SceneManager.push(Scene_Battle)), "Gold" == a && ($gameParty.loseGold(n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[8]Lose \\G"), $gameMessage.add("\\c[18]\\{-\\v[999]\\c[8]\\G")), "Armor" == a && ($gameParty.gainItem($dataArmors[i], -n, !0), $gameVariables.setValue(998, $dataArmors[PenaltyId].name), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Lose Armor"), $gameMessage.add("\\{-\\c[18]\\v[998] \\c[0]\\{x\\c[8]\\v[999]")), "Item" == a && ($gameParty.gainItem($dataItems[i], -n), $gameVariables.setValue(998, $dataItems[i].name), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Lose Item"), $gameMessage.add("\\{-\\c[18]\\v[998] \\c[0]\\{x\\c[8]\\v[999]")), "Weapon" == a && ($gameParty.gainItem($dataWeapons[i], -n, !0), $gameVariables.setValue(998, $dataWeapons[i].name), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Lose Weapon"), $gameMessage.add("\\{-\\c[18]\\v[998] \\c[0]\\{x\\c[8]\\v[999]")), "HP" == a && (1 == t ? ($gameParty.leader().gainHp(-n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Loses HP")) : ($gameParty.members().forEach(function(e) {
        e.gainHp(-n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Loses HP")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]HP")), "XP" == a && (1 == t ? ($gameParty.leader().gainExp(-n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Loses XP")) : ($gameParty.members().forEach(function(e) {
        e.gainExp(-n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Loses XP")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]XP")), "MP" == a && (1 == t ? ($gameParty.leader().gainMp(-n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Loses MP")) : ($gameParty.members().forEach(function(e) {
        e.gainMp(n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Loses MP")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]MP")), "TP" == a && (1 == t ? ($gameParty.leader().gainTp(-n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Loses TP")) : ($gameParty.members().forEach(function(e) {
        e.gainTp(-n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Loses TP")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]TP")), "Skill" == a && (1 == t ? ($gameParty.leader().forgetSkill(i), $gameVariables.setValue(998, $dataWeapons[i].name), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Loses Skill")) : ($gameParty.members().forEach(function(e) {
        e.forgetSkill(i)
    }), $gameVariables.setValue(998, $dataWeapons[i].name), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Loses Skill")), $gameMessage.add("\\{-\\c[18]\\v[998] \\c[0]\\{x\\c[8]\\v[999]")), "MHP" == a && (1 == t ? ($gameParty.leader().addParam(0, -n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Decreases Max HP")) : ($gameParty.members().forEach(function(e) {
        e.addParam(0, -n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Decreases Max HP")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]MHP")), "MMP" == a && (1 == t ? ($gameParty.leader().addParam(1, -n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Decreases Max MP")) : ($gameParty.members().forEach(function(e) {
        e.addParam(1, -n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Decreases Max MP")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]MMP")), "ATK" == a && (1 == t ? ($gameParty.leader().addParam(2, -n), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Decreases ATK")) : ($gameParty.members().forEach(function(e) {
        e.addParam(2, -n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Decreases ATK")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]ATK")), "DEF" == a && (1 == t ? ($gameParty.leader().addParam(3, -a), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Party Leader Decreases DEF")) : ($gameParty.members().forEach(function(e) {
        e.addParam(3, -n)
    }), $gameVariables.setValue(999, n), $gameMessage.add("PENALTY: \\{\\c[31]Entire Party Decreases DEF")), $gameMessage.add("\\{-\\c[18]\\v[999] \\c[8]DEF")), "AddState" == a && (1 == t ? ($gameParty.leader().addState(i), $gameVariables.setValue(998, $dataStates[i].name), $gameMessage.add("PENALTY \\{\\c[31]Party Leader State Added")) : ($gameParty.members().forEach(function(e) {
        e.addState(i)
    }), $gameVariables.setValue(998, $dataStates[i].name), $gameMessage.add("PENALTY \\{\\c[31]Entire Party State Added")), $gameMessage.add("\\{+\\c[18]\\v[998]")), "RemoveState" == a && (1 == t ? ($gameParty.leader().removeState(i), $gameVariables.setValue(998, $dataStates[i].name), $gameMessage.add("PENALTY \\{\\c[31]Party Leader State Removed")) : ($gameParty.members().forEach(function(e) {
        e.removeState(i)
    }), $gameVariables.setValue(998, $dataStates[i].name), $gameMessage.add("PENALTY \\{\\c[31]Entire Party State Removed")), $gameMessage.add("\\{+\\c[18]\\v[998]")), $gameVariables.setValue(992, questionNumber + 1), $gameSwitches.setValue(992, !0)
}, playSoundEffect = function(e) {
    e = {
        name: e,
        volume: 100,
        pitch: 100,
        pan: 0
    };
    AudioManager.playSe(e)
}, PlayAudio1 = function(e) {
    var t = {
        name: questionDatabase.Questions[questionNumber].GUID,
        volume: 100,
        pitch: 100,
        pan: 0
    };
    AudioManager.playSe(t)
}, AudioManager.stopSeAt = function(t) {
    for (this._seBuffers.forEach(function(e) {
            e._url.match(escape(t)) && e.stop()
        }), i = 0; i < this._seBuffers.length; i++) this._seBuffers[i]._url.match(t) && (this._seBuffers.splice(i, 1), i--)
}, setChoiceTimer = function(e, t) {
    $gameMessage.setChoiceTimer(e, t), $gameTimer.start(e)
};
var MZQ_GameMessage_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function() {
    MZQ_GameMessage_clear.call(this), this._timedChoiceCount = 0, this._timedChoiceNum = -1, this._isForcedCancel = !1
}, Game_Message.prototype.setChoiceTimer = function(e, t) {
    0 < t && --t, this._timedChoiceCount = e, this._timedChoiceNum = t
}, Game_Message.prototype.timedChoiceCount = function() {
    return this._timedChoiceCount
}, Game_Message.prototype.timedChoiceNum = function() {
    return this._timedChoiceNum
}, Game_Message.prototype.forceCancel = function() {
    this._isForcedCancel = !0
}, Game_Message.prototype.isForcedCancel = function() {
    return this._isForcedCancel
};
var MZQ_WindowChoiceList_initialize = Window_ChoiceList.prototype.initialize;
Window_ChoiceList.prototype.initialize = function(e) {
    MZQ_WindowChoiceList_initialize.call(this, e), this._count = 0
};
var MZQ_WindowChoiceList_start = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function() {
    this.setTimer(), MZQ_WindowChoiceList_start.call(this)
}, Window_ChoiceList.prototype.setTimer = function() {
    this._count = $gameMessage.timedChoiceCount()
};
var MZQ_WindowChoiceList_update = Window_ChoiceList.prototype.update;
Window_ChoiceList.prototype.update = function() {
    MZQ_WindowChoiceList_update.call(this), this.updateTimer(), this.updateForceCancel()
}, Window_ChoiceList.prototype.updateTimer = function() {
    0 < this._count && (this._count--, 0 == this._count && $gameMessage.forceCancel())
}, Window_ChoiceList.prototype.updateForceCancel = function() {
    $gameMessage.isForcedCancel() && (this.deactivate(), this.callCancelHandler())
};
var MZQ_WindowChoiceList_callOkHandler = Window_ChoiceList.prototype.callOkHandler;
Window_ChoiceList.prototype.callOkHandler = function() {
    MZQ_WindowChoiceList_callOkHandler.call(this), this._count = 0
};
var MZQ_WindowChoiceList_callCancelHandler = Window_ChoiceList.prototype.callCancelHandler;
Window_ChoiceList.prototype.callCancelHandler = function() {
    MZQ_WindowChoiceList_callCancelHandler.call(this), this._count = 0, penaltySystem()
}, ConfigManager.instantText = !0;
var alias_cm_md = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var e = alias_cm_md.call(this);
    return e.instantText = this.instantText, e
};
var alias_cm_ad = ConfigManager.applyData;
ConfigManager.applyData = function(e) {
    alias_cm_ad.call(this, e), this.instantText = this.readConfigInstantText(e, "instantText")
}, ConfigManager.readConfigInstantText = function(e, t) {
    t = e[t];
    return void 0 !== t ? t : getDefaultInstantText()
};
var alias_wm_udf = Window_Message.prototype.updateShowFast;
Window_Message.prototype.updateShowFast = function() {
    alias_wm_udf.call(this), !0 === ConfigManager.instantText && (this._showFast = !0)
}, Sprite_Timer.prototype.updatePosition = function() {
    this.x = (Graphics.width - this.bitmap.width) / 2, this.y = 584
}, Game_Timer.prototype.onExpire = function() {
    $gameScreen.erasePicture(99), $gameScreen.erasePicture(98), $gameScreen.erasePicture(97), $gameScreen.erasePicture(96), $gameScreen.erasePicture(95), 1 == questionDatabase.Questions[questionNumber].Q_T && SceneManager.pop(), console.log("Time has expired"), $gameTimer.stop(), $gameMessage.forceCancel(), penaltySystem()
};