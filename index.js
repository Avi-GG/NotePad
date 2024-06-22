const express = require('express');
const path = require('path');
const fs = require('fs');
const { log } = require('console');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");


app.get('/', (req, res) => {
    fs.readdir("./files", (err, files) => {
        
        res.render('index', {files: files});
    })
})

app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
        // console.log(filedata);
        
        res.render('show', {filename: req.params.filename, filedata: filedata});
    })
})

app.get('/edit/:filename', (req, res) => {
    res.render('edit', {filename: req.params.filename});
    // fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    //     // console.log(filedata);
        
    // })
})

app.get('/delete/:filename', (req, res) => {
    fs.unlink(`./files/${req.params.filename}`,  (err, filedata) => {
        // console.log(filedata);
        res.redirect("/");
    })
})

app.post('/create', (req, res) => {
    // console.log(req.body); //req.body is to get the data entered on the website
    fs.writeFile(`./files/${req.body.title.split(' ').join()}.txt`, req.body.details, (err) => { //split(" ") --> it will split the sentence whenever found a space character and put it into array then .join("") will join all the array elements and make a string and return it
        res.redirect("/");
    })
})

app.post('/edit', (req, res) => {
    // console.log(req.body); //req.body is to get the data entered on the website
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, (err) => { //split(" ") --> it will split the sentence whenever found a space character and put it into array then .join("") will join all the array elements and make a string and return it
        res.redirect("/");
    })
})



// app.get('/profile/:username', (req, res) => {
//     res.send(` Welcome ${req.params.username}!`); //req.params means any request which is variable(means having :)
// })

//write your code here :o





app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})