
const express= require('express');
const app = express()
const cors = require('cors');
const port = 3000;
const File = require("./Schema/file")
// Import database initialization function
const initializeDatabase = require('./db');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Middleware to update global.foodData for each request
app.use((req, res, next) => {
    initializeDatabase((err, tempData) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        global.tempData = tempData;
        // console.log("temp",tempData[0]  );
        // console.log("global",global.tempData[0]);
        next();
    });
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000,()=>{
    console.log("port:",port);
});

app.post("/", async (request, response) => {
    try {
        if (!request.body || !request.body.name || !request.body.cid) {
            return response.status(400).send('Invalid request body');
        }

            const file = await File.create({
                name : request.body.name,
                cid : request.body.cid,
                password : request.body.password
          });
        console.log("Uploaded file:", file);
        response.json(file);
    } catch (error) {
        console.error("Error uploading file:", error);
        response.status(500).send('Internal Server Error While Uploading');
    }
});

app.put("/", async (request, response) => {
    try {
        if (!request.body || !request.body.name) {
            return response.status(400).send('Invalid request body');
        }

        const file = await File.findOne({
            name: request.body.name
        });
        if (!file) {
            return response.status(404).send('File not found');
        }
        console.log("Retrieved file:", file);
        if(file.password){
            if(!request.body.password){
                console.error("File is password portected");
                response.json('File is password portected');
            }
            else if(file.password==request.body.password){
                response.json(file);
            }
            else{
                console.error("Invalid password");
                response.json('Invalid password');
            }
        }
        else{
            response.json(file);
        }
    } catch (error) {
        console.error("Error retrieving file:", error);
        response.status(500).send('Internal Server Error While Retrieving');
    }
});

