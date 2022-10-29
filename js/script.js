/* ------------------------------------- The Script will Be Executed When The Website is Loaded --------- */
$(document, window).ready(function () {
  /* ------------------------------------- Declaring some variables ------------------------------------- */
  let searchSection = document.getElementById("search")
  let contentSection = document.getElementById("content")
  let categorySection = document.getElementById("category")
  let areaSection = document.getElementById("area")
  let ingredientsSection = document.getElementById("ingredients")
  let contactSection = document.getElementById("contact")
  let contentDescSection = document.getElementById("content-desc")
  let searchByNameInput = document.getElementById("search-by-name")
  let searchByFirstLetterInput = document.getElementById("search-by-first-letter")
  let nameInput = document.getElementById("name-input")
  let emailInput = document.getElementById("email-input")
  let phoneInput = document.getElementById("phone-input")
  let ageInput = document.getElementById("age-input")
  let passwordInput = document.getElementById("password-input")
  let rePasswordInput = document.getElementById("re-password-input")
  let mealData;
  let mealId;

  /* ------------------------------------- Show Nav Bar ------------------------------------------------- */
  $(".open-btn").click(function () {
    $(this).addClass("d-none");
    $(".close-btn").removeClass("d-none");
    $(".navbar").addClass("show-nav");
  });

  /* ------------------------------------- Hide Nav Bar ------------------------------------------------- */
  $(".close-btn").click(function () {
    $(this).addClass("d-none");
    $(".open-btn").removeClass("d-none");
    $(".navbar").removeClass("show-nav");
  });

  /* ------------------------------------- Nav Bar Links ------------------------------------------------ */
  $("#search-link").click(function () {
    $("section").addClass("d-none");
    $(searchSection).removeClass("d-none");
    $(".navbar").removeClass("show-nav");
    $(".close-btn").addClass("d-none");
    $(".open-btn").removeClass("d-none");
    $(".loading-screen").show().fadeOut(1000);
  });

  $("#categories-link").click(function () {
    $("section").addClass("d-none");
    $(categorySection).removeClass("d-none");
    $(".navbar").removeClass("show-nav");
    $(".close-btn").addClass("d-none");
    $(".open-btn").removeClass("d-none");
    categoryMeal();
    $(".loading-screen").show().fadeOut(1000);
  });

  $("#area-link").click(function () {
    $("section").addClass("d-none");
    $(areaSection).removeClass("d-none");
    $(".navbar").removeClass("show-nav");
    $(".close-btn").addClass("d-none");
    $(".open-btn").removeClass("d-none");
    areaMeal();
    $(".loading-screen").show().fadeOut(1000);
  });

  $("#ingredients-link").click(function () {
    $("section").addClass("d-none");
    $(ingredientsSection).removeClass("d-none");
    $(".navbar").removeClass("show-nav");
    $(".close-btn").addClass("d-none");
    $(".open-btn").removeClass("d-none");
    ingredientMeal();
    $(".loading-screen").show().fadeOut(1000);
  });

  $("#contact-link").click(function () {
    $("section").addClass("d-none");
    $(contactSection).removeClass("d-none");
    $(".navbar").removeClass("show-nav");
    $(".close-btn").addClass("d-none");
    $(".open-btn").removeClass("d-none");
    $(".loading-screen").show().fadeOut(1000);
  });

  /* ------------------------------------- Get Api Data ------------------------------------------------- */
  async function getMeal(url = "https://www.themealdb.com/api/json/v1/1/search.php?s=") {
    let apiResponse = await fetch(url);
    let responseData = await apiResponse.json();
    mealData = responseData.meals;
    displayMeal(mealData);
  }

  getMeal();

  /* ------------------------------------- Display Api Data --------------------------------------------- */
  function displayMeal(meal) {
    $(".loading-screen").show().fadeOut(1000);
    if (meal != undefined) {
      let counter = "";
      for (let i = 0; i < meal.length; i++) {
        if (i < 20) {
          mealId = meal[i].idMeal
          counter += `
          <div class="content-box col-12 col-md-4 col-lg-3">
          <div class="content-boxs position-relative">
          <div class="content-box-img">
          <img class="img-fluid" src="${meal[i].strMealThumb}" alt="Cook Image">
          </div>
          <div class="content-box-text position-absolute start-0 d-flex align-items-center">
          <h3>${meal[i].strMeal}</h3>
          </div>
          </div>
          </div>
          `
        } else {
          i = meal.length
        }
      }
      document.getElementById("row-content").innerHTML = counter;
    } else {
      document.getElementById("row-content").innerHTML = '<h3 class="text-white text-center mt-5">No Result Found</h3>';
    }
    $(".content-box").click(function () {
      let contentText = $(this).find("h3").text();
      for (let i = 0; i < meal.length; i++) {
        if (contentText == meal[i].strMeal) {
          mealId = meal[i].idMeal
          contentDescMeal(mealId);
        }
      }
      $("section").addClass("d-none");
      $(contentDescSection).removeClass("d-none");
    });
  }

  /* ------------------------------------- Search By Name ----------------------------------------------- */
  searchByNameInput.addEventListener("input", async function () {
    let searchNameValue = this.value;
    let searchNameResult = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchNameValue}`);
    let searchNameResponseData = await searchNameResult.json();
    let searchNameMealData = searchNameResponseData.meals;
    if (searchNameMealData != null) {
      displayMeal(searchNameMealData);
      $(contentSection).removeClass("d-none");
    } else {
      displayMeal();
    }
  });

  /* ------------------------------------- Search By First Letter --------------------------------------- */
  searchByFirstLetterInput.addEventListener("input", async function () {
    let searchFirstValue = this.value;
    if (searchFirstValue.length == 1) {
      let searchFirstResult = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchFirstValue}`);
      let searchFirstResponseData = await searchFirstResult.json();
      let searchFirstMealData = searchFirstResponseData.meals;
      displayMeal(searchFirstMealData);
      $(contentSection).removeClass("d-none");
    } else {
      document.getElementById("row-content").innerHTML = '<h3 class="text-white lh-lg text-center mt-5">Please Enter one letter only. <br> No Result Found</h3>';
    }
  });

  /* ------------------------------------- Display Api Data By Category --------------------------------- */
  async function categoryMeal() {
    document.getElementById("row-content").innerHTML = "";
    let apiResponse = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let responseData = await apiResponse.json();
    let mealCatData = responseData.categories;
    let categoryCounter = "";
    for (let i = 0; i < mealCatData.length; i++) {
      if (i < 20) {
        categoryCounter += `
        <div class="category-box col-12 col-md-4 col-lg-3">
        <div class="content-box position-relative">
          <div class="content-box-img">
            <img class="img-fluid" src="${mealCatData[i].strCategoryThumb}" alt="Cook Image">
          </div>
          <div class="content-box-text position-absolute start-0 d-flex align-items-center">
            <div class="content-box-text-desc">
              <h3 class="w-100">${mealCatData[i].strCategory}</h3>
              <p>${mealCatData[i].strCategoryDescription}</p>
            </div>
          </div>
        </div>
      </div>
      `
      } else {
        i = mealCatData.length
      }
    }
    document.getElementById("row-category").innerHTML = categoryCounter;
    $(".category-box").click(function () {
      let categoryText = $(this).find("h3").text();
      getMeal(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryText}`);
      $("section").addClass("d-none");

      $(contentSection).removeClass("d-none");
    });
  }

  /* ------------------------------------- Display Api Data By Area ------------------------------------- */
  async function areaMeal() {
    document.getElementById("row-content").innerHTML = "";
    let apiResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let responseData = await apiResponse.json();
    let mealArearData = responseData.meals;
    let areaCounter = "";
    for (let i = 0; i < mealArearData.length; i++) {
      if (i < 20) {
        areaCounter += `
        <div class="area-box col-12 col-md-4 col-lg-3">
          <div class="areas-box text-center">
            <i class="fa-solid fa-city fa-3x"></i>
            <h2>${mealArearData[i].strArea}</h2>
          </div>
        </div>
      `
      } else {
        i = mealArearData.length
      }
    }
    document.getElementById("row-area").innerHTML = areaCounter;
    $(".area-box").click(function () {
      let areaText = $(this).find("h2").text();
      getMeal(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaText}`);
      $("section").addClass("d-none");
      $(contentSection).removeClass("d-none");
    });
  }

  /* ------------------------------------- Display Api Data By Ingredients ------------------------------ */
  async function ingredientMeal() {
    document.getElementById("row-content").innerHTML = "";
    let apiResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let responseData = await apiResponse.json();
    let mealIngrData = responseData.meals;
    let ingredientCounter = "";
    for (let i = 0; i < mealIngrData.length; i++) {
      if (i < 20) {
        ingredientCounter += `
        <div class="ingredient-box col-12 col-md-4 col-lg-3">
          <div class="ingredients-box text-center">
            <i class="fa-solid fa-bowl-food fa-3x"></i>
            <h2>${mealIngrData[i].strIngredient}</h2>
            <p>${mealIngrData[i].strDescription}</p>
          </div>
        </div>
      `
      } else {
        i = mealIngrData.length
      }
    }
    document.getElementById("row-ingredient").innerHTML = ingredientCounter;
    $(".ingredient-box").click(function () {
      let ingredientText = $(this).find("h2").text();
      getMeal(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientText}`);
      $("section").addClass("d-none");
      $(contentSection).removeClass("d-none");
    });
  }

  /* ------------------------------------- Display Api Data Desc ---------------------------------------- */
  async function contentDescMeal(id) {
    $(".loading-screen").show().fadeOut(1000);
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let responseData = await apiResponse.json();

    let mealDescData = responseData.meals;
    let contentDescCounter = "";
    let mealDescList = ""
    let mealDescTagsList = "";
    for (let i = 0; i < mealDescData.length; i++) {
      if (i < 20) {
        for (let j = 1; j <= 20; j++) {
          let listMeasure = mealDescData[i][`strMeasure${j}`]
          let listIngredient = mealDescData[i][`strIngredient${j}`]
          if (listMeasure.length > 0 && listIngredient.length > 0) {
            mealDescList += `<li class="my-3 mx-1 p-1 alert alert-success rounded">${listMeasure} ${listIngredient}</li>`
          }
        }

        let mealDescTags = mealDescData[i].strTags
        let mealDescTagsSplit
        if (mealDescTags != null) {
          mealDescTagsSplit = mealDescTags.split(",");
        }

        if (mealDescTagsSplit != undefined) {
          for (let k = 0; k < mealDescTagsSplit.length; k++) {
            mealDescTagsList += `<li class="my-3 mx-1 p-1 alert alert-danger rounded">${mealDescTagsSplit[k]}</li>`
          }
        }
        console.log(mealDescTagsList);

        contentDescCounter += `
        <div class="col-12 col-md-4">
        <div class="content-desc-box">
          <div class="content-desc-box-img">
            <img class="img-fluid" src="${mealDescData[i].strMealThumb}" alt="Cook Image">
          </div>
          <div class="content-box-desc-text">
            <h2 class="mt-3 text-center">${mealDescData[i].strMeal}</h2>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <div class="content-desc-box">
          <div class="content-box-desc-text">
            <h3>Instructions</h3>
            <p>${mealDescData[i].strInstructions}</p>
            <p><span> Area : </span>${mealDescData[i].strArea}</p>
            <p><span>Category : </span>${mealDescData[i].strCategory}</p>
            <h4>Recipes :</h4>
            <ul class="d-flex flex-wrap list-unstyled" id="recipes">
              ${mealDescList}
            </ul>
            <h4 class="mb-4">Tags :</h4>
            <ul class="d-flex flex-wrap list-unstyled" id="tags">
              ${mealDescTagsList}
            </ul>
            <a class="btn btn-success text-white" target="_blank"
              href="${mealDescData[i].strSource}">Source</a>
            <a class="btn youtube text-white" target="_blank"
              href="${mealDescData[i].strYoutube}">Youtube</a>
          </div>
        </div>
      </div>
      `
      } else {
        i = mealDescData.length
      }
    }

    document.getElementById("row-content-desc").innerHTML = contentDescCounter;
  }

  /* ------------------------------------- Check That The Contact Inputs are Valid ---------------------- */
  function check() {
    if (
      nameInput.classList.contains("is-valid") &&
      emailInput.classList.contains("is-valid") &&
      phoneInput.classList.contains("is-valid") &&
      ageInput.classList.contains("is-valid") &&
      passwordInput.classList.contains("is-valid") &&
      rePasswordInput.classList.contains("is-valid")) {
      $("#submit-btn").attr("disabled", false);
      console.log("true");
    } if (
      nameInput.classList.contains("is-invalid") ||
      emailInput.classList.contains("is-invalid") ||
      phoneInput.classList.contains("is-invalid") ||
      ageInput.classList.contains("is-invalid") ||
      passwordInput.classList.contains("is-invalid") ||
      rePasswordInput.classList.contains("is-invalid")) {
      $("#submit-btn").attr("disabled", true);
      console.log("false");
    }
  }

  /* ------------------------------------- Check That The Name Input is Valid --------------------------- */
  nameInput.addEventListener("input", function () {
    let pattern = /^[a-zA-Z]*$/gm;
    if (this.value != "") {
      if (pattern.test(this.value)) {
        $(this).addClass("is-valid");
        $(this).removeClass("is-invalid");
        $("#name-lable").addClass("d-none");
      } else {
        $(this).removeClass("is-valid");
        $(this).addClass("is-invalid");
        $("#name-lable").removeClass("d-none");
      }
    } else if ($(nameInput).hasClass("is-valid")) {
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      $("#name-lable").removeClass("d-none");
    }
    check();
  });

  /* ------------------------------------- Check That The Email Input is Valid -------------------------- */
  emailInput.addEventListener("input", function () {
    let pattern = /(.+)@(.+){2,}\.(.+){2,}/gm;
    if (this.value != "") {
      if (pattern.test(this.value)) {
        $(this).addClass("is-valid");
        $(this).removeClass("is-invalid");
        $("#email-lable").addClass("d-none");
      } else {
        $(this).removeClass("is-valid");
        $(this).addClass("is-invalid");
        $("#email-lable").removeClass("d-none");
      }
    } else if ($(emailInput).hasClass("is-valid")) {
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      $("#email-lable").removeClass("d-none");
    }
    check();
  });

  /* ------------------------------------- Check That The Phone Input is Valid -------------------------- */
  phoneInput.addEventListener("input", function () {
    let pattern = /^01[0|1|2|5][0-9]{8}$/gm;
    if (this.value != "") {
      if (pattern.test(this.value)) {
        $(this).addClass("is-valid");
        $(this).removeClass("is-invalid");
        $("#phone-lable").addClass("d-none");
      } else {
        $(this).removeClass("is-valid");
        $(this).addClass("is-invalid");
        $("#phone-lable").removeClass("d-none");
      }
    } else if ($(phoneInput).hasClass("is-valid")) {
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      $("#phone-lable").removeClass("d-none");
    }
    check();
  });

  /* ------------------------------------- Check That The Age Input is Valid ---------------------------- */
  ageInput.addEventListener("input", function () {
    let pattern = /^[1-9]{1,3}$/gm;
    if (this.value != "") {
      if (pattern.test(this.value)) {
        $(this).addClass("is-valid");
        $(this).removeClass("is-invalid");
        $("#age-lable").addClass("d-none");
      } else {
        $(this).removeClass("is-valid");
        $(this).addClass("is-invalid");
        $("#age-lable").removeClass("d-none");
      }
    } else if ($(ageInput).hasClass("is-valid")) {
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      $("#age-lable").removeClass("d-none");
    }
    check();
  });

  /* ------------------------------------- Check That The Password Input is Valid ----------------------- */
  passwordInput.addEventListener("input", function () {
    let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;
    if (this.value != "") {
      if (pattern.test(this.value)) {
        $(this).addClass("is-valid");
        $(this).removeClass("is-invalid");
        $("#password-lable").addClass("d-none");
      } else {
        $(this).removeClass("is-valid");
        $(this).addClass("is-invalid");
        $("#password-lable").removeClass("d-none");
      }
    } else if ($(passwordInput).hasClass("is-valid")) {
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      $("#password-lable").removeClass("d-none");
    }
    check();
  });

  /* ------------------------------------- Check That The Repassword Input is Valid --------------------- */
  rePasswordInput.addEventListener("input", function () {
    if (this.value != "") {
      if (this.value == passwordInput.value) {
        $(this).addClass("is-valid");
        $(this).removeClass("is-invalid");
        $("#re-password-lable").addClass("d-none");
      } else {
        $(this).removeClass("is-valid");
        $(this).addClass("is-invalid");
        $("#re-password-lable").removeClass("d-none");
      }
    } else if ($(rePasswordInput).hasClass("is-valid")) {
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      $("#re-password-lable").removeClass("d-none");
    }
    check();
  });

  /* ------------------------------------- Reload The Website When The Button is Clicked ---------------- */
  $("#submit-btn").click(function () {
    location.reload();
  });

  /* ------------------------------------- Hide The Loading Screen When The Website is Loaded ----------- */
  $(".loading-screen").fadeOut(500);
});