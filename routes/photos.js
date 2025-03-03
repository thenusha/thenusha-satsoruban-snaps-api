import express from "express";
import photos from "../data/photos.json" with {type: "json"};
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(photos);
});

router.get("/:id", (req, res) => {
    const photo = photos.find((el) => el.id === req.params.id);
    if (photo) {
        res.json(photo)
    }
    else {
        return res
        .status(404)
        .send("Photo not found");
    }
});

router.get("/:id/comments", (req, res) => {
    const photo = photos.find((el) => el.id === req.params.id);
    if (photo) {
        res.json(photo.comments)
    }
    else {
        res
        .status(404)
        .send("Photo not found")
    }
})


router.post("/:id/comments", (req, res) => {
    const photo = photos.find((el) => el.id === req.params.id);
    if (photo === undefined) {
        res
        .status(404).send("Photo not found")
    }
    else {
        const newComment = {
            "id": uuidv4(),
            "name": req.body.name,
            "comment": req.body.comment,
            "timestamp": Date.now(),
        }
        photo.comments.push(newComment);
        const photoArray = photos.findIndex((el) => el.id === req.params.id);
        photos[photoArray] = photo;
        fs.writeFile("./data/photos.json", JSON.stringify(photos, null, "\t"), "utf8", (err) => {
            console.log("Comment failed to load (without reload)", err)
        });
        res.json(newComment);
    }
})

export default router;