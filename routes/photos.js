import express from "express";
import photos from "../data/photos.json" with {type: "json"};

const router = express.Router();

router.get("/", function (request, response) {
    response.json(photos);
});

// router.get("/:id", function(request, response) {

// });

export default router;