let second_box = document.getElementById("second");
let output_text = document.getElementById("output_text");
let loadbar = document.getElementById("loadbarmain")
let loadbarcontain = document.getElementById("loadbar")
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
  }
});
body.addEventListener("mouseup", (event) => {
  if (event.button === 0) {
    click = false;
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
// alpha is the learning rate
let alpha = 0.1;

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
let dB3 = [];
let dZ2 = null;
let dW2 = [];
let dB2 = [];
let dZ1 = null;
let dW1 = [];
let dB1 = [];
let train_data_length = Object.keys(Neural_Network_Train_Data).length;
let m = train_data_length
function train_neural_network() {

  function back_propogation() {
    let xA_0;
    let xA_1;
    let xA_2;
    let xA_3;
    let total_xA_0 = [];
    let total_xA_1 = [];
    let total_xA_2 = [];
    let softmax_xA_3;


    // this is used for dZ3 calculation
    for (const key in Neural_Network_Train_Data) {
      xA_0 = Neural_Network_Train_Data[key][0]
      total_xA_0.push(xA_0)
      xA_1 = forward_propogation(Neural_Network_Train_Data[key][0], W_1, B_1, "TanH");
      total_xA_1.push(xA_1)
      xA_2 = forward_propogation(xA_1, W_2, B_2, "TanH");
      total_xA_2.push(xA_2)
      xA_3 = forward_propogation(xA_2, W_3, B_3, "TanH");
      softmax_xA_3 = softmax(xA_3)
      softmax_xA_3[Neural_Network_Train_Data[key][1]] = (softmax_xA_3[Neural_Network_Train_Data[key][1]]) - 1
      dZ3.push(softmax_xA_3)
    }

    // this is used of dW3 calculation
    let multiply_dZ3_xA_2T;
    multiply_dZ3_xA_2T = matrix_multipilcation_with_transpose(dZ3,transposeMatrix(total_xA_2))
    
    for (let r = 0; r < multiply_dZ3_xA_2T.length; r++) {
      let divide_by_r = [];
      for (let l = 0; l < multiply_dZ3_xA_2T[r].length; l++) {
        divide_by_r.push((multiply_dZ3_xA_2T[r][l])/m)
      }
      dW3.push(divide_by_r)
    }
    
    // this is used of dB3 calculation
    let transpose_dZ3 = transposeMatrix(dZ3)
    for (let v = 0; v < transpose_dZ3.length; v++) {
      let sum = 0;
      sum = transpose_dZ3[v].reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
      dB3.push(sum)
    }
    let xxdB3 = dB3.map((num) => num / m);
    dB3 = xxdB3;
    // this is used for dZ2 calculation
    let matrix_of_W_3 = [];
    let g_sum = [];
    for (let g = 0; g <= W_3.length; g++) {
      if (g_sum.length === A_2_length) {
        matrix_of_W_3.push(g_sum)
        g_sum = []; 
      }
      g_sum.push(W_3[g])
    }
    matrix_of_W_3 = transposeMatrix(matrix_of_W_3);
    let multiply_of_W3T_dZ3 = matrix_multipilcation_with_transpose(transposeMatrix(matrix_of_W_3),dZ3)
    let A_2_derivative = derivative_tanH(total_xA_2)
    dZ2 = element_wise_multiplication(multiply_of_W3T_dZ3, A_2_derivative)
    
    // this is used for dW2 calculation
    let multiply_dZ2_xA_2T;
    multiply_dZ2_xA_2T = matrix_multipilcation_with_transpose(dZ2,transposeMatrix(total_xA_1))
    for (let r = 0; r < multiply_dZ2_xA_2T.length; r++) {
      let divide_by_r = [];
      for (let l = 0; l < multiply_dZ2_xA_2T[r].length; l++) {
        divide_by_r.push((multiply_dZ2_xA_2T[r][l])/m)
      }
      dW2.push(divide_by_r)
    }

    // this is used for dB2 calculation
    let transpose_dZ2 = transposeMatrix(dZ2)
    for (let v = 0; v < transpose_dZ2.length; v++) {
      let sum = 0;
      sum = transpose_dZ2[v].reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
      dB2.push(sum)
    }
    let xxdB2 = dB2.map((num) => num / m);
    dB2 = xxdB2;
    // this is used for dZ1 calculation
    let matrix_of_W_2 = []
    let q_sum = [];
    for (let g = 0; g <= W_2.length; g++) {
      if (q_sum.length === A_1_length) {
        matrix_of_W_2.push(q_sum)
        q_sum = []; 
      }
      q_sum.push(W_2[g])
    }
    matrix_of_W_2 = transposeMatrix(matrix_of_W_2);
    let multiply_of_W2T_dZ2 = matrix_multipilcation_with_transpose(transposeMatrix(matrix_of_W_2),dZ2)
    let A_1_derivative = derivative_tanH(total_xA_1)
    dZ1 = element_wise_multiplication(multiply_of_W2T_dZ2, A_1_derivative)

    // this is used for dW1 calculation
    let multiply_dZ1_xA_1T;
    multiply_dZ1_xA_1T = matrix_multipilcation_with_transpose(dZ1,transposeMatrix(total_xA_0))
    for (let r = 0; r < multiply_dZ1_xA_1T.length; r++) {
      let divide_by_r = [];
      for (let l = 0; l < multiply_dZ1_xA_1T[r].length; l++) {
        divide_by_r.push((multiply_dZ1_xA_1T[r][l])/m)
      }
      dW1.push(divide_by_r)
    }

    // this is used for dB1 calculation
    let transpose_dZ1 = transposeMatrix(dZ1)
    for (let v = 0; v < transpose_dZ1.length; v++) {
      let sum = 0;
      sum = transpose_dZ1[v].reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
      dB1.push(sum)
    }
    let xxdB1 = dB1.map((num) => num / m);
    dB1 = xxdB1;
    
    console.log(dW3)
    console.log(dB3)
    
    console.log(dW2)
    console.log(dB2)
    
    console.log(dW1)
    console.log(dB1)


    //last end of back prop

    
  }


  back_propogation();


  function update_parameters() {
    W_1 = W_update(W_1, alpha, dW1)
    W_2 = W_update(W_2, alpha, dW2);
    W_3 = W_update(W_3, alpha, dW3);
    B_1 = B_update(B_1, alpha, dB1);
    B_2 = B_update(B_2, alpha, dB2);
    B_3 = B_update(B_3, alpha, dB3);
  }
  update_parameters();
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
  
  A_0 = []
  A_1 = []
  A_2 = []
  A_3 = []
  button.forEach((button) => { 
    button.style.background = `white`;
  });
}
let training_length = 20;
let loadpercent = 0;
loadbar.style.width = "calc(90%/" + training_length + "*" +  loadpercent + ")"
function train_button() {
  loadbarcontain.style.display = "flex"
  let train_interval = setInterval(()=>{
    train_neural_network()
    
    dZ3 = [];
  dW3 = [];
  dB3 = [];
  dZ2 = null;
  dW2 = [];
  dB2 = [];
  dZ1 = null;
  dW1 = [];
  dB1 = [];
  console.log("working")
  loadpercent++;
  loadbar.style.width = "calc(90%/" + training_length + "*" +  loadpercent + ")"
  if (training_length == loadpercent) {
    clearInterval(train_interval)
    loadbarcontain.style.display = "none"
  }
},30000)
}