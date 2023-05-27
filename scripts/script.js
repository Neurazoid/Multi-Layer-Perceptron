let second_box = document.getElementById("second");
let output_text = document.getElementById("output_text");

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

let A_0_length = 400;
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

let alpha = 2;

function W_1_function_random_no() {
  let W_1_length = A_1_length * A_0_length;
  for (let i = 0; i < W_1_length; i++) {
    W_1.push(random(2));
  }
}
function B_1_function_random_no() {
  let B_1_length = A_1_length;
  for (let i = 0; i < B_1_length; i++) {
    B_1.push(random(2));
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
    B_2.push(random(2));
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
    B_3.push(random(2));
  }
}

W_1_function_random_no();
B_1_function_random_no();
W_2_function_random_no();
B_2_function_random_no();
W_3_function_random_no();
B_3_function_random_no();

let dZ3 = [];
let dW3 = [];
let dB3 = null;
let dZ2 = null;
let dW2 = null;
let dB2 = null;
let dZ1 = null;
let dW1 = null;
let dB1 = null;
function train_neural_network() {

  function back_propogation() {
    let train_data_length = Object.keys(Neural_Network_Train_Data).length;
    

    let xA_1;
    let xA_2;
    let xA_3;
    let softmax_xA_3;
    // this is used for dZ3 calculation
    for (const key in Neural_Network_Train_Data) {
      xA_1 = forward_propogation(Neural_Network_Train_Data[key][0], W_1, B_1, "TanH");
      xA_2 = forward_propogation(xA_1, W_2, B_2, "TanH");
      xA_3 = forward_propogation(xA_2, W_3, B_3, "TanH");
      softmax_xA_3 = softmax(xA_3)
      softmax_xA_3[Neural_Network_Train_Data[key][1]] = (softmax_xA_3[Neural_Network_Train_Data[key][1]]) - 1
      dZ3.push(softmax_xA_3)
    }
    console.log(dZ3)
    
    let xdZ3_sum_row_wise = [];
    for (let g = 0; g < train_data_length; g++) {
      const sum = dZ3[g].reduce((accumulator, currentValue) => {return accumulator + currentValue;}, 0);
      xdZ3_sum_row_wise.push(sum);
    }
    

    let avg_xdZ3_row_wise = [];
    for (let l = 0; l < train_data_length; l++) {
      avg_xdZ3_row_wise.push((xdZ3_sum_row_wise[l] ) / train_data_length);
    }
    console.log(avg_xdZ3_row_wise)

    // We have to transpose then multiply
    // for (let h = 0; h < ; h++) {
      
      
    // }
      

    
  }


  back_propogation();


  function update_parameters() {
    W_1 = W_1 - alpha * dW1;
    W_2 = W_2 - alpha * dW2;
    W_3 = W_3 - alpha * dW3;
    B_1 = B_1 - alpha * dB1;
    B_2 = B_2 - alpha * dB2;
    B_3 = B_3 - alpha * dB3;
  }
  // update_parameters();
}

function neural_network_main() {
  button.forEach((button) => {
    if (button.style.background != "black") {
      A_0.push(0);
    } else {
      A_0.push(1);
    }
  });

  A_1 = forward_propogation(A_0, W_1, B_1, "TanH");
  A_2 = forward_propogation(A_1, W_2, B_2, "TanH");
  A_3 = forward_propogation(A_2, W_3, B_3, "TanH");

  console.log(W_1);
  console.log(A_1);
  console.log(A_2);
  console.log(A_3);
  console.log(softmax(A_3));

  let softmax_output = softmax(A_3);
  for (let j = 0; j < softmax_output.length; j++) {
    if (softmax_output[j] == Math.max.apply(null, softmax_output)) {
      output_text.innerHTML = "The output is " + j;
    }
  }

  // document.write(A_0);
}
// setInterval(()=>{
//   neural_network_main();
//   A_0 = [];
//   A_1 = [];
//   A_2 = [];
//   A_3 = [];
// },10)