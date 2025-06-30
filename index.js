require('dotenv').config();
//env
const port = process.env.PORT || 3000;
const db = process.env.MONGO_URI;
//express/mongoose
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Project = require('./models/projects.js');
const Skill = require('./models/Skills.js');

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static("public"));


//middleware
app.use(express.urlencoded({ extended: true }));

//route handler
app.get('/', async (req, res) => {
    const projects = await Project.find().lean();
    const skills = await Skill.find().lean();
    res.render('index', { projects , skills});
});



//CRUD OPERATION FOR PROJECT
app.get('/admin/project', (req, res) => res.render('add_project'));
app.post('/admin/project', async (req, res) => {
  await Project.create(req.body);
  const projects = await Project.find().lean();
  const skills = await Skill.find().lean();
  res.render('index', { projects , skills});
});
// DELETE project by ID
app.get('/delete/project/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/');
});
// Show edit form
app.get('/edit/project/:id', async (req, res) => {
  const project = await Project.findById(req.params.id).lean();
  res.render('edit_project', { project });
});

// Handle form submission
app.post('/edit/project/:id', async (req, res) => {
  await Project.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

// JSON API for projects
app.get('/api/projects', async (req, res) => {
  const projects = await Project.find().lean();
  res.json(projects);
});



//CRUD OPERATION FOR SKILL
app.get('/admin/skill', (req, res) => res.render('add_skill'));
app.post('/admin/skill', async (req, res) => {
  await Skill.create(req.body);
  const projects = await Project.find().lean();
  const skills = await Skill.find().lean();
  res.render('index', { projects , skills});
});

// DELETE skill by ID
app.get('/delete/skill/:id', async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.redirect('/');
});
// Show edit form
app.get('/edit/skill/:id', async (req, res) => {
  const skill = await Skill.findById(req.params.id).lean();
  res.render('edit_skill', { skill });
});

// JSON API for skills
app.get('/api/skills', async (req, res) => {
  const skills = await Skill.find().lean();
  res.json(skills);
});

// Handle form submission
app.post('/edit/skill/:id', async (req, res) => {
  await Skill.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

app.listen(port, () => console.log(`Server running on port ${port}`));

