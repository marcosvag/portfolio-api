const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const app = express();
const PORT = 333;
require('dotenv').config();

app.use(cors())

const dbConnectionString = process.env.DB_STRING;

MongoClient.connect(dbConnectionString)
    .then(client => {
    const db = client.db("marcosag-lang");
    const languagesCollection = db.collection("languages");

            console.log("Conected to DB!");
            app.get("/", (request, response) => {
                languagesCollection.find().toArray()
                .then(result => {
                    console.log("ENG content")
                    response.status(200).send(JSON.stringify({ content: result[0].content.eng }));
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).end()
                });
            })
        
            app.get("/pt", (req, res) => {
                languagesCollection.find().toArray()
                    .then(result => {
                        console.log("PT-BR content")
                        res.status(200).send(JSON.stringify({ content: result[0].content.pt }))
                    })
                    .catch(err => {
                        console.error(err)
                        res.status(500).end()
                    });
            })
            app.listen(process.env.PORT || PORT, () => {
            console.log(`Listening on ${PORT}!`)
    })
        })
    .catch(err => console.error(err));




