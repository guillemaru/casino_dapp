Moralis.initialize("APPLICATION_ID"); // Application id from moralis.io
Moralis.serverURL = "SERVER_URL"; //Server url from moralis.io

async function login() {
    try {
        user = await Moralis.User.current();
        if(!user) {
            user = await Moralis.Web3.authenticate();
        } 
        console.log(user);
        alert("User logged in")
        document.getElementById("login_button").style.display= "none";
        document.getElementById("game").style.display= "block";
    } catch (error) {
        console.log(error);
    }
}

async function flip(side) {
    let amount = document.getElementById("amount").value; 
    window.web3 = await Moralis.Web3.enable();
    let contractInstance = new web3.eth.Contract(window.abi,"0x9624c187a827C8C3b1A2186da8E9c88c98426eC5")
    contractInstance.methods.flip(side == "heads" ? 0 : 1).send({value: amount, from: ethereum.selectedAddress})
    .on('receipt',function(receipt){
        console.log(receipt);
        if(receipt.events.bet.returnValues.win){
            alert("you won");
        }
        else {
            alert("you lost :( try again");
        }
    })
}

document.getElementById("login_button").onclick = login;
document.getElementById("heads_button").onclick = function(){flip("heads")};
document.getElementById("tails_button").onclick = function(){flip("tails")};