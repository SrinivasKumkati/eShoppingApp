
var loadSelectedPage = (type) => {
    let templateUrl;
    switch(type) {
        case 'login':
            templateUrl = 'templates/login.htm';
            break;
        case 'frgtpwd':
            templateUrl = 'templates/frgotPwd.htm';
            break;
        case 'newsignup':
            templateUrl = 'templates/newSignup.htm';
            break;
        case 'productPage':
            templateUrl = 'templates/productDetails.htm';
            break;
        case 'adminPage':
            templateUrl = 'templates/adminPage.htm';
            break;
    }    
    loadTemplateData(templateUrl, type)

}

var loadTemplateData = (tempalteUrl, type) => {
    axios.get(tempalteUrl)
        .then(function (response) {
            $("main").html(response.data);
            if (type == 'productPage') {
                getProductDetails();
            } else if (type == 'login') {
                // prefill the id and pwd details 
                if (localStorage.getItem("userCredentials") != null) {
                    var userDetails = JSON.parse(localStorage.getItem("userCredentials"));
                    $("#accountId").val(userDetails.accountId);
                    $("#accountPwd").val(userDetails.actPwd);
                    $('#rememberCredentails').prop('checked', true);
                }
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

axios.get("/check/isLoggedin").then((response) => {
    
    if (response.data && response.data.isUserLoggedIn) {
        loadSelectedPage('productPage');
    } else {
        loadSelectedPage('login');
    }
});



var signupNewUser = () => {
    var userDetails = {};
    userDetails.accountId = $("#accountId").val();
    userDetails.actPwd = $("#accountPwd").val();
    userDetails.mailid = $("#actMailId").val();


    axios.post("/new/user/signup", userDetails).then((response) => {
        if (response.data.msg == 'Inserted') {
            $(".successSignup").show();
        }
    }).catch((error) => {
        console.log(error);
    })
    
}

var logoutUser = () => {
    axios.get("/logoutuser").then(() => {
        loadSelectedPage('login');
    })
}