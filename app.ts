import { JSDOM } from "jsdom";

// Create a simple DOM for the document
const dom = new JSDOM("<!DOCTYPE html><div class='container'></div>");
const container = dom.window.document.querySelector(".container");

if (!container) {
  throw new Error("Container not found in the virtual DOM.");
}

const baseUrl = "http://localhost:2024";

interface Todo {
  name: string;
  // Add any other properties your 'Todo' items may have
}

let todos: Todo[] = [];

const fetchData = async (): Promise<Todo[]> => {
  try {
    const res = await fetch(`${baseUrl}/todos`, {
      method: "GET",
    });

    const json = await res.json();
    console.log(json);

    todos = json.data as Todo[];
    return todos;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const renderTodos = async () => {
  container.innerHTML = "";
  try {
    await fetchData();

    for (const todo of todos) {
      container.innerHTML += todo.name + "<br>";
    }
  } catch (error) {
    console.error("Error rendering todos:", error);
  }
};

renderTodos();

const postData = async () => {
  try {
    const body = {
      name: "hussain",
    };

    const res = await fetch(`${baseUrl}/todos`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    console.log(json);
    renderTodos();
  } catch (error) {
    console.error("Error posting data:", error);
  }
};
