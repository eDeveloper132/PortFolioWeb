import express from "express";
export const router = express.Router();
export const todos = [
    { name: "obaid" },
    { name: "shezad" },
    { name: "hammad" }
];
router.post("/", (request, response) => {
    try {
        const body = request.body;
        if (!body.name) {
            return response.status(400).send({
                message: "missing required params.",
                data: todos
            });
        }
        todos.push({ name: body.name });
        response.status(200).send({
            message: "data added successfully.",
            data: todos
        });
    }
    catch (error) {
        console.log(error, "this is error");
        response.status(500).send({
            message: error.message,
            data: todos
        });
    }
});
router.put("/:id", (request, response) => {
    try {
        const name = request.body.name;
        const id = parseInt(request.params.id, 10);
        if (isNaN(id) || !name) {
            return response.status(400).send({
                message: "missing required params.",
                data: todos
            });
        }
        if (id < 0 || id >= todos.length) {
            return response.status(400).send({
                message: "item not found.",
                data: todos
            });
        }
        todos[id] = { name: name };
        response.status(200).send({
            message: "data updated successfully.",
            data: todos
        });
    }
    catch (error) {
        response.status(500).send({
            message: error.message,
            data: todos
        });
    }
});
router.delete("/:id", (request, response) => {
    try {
        const id = parseInt(request.params.id, 10);
        if (isNaN(id)) {
            return response.status(400).send({
                message: "missing required params.",
                data: todos
            });
        }
        if (id < 0 || id >= todos.length) {
            return response.status(400).send({
                message: "item not found.",
                data: todos
            });
        }
        const updatedTodos = todos.filter((_, index) => index !== id);
        response.status(200).send({
            message: "data deleted successfully.",
            data: updatedTodos
        });
    }
    catch (error) {
        response.status(500).send({
            message: error.message,
            data: todos
        });
    }
});
export default router;
