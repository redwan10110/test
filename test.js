const titleInput = document.getElementById("title");
const ingredientsInput = document.getElementById("ingredients");
const instructionsInput = document.getElementById("instructions");
const addBtn = document.getElementById("add-recipe-btn");
const recipeList = document.getElementById("recipes");
const cancelBtn = document.getElementById("cancel-edit-btn");

let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
let editingIndex = -1;

cancelBtn.addEventListener("click", () => {
  clearForm();
  editingIndex = -1;
  addBtn.textContent = "Add Recipe";
  cancelBtn.style.display = "none";
});

function saveToLocalStorage() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function renderRecipes() {
  recipeList.innerHTML = "";

  recipes.forEach((recipe, index) => {
    const { title, ingredients, instructions } = recipe;

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${title}</strong><br>
      <em>Ingredients:</em> ${ingredients.join(", ")}<br>
      <em>Instructions:</em> ${instructions}<br>
    `;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editRecipe(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteRecipe(index));

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    const hr = document.createElement("hr");
    li.appendChild(hr);

    recipeList.appendChild(li);
  });
}

function addRecipe() {
  const title = titleInput.value.trim();
  const ingredients = ingredientsInput.value
    .split(",")
    .map((i) => i.trim())
    .filter(Boolean);
  const instructions = instructionsInput.value.trim();

  if (!title || ingredients.length === 0 || !instructions) {
    alert("Please fill in all fields.");
    return;
  }

  const recipe = { title, ingredients, instructions };

  if (editingIndex !== -1) {
    recipes[editingIndex] = recipe;
    editingIndex = -1;
    addBtn.textContent = "Add Recipe";
    cancelBtn.style.display = "none";
  } else {
    recipes.push(recipe);
  }

  saveToLocalStorage();
  clearForm();
  renderRecipes();
}

function editRecipe(index) {
  const { title, ingredients, instructions } = recipes[index];

  titleInput.value = title;
  ingredientsInput.value = ingredients.join(", ");
  instructionsInput.value = instructions;

  editingIndex = index;
  addBtn.textContent = "Save Changes";
  cancelBtn.style.display = "inline";
}

function deleteRecipe(index) {
  recipes.splice(index, 1);
  saveToLocalStorage();
  renderRecipes();
}

function clearForm() {
  titleInput.value = "";
  ingredientsInput.value = "";
  instructionsInput.value = "";
}

addBtn.addEventListener("click", addRecipe);

// Initial load
renderRecipes();
