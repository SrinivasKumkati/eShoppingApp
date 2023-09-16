var generateStarRating = (elementReference, rating) => {
    var isHalfStar;
    var totalFullStars = parseInt(rating);
    isHalfStar = (rating % 1 == 0) ? false : true;

    console.log(isHalfStar)

    var totalHalfStars = isHalfStar ? 1 : 0;
    
    var totalZeroStars = 5 - (totalFullStars + totalHalfStars);


    var divParentTag = document.createElement("div");
    divParentTag.setAttribute("class", 'ratingContainer');
    for (var i = 1; i <= totalFullStars; i++) {
        var divTag = document.createElement("div");
        divTag.setAttribute("class", 'fullStar');
        divParentTag.append(divTag);
    }
    //half star
    if (isHalfStar) {
        var divTag = document.createElement("div");
        divTag.setAttribute("class", 'halfStar');
        divParentTag.append(divTag);
    }
    // zero star
    for (var i = 1; i <= totalZeroStars; i++) {
        var divTag = document.createElement("div");
        divTag.setAttribute("class", 'zeroStar');
        divParentTag.append(divTag);
    }
    document.querySelector(elementReference).append(divParentTag)


    console.log(divParentTag);
}

