search("").then(() => {
  $(".loading-screen").fadeOut(500, () => {
    $("body").css("overflow", "visible")
  })
});

var navbarWidth = 0,
  isTrue = !0,
  data = [];


// --------------------------------Sidebar Animation----------------------------------------------------------------
$(".sidebar-toggel-menu").click(function () {
  isTrue ? ($(".nav-tab-menu").addClass("open-menu").removeClass("close-menu"), navbarWidth = $(".nav-tab-menu").width() - 10, $(".sidebar-header-nav ").css("left", navbarWidth), $(".fa-align-justify").toggleClass("fa-times"), $(".nav-tab-menu .item1").animate({
    opacity: "1",
    paddingTop: "25px"
  }, 1000), $(".nav-tab-menu .item2").animate({
    opacity: "1",
    paddingTop: "25px"
  }, 1100), $(".nav-tab-menu .item3").animate({
    opacity: "1",
    paddingTop: "25px"
  }, 1200), $(".nav-tab-menu .item4").animate({
    opacity: "1",
    paddingTop: "25px"
  }, 1300), $(".nav-tab-menu .item5").animate({
    opacity: "1",
    paddingTop: "25px"
  }, 1400), $(".nav-tab-menu .item6").animate({
    opacity: "1",
    paddingTop: "25px"
  }, 1500), isTrue = !isTrue) : ($(".nav-tab-menu").addClass("close-menu").removeClass("open-menu"), $(".fa-align-justify").toggleClass("fa-times"), $(".sidebar-header-nav").css("left", 0), $(".nav-tab-menu li").animate({
    opacity: "0",
    paddingTop: "500px"
  }, 500), isTrue = !isTrue)
});


var isSearchTrue = !0;
$(".strip-search").click(function () {
  isSearchTrue ? ($(".search").addClass("open-menu").removeClass("close-search"), $(".fa-search").toggleClass("fa-times"), $(".search-input").animate({
    top: "49%"
  }, 1500, function () {
    $(".search-input").animate({
      top: "50%"
    }, 250)
  }), isSearchTrue = !isSearchTrue) : ($(".search").addClass("close-search").removeClass("open-menu"), $(".fa-search").toggleClass("fa-times"), $(".search-input").animate({
    top: "300%"
  }), isSearchTrue = !isSearchTrue)
});

var row = document.getElementById("rowData");


async function search(r) {
  $(".loading-container").fadeIn(100)
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${r}`)
  meals = await meals.json()
  displayMeals(meals.meals)
  $(".loading-container").fadeOut(400)
  return meals
};

// ----------------------------Display Categories---------------------------------------------
function displayCategories() {
  let e = ""
  for (var i = 0; i < data.length; i++) e += `
  <div class="col-md-6 col-lg-3 my-3 myM shadow">
      <div class="movie shadow rounded position-relative">
          <div onclick="filterByCategory('${data[i].strCategory}')" class="post">
              <img src='${data[i].strCategoryThumb}' class="w-100 rounded" />
              <div class="layer d-flex align-items-center ">
                  <div class="info p-2">
                      <h2>${data[i].strCategory}</h2>
                      <p>${data[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                  </div>
              </div>
          </div>
      </div>
  </div>`
  row.innerHTML = e
  $("html, body").animate({
    scrollTop: 0
  }, 200)
};

// -------------------------Display Area---------------------------------------------------
function displayArea() {
  let e = ""
  for (var i = 0; i < data.length; i++) e += `
  <div class="col-md-6 col-lg-3 my-3 myM  shadow">
      <div class="movie shadow rounded position-relative">
          <div onclick=(filterByArea('${data[i].strArea}')) class="post ">
              <i class="fa-solid fa-city fa-3x"></i>
              <h2 class="text-white">${data[i].strArea}</h2>
          </div>
      </div>
  </div>`
  row.innerHTML = e
  $("html, body").animate({
    scrollTop: 0
  }, 200)

};


// -------------------------Display Ingredients---------------------------------------------------
function displayIngredients() {
  let e = ""
  for (var i = 0; i < data.length; i++) e += `
  <div class="col-md-6 col-lg-3 my-3 myM  shadow">
      <div onclick="getMainIngredient('${data[i].strIngredient}')" class="movie shadow rounded position-relative">
          <div class="post ">
              <i class="fa-solid fa-bowl-food fa-3x"></i>
              <h2 class="text-white">${data[i].strIngredient}</h2>
              <p class="text-white">${data[i].strDescription.split(" ").splice(0, 20).join(" ")}</p>
          </div>
      </div>
  </div>`
  row.innerHTML = e
  $("html, body").animate({
    scrollTop: 0
  }, 200)
};

async function getMainIngredient(mealName) {
  $(".loading-container").fadeIn(100)
  let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
  meal = await meal.json()
  displayMeals(meal.meals)
  $(".loading-container").fadeOut(500)
};

// ----------------------------Display Meals----------------------------------------------------------
function displayMeals(data) {

  let meals = ""
  for (let i = 0; i < data.length; i++) {
    meals += `
      <div class="col-md-6 col-lg-3 my-3 myM  shadow">
          <div onclick="getMeal('${data[i].idMeal}')" class="movie shadow rounded position-relative">
              <div class="post ">
                  <img src='${data[i].strMealThumb}' class="w-100 rounded" />
                  <div class="layer d-flex align-items-center ">
                      <div class="info p-2">
                          <h2>${data[i].strMeal}</h2>
                      </div>
                  </div>
              </div>
          </div>
      </div>`
  }
  row.innerHTML = meals
  $("html, body").animate({
    scrollTop: 0
  }, 200)
}

async function getMeal(mealID) {
  $(".loading-container").fadeIn(100)
  let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  meal = await meal.json()
  displayMeal(meal.meals[0])
  $(".loading-container").fadeOut(500)
};


function displayMeal(meal) {
  let recipes = ""
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
    }
  }

  let mealTags = meal.strTags?.split(",")
  let tagsStr = ""
  for (let i = 0; i < mealTags?.length; i++) {
    tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${mealTags[i]}</li>`
  }

  let str = `
  <div class="col-md-4 myM text-white">
        <img class="w-100" src="${meal.strMealThumb}" alt=""
          srcset=""><br>
        <h1>${meal.strMeal}</h1>
      </div>
      <div class="col-md-8 myM text-white ">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
        <p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
        <h3>Recipes :</h3>
        <ul class="d-flex text-center " id="recipes">
        </ul>

        <h3 class="my-2 mx-1 p-1">Tags :</h3>
        <ul class="d-flex " id="tags">
        </ul>

        
        <a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
        <a class="btn youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
      </div>`
  row.innerHTML = str
  document.getElementById("recipes").innerHTML = recipes
  document.getElementById("tags").innerHTML = tagsStr
  $("html, body").animate({
    scrollTop: 0
  }, 200)

};

async function getCategories(listBy) {
  x = await fetch(`https://www.themealdb.com/api/json/v1/1/${listBy}`);
  x = await x.json()
  return x;

};

async function getByLetter(letter) {
  if (letter) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    meals = await meals.json()
    if (meals.meals) {
      displayMeals(meals.meals)
    }
    $(".loading-container").fadeOut(100)
  }
};

async function filterByCategory(category) {
  $(".loading-container").fadeIn(100)
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  meals = await meals.json()
  displayMeals(meals.meals)
  $(".loading-container").fadeOut(500)
};

async function filterByArea(area) {
  $(".loading-container").fadeIn(100)
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  meals = await meals.json()
  displayMeals(meals.meals.slice(0, 20))
  $(".loading-container").fadeOut(500)
};


$(".nav-item a").click(async (e) => {
  let listBy = e.target.getAttribute("data-list")

  document.getElementById("search-container").innerHTML = ""
  row.innerHTML = ""
  $("html, body").animate({
    scrollTop: 0
  }, 200)

  if (listBy == "contact") {

    row.innerHTML = `
      <section id="contact" class="container myM w-75 mx-auto mb-5 ">
  <div class="p-2">
    <h2 class="text-light mb-5">ContacUs...</h2>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <input class="form-control shadow " onkeyup="validation()" id="name"
            placeholder="Enter Your Name">
          <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
            Special Characters and Numbers not allowed
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Email">
          <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
            Enter valid email. *Ex: xxx@yyy.zzz
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
          <div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
            Enter valid Phone Number
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
          <div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
            Enter valid Age
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <input onkeyup="validation()" class="form-control" type="password" id="password"
            placeholder="Enter Password">
          <div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
            Enter valid password *Minimum eight characters, at least one letter and one number:*
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <input onkeyup="validation()" class="form-control" type="password" id="rePassword"
            placeholder="Enter RePassword">
          <div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
            Enter valid Repassword
          </div>
        </div>
      </div>


    </div>

    <button type="submit" disabled id="submitBtn" class="btn btn-outline-danger mt-3">Submit</button>
  </div>

</section>`
    nameInput = document.getElementById("name"),
      emailInput = document.getElementById("email"),
      phoneInput = document.getElementById("phone"),
      ageInput = document.getElementById("age"),
      passwordInput = document.getElementById("password"),
      repasswordInput = document.getElementById("rePassword"),
      nameError = document.getElementById("namealert"),
      emailError = document.getElementById("emailalert"),
      phoneError = document.getElementById("phonealert"),
      ageError = document.getElementById("agealert"),
      passwordError = document.getElementById("passwordalert"),
      repasswordError = document.getElementById("repasswordalert");

    nameInput.addEventListener("focus", () => {
      nameType= true
    })
    emailInput.addEventListener("focus", () => {
      emailType = true
    })
    phoneInput.addEventListener("focus", () => {
      phoneType = true
    })
    ageInput.addEventListener("focus", () => {
      ageType = true
    })
    passwordInput.addEventListener("focus", () => {
      passwordType = true
    })
    repasswordInput.addEventListener("focus", () => {
      repasswordType = true
    })
  }
  if (listBy == "search") {
    row.innerHTML = ""
    document.getElementById("search-container").innerHTML = `
      <div class="row">
      <div class="col-md-6"><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
      </div>
      <div class="col-md-6">
        <input class="form-control " type="text" maxlength="1" id="letter"
          placeholder="search By First Letter...">
      </div>

    </div>`

    $("#searchInput").keyup((e) => {
      search(e.target.value)
    })
    $("#letter").keyup((e) => {
      getByLetter(e.target.value)
    })

    $('#letter').on("input", function () {
      if (this.value.length > 1)
        this.value = this.value.slice(0, 1);
    });
  }


  let click_event = new CustomEvent('click');
  document.querySelector('.sidebar-toggel-menu').dispatchEvent(click_event);

  let x;

  if (listBy == "categories") {
    $(".loading-container").fadeIn(100)

    x = await getCategories(listBy + ".php")
    data = x.categories.splice(0, 20);
    displayCategories()
    $(".loading-container").fadeOut(500)
  } else if (listBy == "a") {
    $(".loading-container").fadeIn(100)

    x = await getCategories("list.php?a=list")
    data = x.meals.splice(0, 20);
    displayArea()
    $(".loading-container").fadeOut(500)
  } else if (listBy == "i") {
    $(".loading-container").fadeIn(100)

    x = await getCategories("list.php?i=list")
    data = x.meals.splice(0, 20);
    displayIngredients()
    $(".loading-container").fadeOut(500)
  }





})

$(document).scroll((e) => {

  if ($(document).scrollTop()) {
    $(".mmm").css("backgroundColor", "#0D0D0D")
  }
})


//------------------------------Validation-----------------------------------------------------------------
let nameInput,
  emailInput,
  phoneInput,
  ageInput,
  passwordInput,
  repasswordInput,
  nameError,
  emailError,
  phoneError,
  ageError,
  passwordError,
  repasswordError;

let nameType = false,
  emailType = false,
  phoneType = false,
  ageType = false,
  passwordType = false,
  repasswordType= false;

function validation() {

  if (nameType) {
    if (userNameValid()) {
      nameInput.classList.remove("is-invalid")
      nameInput.classList.add("is-valid")
      nameError.classList.replace("d-block", "d-none")
      nameError.classList.replace("d-block", "d-none")

    } else {
      nameInput.classList.replace("is-valid", "is-invalid")
      nameError.classList.replace("d-none", "d-block")
    }
  }

  if (emailType) {
    if (userEmailValid()) {
      emailInput.classList.remove("is-invalid")
      emailInput.classList.add("is-valid")
      emailError.classList.replace("d-block", "d-none")
      emailError.classList.replace("d-block", "d-none")
    } else {
      emailInput.classList.replace("is-valid", "is-invalid")
      emailError.classList.replace("d-none", "d-block")
    }
  }

  if (phoneType) {
    if (userPhoneValid()) {
      phoneInput.classList.remove("is-invalid")
      phoneInput.classList.add("is-valid")
      phoneError.classList.replace("d-block", "d-none")
      phoneError.classList.replace("d-block", "d-none")
    } else {
      phoneInput.classList.replace("is-valid", "is-invalid")
      phoneError.classList.replace("d-none", "d-block")
    }
  }

  if (ageType) {
    if (userAgeValid()) {
      ageInput.classList.remove("is-invalid")
      ageInput.classList.add("is-valid")
      ageError.classList.replace("d-block", "d-none")
      ageError.classList.replace("d-block", "d-none")
    } else {
      ageInput.classList.replace("is-valid", "is-invalid")
      ageError.classList.replace("d-none", "d-block")
    }
  }

  if (passwordType) {
    if (userPasswordValid()) {
      passwordInput.classList.remove("is-invalid")
      passwordInput.classList.add("is-valid")
      passwordError.classList.replace("d-block", "d-none")
      passwordError.classList.replace("d-block", "d-none")
    } else {
      password.classList.replace("is-valid", "is-invalid")
      passwordError.classList.replace("d-none", "d-block")
    }
  }

  if (repasswordType) {
    if (userRePasswordValid()) {
      repasswordInput.classList.remove("is-invalid")
      rePasswordInput.classList.add("is-valid")
      repasswordError.classList.replace("d-block", "d-none")
      repasswordError.classList.replace("d-block", "d-none")
    } else {
      rePasswordInput.classList.replace("is-valid", "is-invalid")
      repasswordError.classList.replace("d-none", "d-block")
    }
  }

  if (userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()) {
    document.getElementById("submitBtn").removeAttribute("disabled")
  } else {
    document.getElementById("submitBtn").setAttribute("disabled", "true")
  }

}

function userNameValid() {
  return /^[a-zA-Z ]+$/.test(nameInput.value)
}

function userEmailValid() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value)
}

function userPhoneValid() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneInput.value)
}

function userAgeValid() {
  return /^[1-9][0-9]?$|^100$/.test(ageInput.value)
}

function userPasswordValid() {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password.value)
}

function userRePasswordValid() {
  return userPassword.value == repassword.value
}





