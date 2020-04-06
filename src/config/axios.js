const axios = require("axios");
const inquirer = require('inquirer');
let con = console.log;

const affectedCountries = () => {
    const instance = axios.create({
        baseURL:"https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php",
        headers:{"x-rapidapi-key":"90e9a80880msh98d5ce5e0702c6bp15385ajsn2b5af67eb194"}
    })
    instance.get()
        .then(resp=>{
            let countries = resp.data.affected_countries.sort();
            return inquirer.prompt([{
                type:"list",
                name:"country",
                message:"Choose one country affected by Covid-19",
                choices:countries.map((country,i)=>(
                    {name:`#${i+1} ${country}`,value:country}
                ))
            }])
        })
        .then(answer=>{
            let country = answer['country'];
            return historyFound(country);
        })
        .then(countryAffected=>{
            con(countryAffected)
        })
        .catch(err=>{
            con(err)
        })
}

const historyFound=(country)=>{
    return new Promise((resolve,reject)=>{
        const instance = axios.create({
            baseURL:"https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country="+country,
            headers:{"x-rapidapi-key":"90e9a80880msh98d5ce5e0702c6bp15385ajsn2b5af67eb194"}
            })
            instance.get()
                .then(resp=>{
                    let lastDate = resp.data.stat_by_country.length;
                    resolve(resp.data.stat_by_country.slice(lastDate-1,lastDate));
                })
                .catch(err=>{
                    reject(err);
                });
        })
}




module.exports = {
    affectedCountries,
    historyFound
}