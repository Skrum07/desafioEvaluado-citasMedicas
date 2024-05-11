import express from 'express';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';
moment.locale('es');
import _ from 'lodash';
import chalk from 'chalk';

const routes = express.Router();
const users = [];

routes.get("/usuarios", async(req, res) => {
    try { 
        const consulta = await axios.get("https://randomuser.me/api/");
        const usuario = consulta.data.results[0];
        const name = usuario.name.first;
        const lastName = usuario.name.last;
        const gender = usuario.gender;
        const id = uuidv4().slice(0,8);
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

        users.push({name, lastName, gender, id, timestamp});

        const [mujeres, hombres] = _.partition(users, {gender: "female"});
      
        const template = 
        `
        <h4>Mujeres:</h4>
            <ol>
                ${mujeres.map ((i) =>
                    `
                    <li> 
                    Nombre: ${i.name} - 
                    Apellido: ${i.lastName} - 
                    Genero: ${i.gender} - 
                    Id: ${i.id} - 
                    Timestamp: ${i.timestamp}
                    </li>
                    `
                )}
            </ol>

            <h4>Hombres:</h4>
            <ol>
                ${hombres.map ((i) => 
                    `
                    <li> 
                    Nombre: ${i.name} - 
                    Apellido: ${i.lastName} - 
                    Genero: ${i.gender} - 
                    Id: ${i.id} - 
                    Timestamp: ${i.timestamp}
                    </li>
                    `
                )}
            </ol>
        `

    console.log(chalk.blue.bgWhite(template));
    res.send(template);

    } catch (error) {
       console.log(error);
    }
});
    

export default routes;