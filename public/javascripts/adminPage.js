var productDetails = {};
var readProductDetails  = () => {
    
    productDetails.id = Math.round(Math.random() * 1000)
    productDetails.title = $("#title").val();
    productDetails.price = $("#price").val();
    productDetails.description = $("#description").val();
    productDetails.category = $("#category").val();
    productDetails.rating = {rate: $("#rating").val(), count: 0}

    console.log(productDetails)
    sendDataToserver(productDetails);
}


var sendDataToserver = (pData) => {
    axios.post("/add/productData", pData).then((response) => {
           console.log(response);
           if(response.data.msg == 'added') {
                $("#statusMsg").text("Added details to db");
           }
    })
}

var uploadProductImage = () => {
    console.log($("input[name=prodImage]"));
    
    let uploadfile = $("input[name=prodImage]")[0].files[0] // file from input
    
    let formData = new FormData();
    formData.append("prodImage", uploadfile);

    var imageUploadReq = $.ajax({
        url: '/upload/resource',
        type: 'POST',
        data: formData,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        dataType: 'JSON',
        success: (response) => {
             console.log("Response");
             console.log(response);
             productDetails.image = response.file_path;
        }
    });


}