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
        case "Zenaida Tote":
            return "Assets/bag1.jpg";
        case "Yvonne Handle Bag":
            return "Assets/bag2.jpg";
        case "Camille Hobo Bag":
            return "Assets/bag3.jpg";
        case "Ann Tote Bag":
            return "Assets/bag4.jpg";
        case "Ava Messenger Bag":
            return "Assets/bag5.jpg";
        case "Lily Crossbody":
            return "Assets/bag6.jpg";
        case "Serena Tote Bag":
            return "Assets/bag7.jpg";
        case "Natalie Handle Bag":
            return "Assets/bag8.jpg";
        case "Margaux Hobo Bag":
            return "Assets/bag9.jpg";
        case "Anastasia Shoulder Bag":
            return "Assets/bag10.jpg";
        case "Colette Crossbody":
            return "Assets/bag11.jpg";
        case "Genevieve Crossbody":
            return "Assets/bag12.jpg";
        default:
            return ""; 
    }
}
