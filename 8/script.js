const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_metaEl = document.getElementById("single-meal");

const searchMeal = async function (e) {
  e.preventDefault();
  mealsEl.innerHTML = "";
  single_metaEl.innerHTML = "";

  const term = search.value;

  if (term.trim()) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    const data = await res.json();
    resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

    if (!data.meals)
      resultHeading.innerHTML = `<p>There are no search results. Please try again!</p>`;

    data.meals.forEach((meal) => {
      const markup = `
         <div class="meal" data-mealID="${meal.idMeal}">
            <img src="${meal.strMealThumb}" atl="${meal.strMeal}" />
            <div class="meal-info">
               <h3>${meal.strMeal}</h3>
            </div>
         </div>
       `;
      mealsEl.insertAdjacentHTML("afterbegin", markup);
    });
    search.value = "";
  } else {
    alert("You must type something");
  }
};

const getRandomMeal = function () {
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDom(meal);
    });
};

const addMealToDom = function (meal) {
  mealsEl.innerHTML = "";
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  console.log(ingredients);
  single_metaEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
};

const getMealById = function (mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDom(meal);
    });
};

submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);
mealsEl.addEventListener("click", function (e) {
  const meal = e.target.closest(".meal");

  if (!meal) return;
  const { mealid } = meal.dataset;

  getMealById(mealid);
});
