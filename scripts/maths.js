function TanH(z) {
  let tanhvalue = (Math.exp(z) - Math.exp(-z)) / (Math.exp(z) + Math.exp(-z));
  if (isNaN(tanhvalue) && z > 0) {
    return 1;
  } else if (isNaN(tanhvalue) && z < 0) {
    return -1;
  } else {
    return tanhvalue;
  }
}

function log(z) {
  return Math.log(z);
}

function random(decimals) {
  let random_number = parseFloat((Math.random()).toFixed(decimals));
  return random_number;
}

function forward_propogation(M1, M2, B, Activation_function) {
  // M1 and M2 are going to be in array
  let multiplication_data = 0;
  let data_array = [];
  let shape_first_matrix_row = M1.length;
  let k = 0;
  let v = 0;
  for (let i = 0; i < M2.length; i++) {
    multiplication_data = multiplication_data + M1[k] * M2[i];
    
    k++;
    if (k == shape_first_matrix_row) {
      k = 0;
      if (Activation_function == "TanH") {
        data_array.push(TanH(multiplication_data + B[v]));
        v++;
      }
      multiplication_data = 0;
    }
  }
  return data_array;
}

function softmax(z) {
  let data = [];
  let expsum = 0;
  for (let k = 0; k < z.length; k++) {
    expsum += Math.exp(z[k])
  }
  for (let i = 0; i < z.length; i++) {
    data.push(Math.exp(z[i]) / expsum);
  }
  return data;
}


function matrix_multipilcation_with_transpose(M1, M2) {
  let output = [];
  let rows1 = M1.length
  let rows2 = M2.length
  let colum1 = M1[0].length
  let colum2 = M2[0].length
  if (rows1 !== colum2) {
    console.log("Error: The number of columns in Matrix 1 must match the number of rows in Matrix 2.");
    return output;
  }
  for (let a = 0; a < colum1; a++) {
    output[a] = [];
    for (let b = 0; b < rows2; b++) {
      let sum = 0
      for (let c = 0; c < colum1; c++) {
        sum += M1[c][a] * M2[b][c]
      }
      output[a][b] = sum
    }
  }
  return output;
}

function transposeMatrix(matrix) {
  const transposedMatrix = matrix[0].map((_, colIndex) =>
    matrix.map((row) => row[colIndex])
  );

  return transposedMatrix;
}
