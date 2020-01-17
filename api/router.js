const express = require('express');
const Projects = require('../data/helpers/projectModel.js');
const Actions = require('../data/helpers/actionModel.js');

const router = express.Router();

/******************* PROJECTS SECTION *******************/

//create a new project
router.post('/projects', validateProject, (req,res) => {
    Projects.insert(req.body)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message:"We ran into an issue saving your post"})
    })
})

//get a list of projects

router.get('/projects', (req,res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        console.log( err);
        res.status(500).json({message: "We ran into an error fetching projects"})
    })
})



//get a specific project

router.get('/projects/:id', validateProjectId, (req, res) => {
    const id = req.params.id
    Projects.get(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "There was an error finding that project"})
    })
  });


//update a project

router.put('/projects/:id', validateProjectId, validateProject, (req,res) => {
    const id = req.params.id;
    Projects.update(id, req.body)
    .then(updatedProject => {
        res.status(201).json(updatedProject);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "We ran into an error updating this project"})
    })
})


//delete a project
router.delete('/projects/:id',validateProjectId, (req, res) => {
    const id = req.params.id;
    Projects.remove(id)
    .then(projectToDelete => {
      console.log("Project has been deleted")
      res.status(200).json(req.project)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "we ran into and issue deleting project"})
    })
  });


/******************* ACTIONS SECTION *******************/


//create a new action
router.post('/projects/:id/actions', validateProjectId, validateAction, (req,res) => {
    Actions.insert(req.body)
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message:"We ran into an issue saving your action"})
    })
})



// get actions from a specific project
router.get('/projects/:id/actions', validateProjectId, (req,res) => {
    const id = req.params.id
    Projects.getProjectActions(id)
    .then(projectActions => {
        res.status(200).json(projectActions)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "We ran into an issue fetching actions for this project"})
    })
})

//get action by id

router.get('/actions/:id', validateActionId, (req, res) => {
    const id = req.params.id
    Actions.get(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "There was an error finding that action"})
    })
  });

//update actions

router.put('/actions/:id', validateAction, validateActionId,(req,res) => {
    const id = req.params.id;
    Actions.update(id, req.body)
    .then(updatedAction => {
        res.status(201).json(updatedAction);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "We ran into an error updating this Action"})
    })
})


//delete actions
router.delete('/actions/:id',validateActionId, (req, res) => {
    const id = req.params.id;
    Actions.remove(id)
    .then(projectToDelete => {
      console.log("Action has been deleted")
      res.status(200).json(req.action)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "we ran into and issue deleting Action"})
    })
  });



/******************* Middleware *******************/

//validate project id?
function validateProjectId(req, res, next) {
    const id = req.params.id
    Projects.get(id)
    .then(project => {
      if(!project){
        res.status(400).json({message: "Invalid project id"})
      }else {
         req.project = project
        next();
      }
    })
    .catch(err => {
        console.log(err)
      res.status(500).json({message: "There was an error finding that project"})
    })
  }


//validate project
function validateProject(req, res, next) {
    if(!req.body){
      res.status(400).json({message : "missing post data"})
    }else if(!req.body.name || !req.body.description){
      res.status(400).json({message : "missing required fields"})
    }else{
      next();
    }
  }


//validate action
function validateAction(req, res, next) {
    if(!req.body){
      res.status(400).json({message : "missing Action data"})
    }else if(!req.body.notes || !req.body.description || !req.body.project_id){
      res.status(400).json({message : "missing required fields"})
    }else{
      next();
    }
  }

  //validate action id
  function validateActionId(req, res, next) {
    const id = req.params.id
    Actions.get(id)
    .then(action => {
      if(!action){
        res.status(400).json({message: "Invalid action id"})
      }else {
         req.action = action
        next();
      }
    })
    .catch(err => {
        console.log(err)
      res.status(500).json({message: "There was an error finding that action"})
    })
  }

module.exports = router;