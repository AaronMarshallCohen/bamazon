var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  console.log("Welcome to Bamazon.");
  start();
});

// function which prompts the user for what action they should take
function start() {
  // display all items
  connection.query("SELECT * FROM products", function (err, res) {
    console.table(res);
    inquirer
      .prompt([
        {
          name: "whichID",
          type: "input",
          message: "What is the ID of the item you would like?",
          validate: function (value) {
            if (!isNaN(value)) {
              return true;
            }
            return false;
          }
        },
        {
          name: "chooseQuantity",
          type: "input",
          message: "How many would you like to purchase?",
          validate: function (value) {
            if (!isNaN(value)) {
              return true;
            }
            return false;
          }
        }

      ]
      )
      .then(function (answer) {
        // based on their answer, either call the bid or the post functions
         console.log(answer);
        var chosenQuantity = parseInt(answer.chooseQuantity);
        var updatedInventory;
        var currentStock;
        connection.query(`SELECT * FROM products WHERE id = ?`, answer.whichID, function(err,result){
          console.log(result)
          currentStock = result[0].stock_quantity
              // check if there is enough inventory for the item
            if (currentStock >= chosenQuantity) {
              updatedInventory = parseInt(currentStock - chosenQuantity);
              console.log(`There are ${updatedInventory} items left in stock`);
              connection.query(`UPDATE products SET stock_quantity = ${updatedInventory} WHERE id = ${answer.whichID}`, function(err, res1){
              })
              setTimeout(start, 2000)
            } else {
              console.log("not enough stock, please try again.");
              start();
            }
        })
        // for (var i = 0; i < res.length; i++) {
        //   if (res[i].id == choiceID) {
        //     console.log(res[i]);
        //     currentStock = res[i].stock_quantity;
        //     console.log("current stock", currentStock);
        //     console.log("chosen quantity", chosenQuantity);
        

        //   } else {
        //     console.log("invalid ID, please try again.");
        //     start();

          })
      })
    } 
  


// if (validID && validQuantity){

//   }
// }
//       });
//   })


// }
function makePurchase(stockQuantity, chosenQuantity){
  
}

// , write showTotal function - if query is successful, show total



 // determine if there are enough products available

