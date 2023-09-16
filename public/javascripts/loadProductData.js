var productDataTemplate;

var productDataList = [];
var getProductDetails = (categoryType) => {
    var dataApi = '/get/productDetails';
    var data = {};
    if (categoryType) {
        data.categoryType = categoryType;
    }
    axios({
        method: 'GET',
        url: dataApi,
        params: {
            data: data
        }
    }).then((response) => {
        productDataList = response.data;
        showProductsData()

    }).catch((error) => {

    })
}

var showProductsData = () => {
    $(".productDetailsContainer").html('');
    for (var i = 0 ; i < productDataList.length; i++) {
        var pTemplate = productDataTemplate(productDataList[i]);
        $(".productDetailsContainer").append(pTemplate);
        var ratingContainrId = '#rating_' + productDataList[i].id;
        generateStarRating(ratingContainrId, productDataList[i].rating.rate);
    }
}

var getProductTemplate = () => {
    axios({
        url: 'templates/singleProductData.htm',
        method: 'GET',
    }).then((response) => {
        productDataTemplate = Handlebars.compile(response.data);
        
    }).catch(() => {

    })
}

var addProductToCart = (productId) => {
    // alert(productId)
}

var viewSingleProductData = (productId) => {
    // alert(productId)
}

getProductTemplate();

var getCategoryProducts = (categoryType) => {
    
    getProductDetails(categoryType);
}
