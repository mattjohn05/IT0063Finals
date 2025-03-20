$(document).ready(function() {
    $(".add-to-cart").on("click", function() {
        var product = $(this).data("product");
        var price = $(this).data("price");
        addToCart(product, price);
        window.location.href = "cart.html"; 
    });

    $(document).on("click", ".remove-item", function() {
        var product = $(this).data("product");
        removeItem(product);
    });

    displayCart();

    $("#clear-cart").on("click", function() {
        clearCart();
    });

    $("#checkout-button").on("click", function() {
        window.location.href = "checkout.html"; 
    });
});

function addToCart(product, price) {
    var cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    var found = false;

    cart.forEach(function(item) {
        if (item.product === product) {
            item.quantity++;
            found = true;
        }
    });

    if (!found) {
        cart.push({
            product: product,
            price: price,
            quantity: 1
        });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function removeItem(product) {
    var cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    cart = cart.filter(function(item) {
        return item.product !== product;
    });

    sessionStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    var cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    var $cartItems = $("#cart-items");
    var total = 0;

    $cartItems.empty();

    cart.forEach(function(item) {
        var $row = $("<tr>");
        $row.append($("<td>").html("<img src='" + getProductImage(item.product) + "' alt='Product Image' style='width: 50px;'>"));
        $row.append($("<td>").text(item.product));
        $row.append($("<td>").text(item.quantity));
        $row.append($("<td>").text("Php " + item.price.toLocaleString('en-US', { maximumFractionDigits: 2 })));
        $row.append($("<td>").text("Php " + (item.price * item.quantity).toLocaleString('en-US', { maximumFractionDigits: 2 })));
        $row.append($("<td>").html("<a href='#' class='btn btn-danger btn-sm remove-item' data-product='" + item.product + "'>Remove</a>"));
        $cartItems.append($row);

        total += item.price * item.quantity;
    });

    $("#stotal").text("Php " + total.toLocaleString('en-US', { maximumFractionDigits: 2 }));
}

function clearCart() {
    sessionStorage.removeItem("cart");
    displayCart();
}

function getProductImage(product) {
    switch (product) {
        case "DADA 01":
            return "https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_DADA-01-2_2.jpg";
        case "FEAR X G13":
            return "https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_FEAR_X_G13_2.jpg";
        case "EX S01":
            return "https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_EX_S01_2.jpg";
        case "ATEMPO 01 2":
            return "https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_ATEMPO_01_2.jpg";
        case "BARETTE 02":
            return "https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/b/a/barrette-02_2_1_1.jpg";
        case "DONUTBUN Bl5":
            return "https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/d/o/donutbun-bl5_2_1_1.jpg";
        case "TOTE 01":
            return "https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_TOTE_01_2.jpg";
        case "MONTA 01":
            return "https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_MONTA_01_2.jpg";
        case "AVON W2":
            return "https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_AVON_W2_2.jpg";
        case "MOLTA BRC11":
            return "https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_MOLTA-BRC11-2.jpg";
        case "VOID 01":
            return "https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_VOID-01-2_2.jpg";
        case "TTA 01":
            return "https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_TTA_01_2.jpg";
        default:
            return ""; 
    }
}