

var validateUserCredentials = () => {
    var accountDetails = {};
    accountDetails.accountId = $("#accountId").val();
    accountDetails.actPwd =  $("#accountPwd").val()

    // loadSelectedPage('productPage');

   /* axios({
        method: 'GET',
        url: 'http://localhost:3000/userLoginData/validation',
        params: accountDetails
      }).then( (response) => {
        console.log(response);
    }).catch(() => {

    })*/
    var isChecked = document.querySelector("#rememberCredentails").checked;
    if (isChecked) {
      localStorage.setItem("userCredentials", JSON.stringify(accountDetails));
    } else {
      localStorage.removeItem("userCredentials");
    }

    axios({
        method: 'POST',
        url: 'http://localhost:3000/userLoginData/validation',
        data: accountDetails
      }).then( (response) => {
        console.log(response);
        if (response.data.msg == 'Valid') {
          if (response.data.isAdmin) {
            loadSelectedPage('adminPage');
          } else {
            loadSelectedPage('productPage');
          }
          
        } else {
          $(".invalidCredentials").show();
        }
    }).catch(() => {

    })
}