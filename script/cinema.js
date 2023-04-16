
const container = $(".seat");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
var code = document.getElementById("code");
const movieSelect = document.getElementById("movie");
localStorage.removeItem("selectedSeats");
localStorage.removeItem("selectedMoviePrice");
localStorage.removeItem("foodtotal");
localStorage.removeItem("disscount");
var discountcupons = [];
populateUI();
let ticketPrice = +movieSelect.value;
setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
};
updateSelectedCount = (msg) => {
  const foo = (...args) => {
    console.log(args);
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const seatsIndex = [...selectedSeats].map((seat) => {
      return [...seats].indexOf(seat);
    });

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    var totalReuslt;
    var foodprice = Number(localStorage.getItem("foodtotal"));
    var precentage = Number(localStorage.getItem("disscount"))
    const selectedSeatsCount = selectedSeats.length;
    if (args[0] == "plus") {
      totalReuslt = foodprice + (selectedSeatsCount * ticketPrice);
    }
    else if (args[0] == "minus") {
      totalReuslt = foodprice - (selectedSeatsCount * ticketPrice)

    }
    else {
      totalReuslt = foodprice + (selectedSeatsCount * ticketPrice)

    }
    if (precentage !== 0) {
      var result = (totalReuslt / 100) * precentage;
      total.innerText = result.toFixed(2);;
    }
    else {
      count.innerText = selectedSeatsCount;
      total.innerText = totalReuslt;
    }
  }
  foo(msg);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.on("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});
updateSelectedCount();
const inputField = document.getElementById('food1');
$(".plus").on("click", function (event) {
  var item = $(this).parent().siblings().eq(1);
  event.preventDefault();
  const currentValue = Number(item.val()) + 1;
  $(item).val(currentValue);
  var foodPrice = Number(event.target.value);
  var final = +Number(localStorage.getItem("foodtotal")) + foodPrice;
  localStorage.setItem("foodtotal", final);
  updateSelectedCount("plus");
})

$(".minus").on("click", function (e) {
  var item = $(this).parent().siblings().eq(1);
  e.preventDefault();
  if (item.val < 0) {
    return
  }
  else {
    const currentValue = Number(item.val()) - 1;
    $(item).val(currentValue);
  }
  var foodPrice = Number(event.target.value);
  if (foodPrice >= 0) {
    var final = +Number(localStorage.getItem("foodtotal")) - foodPrice;
    localStorage.setItem("foodtotal", final);
    updateSelectedCount("minus");
  }
})
// $(".applycoupon").on("click", function () {
//   var codetext = String(code.value).toLowerCase();
//   var precentage = 20;
//   if (codetext == "knowledge academy") {
//     localStorage.setItem("disscount", precentage);
//   }
//   updateSelectedCount();
// })