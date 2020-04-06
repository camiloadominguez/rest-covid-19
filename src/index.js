const colors = require("colors/safe");
// const {argv} = require('./config/yargs');
// const {covid} = require('./historyCovid');
const {historyFound, affectedCountries} = require('./config/axios');
let con = console.log;

let comando=process.argv[2]
switch(comando){
    case "showCountries":
        affectedCountries();
    break;
    default:
        con(colors.cyan("Comando no reconocido"))
}
