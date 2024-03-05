import express, { Request, Response } from "express";
const router = express.Router();

interface Todo {
  name: string;
}

const todos: Todo[] = [
  { name: "obaid" },
  { name: "shezad" },
  { name: "hammad" }
];

router.get("/", (_: Request, response: Response<{ message: string; data: Todo[] }>) => {
  try {
    response.status(200).send({
      message: "data fetched successfully.",
      data: todos
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      message: "Something went wrong.",
      data: []
    });
  }
});

router.post("/", (request: Request<{}, {}, Todo>, response: Response<{ message: string; data: Todo[] }>) => {
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
  } catch (error) {
    console.log(error, "this is error");
    response.status(500).send({
      message: (error as Error).message,
      data: todos
    });
  }
});

router.put("/:id", (request: Request<{ id: string }, {}, Todo>, response: Response<{ message: string; data: Todo[] }>) => {
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
  } catch (error) {
    response.status(500).send({
      message: (error as Error).message,
      data: todos
    });
  }
});

router.delete("/:id", (request: Request<{ id: string }>, response: Response<{ message: string; data: Todo[] }>) => {
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
  } catch (error) {
    response.status(500).send({
      message: (error as Error).message,
      data: todos
    });
  }
});

export default router;
