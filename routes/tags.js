import express from "express";
import tags from '../data/tags.json' with {type: "json"};

const router = express.Router();

router.get("/", function (request, response) {
    response.json(tags);
});

export default router;