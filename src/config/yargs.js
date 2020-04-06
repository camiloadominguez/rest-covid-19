const argv = require('yargs')
    .command("covid", "Country from which to view the history of the covid-19",{
        country:{
            alias:"c",
            demand:true,
            describe:"Country from which to view the history of the covid-19"
        },
        dataNumber:{
            alias:"d",
            default:1,
            describe:"Number of data you want to see",
            
        }
    })
    .help()
    .argv;

module.exports = {
    argv
}  