const express = require("express");
const router = express.Router();
const User = require("../models/Task.js"); 
const Task = require("../models/Task.js");


router.post("/create", async(req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a task" });
    }
});

router.get("/", async (req, res) => {
    try {
        // find all documents
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: "There was a problem trying to create a task"})
    }
})

router.get("/id/:_id", async (req, res) => {
    try {
        const _id = req.params._id
        const task = await Task.findById(_id)
        if(!task) {
            return res.status(404).send({message: "Task not found"})
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error)
        res.status(500).send({message: "There was a problem trying to get the solicited task"})

    }
})

router.put("/markAsCompleted/:_id", async (req, res) => {
    try {
        const _id = req.params._id
        const updatedTask = await Task.findByIdAndUpdate(_id, {completed: true})
        if(!updatedTask) {
            return res.status(404).send({message: "Task with that id not found"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({message: "There was a problem trying to update the solicited task"})
    }
})

router.put("/id/:_id", async (req, res) => {
    try {
        const _id = req.params._id
        const title = req.body.title
        const updatedTask = await Task.findByIdAndUpdate(_id, {title: title})
        if(!updatedTask) {
            return res.status(404).send({message: "Task with that id not found"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({message: "There was a problem trying to update the solicited task"})
    }
})

router.delete("/id/:_id", async (req, res) => {
    try {
        const _id = req.params._id
        const deletedTask = await Task.findByIdAndDelete(_id)
        if(!deletedTask) {
            return res.status(404).send({message: "Task with that id not found"})
        }
        res.status(200).send({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error)
        res.status(500).send({message: "There was a problem trying to delete the solicited task"})
    }
})
module.exports = router;