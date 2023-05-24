let second_box = document.getElementById("second");

function pixel_creater() {
  for (let pixel_creater_i = 0; pixel_creater_i < 400; pixel_creater_i++) {
    let pixel = document.createElement("div");
    second_box.appendChild(pixel);
    let pixel_creater_v = 1;
    let pixel_creater_k = 1;
    pixel_creater_v++;
    if (pixel_creater_v == 10) {
      pixel_creater_k++;
      pixel_creater_v = 0;
    }
    pixel.id = pixel_creater_v + "rowbox" + pixel_creater_k;
    pixel.className = "box";
  }
}
pixel_creater();

let body = document.body;
let button = document.querySelectorAll(".box");
let click = false;

body.addEventListener("mousedown", (event) => {
  if (event.buttons === 1) {
    click = true;
    // console.log("click")
  }
});
body.addEventListener("mouseup", (event) => {
  if (event.button === 0) {
    click = false;
    // console.log("no click")
  }
});

button.forEach((button) => {
  button.addEventListener("mouseover", () => {
    if (click == true) {
      button.style.background = `black`;
    }
  });
});



let A_1_length = 16;
let A_2_length = 16;
let A_3_length = 10;

let A_0 = [];
let A_1 = [];
let A_2 = [];
let A_3 = [];

let W_1 = [];
let W_2 = [];
let W_3 = [];

let B_1 = [];
let B_2 = [];
let B_3 = [];

function neural_network_main() {
  button.forEach((button) => {
    if (button.style.background != "black") {
      A_0.push(0);
    } else {
      A_0.push(1);
    }
  });




  function W_1_function_random_no() {
    let W_1_length = A_1_length * A_0.length;
    for (let i = 0; i < W_1_length; i++) {
      W_1.push(random(2));
    }
  }
  function B_1_function_random_no() {
    let B_1_length = A_1_length;
    for (let i = 0; i < B_1_length; i++) {
      B_1.push(random(2))
    }
  }
  function W_2_function_random_no() {
    let W_2_length = A_1_length * A_2_length;
    for (let i = 0; i < W_2_length; i++) {
      W_2.push(random(2));
    }
  }
  function B_2_function_random_no() {
    let B_2_length = A_2_length;
    for (let i = 0; i < B_2_length; i++) {
      B_2.push(random(2))
    }
  }

  function W_3_function_random_no() {
    let W_3_length = A_2_length * A_3_length;
    for (let i = 0; i < W_3_length; i++) {
      W_3.push(random(2));
    }
  }
  function B_3_function_random_no() {
    let B_3_length = A_3_length;
    for (let i = 0; i < B_3_length; i++) {
      B_3.push(random(2))
    }
  }


  W_1_function_random_no();
  B_1_function_random_no();
  W_2_function_random_no();
  B_2_function_random_no();
  W_3_function_random_no();
  B_3_function_random_no();

  // console.log(W_1)
  
  A_1 = forward_propogation(A_0, W_1, B_1, "TanH")
  A_2 = forward_propogation(A_1, W_2, B_2, "TanH")
  A_3 = forward_propogation(A_2, W_3, B_3,"TanH")
document.write(A_0);
  // console.log(A_1);
  // console.log(A_2);
  // console.log(A_3);
  // console.log(softmax(A_3));
}

