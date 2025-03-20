$(document).ready(function() {
    displayCheckoutDetails();

    $("#payment-form").submit(function(event) {
        event.preventDefault();
        window.location.href = "success.html";
    });
});

function displayCheckoutDetails() {
    var cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    var checkoutDetailsContainer = $("#checkout-details");

    if (cart.length === 0) {
        checkoutDetailsContainer.html("<p>Your cart is empty.</p>");
        return;
    }

    var total = 0;
    var checkoutHTML = "<ul>";
    cart.forEach(function(item) {
        checkoutHTML += `<li>${item.product} - Php ${item.price.toLocaleString('en-US', { maximumFractionDigits: 2 })} (Quantity: ${item.quantity})</li>`;
        total += item.price * item.quantity;
    });
    checkoutHTML += `</ul><p>Total: Php ${total.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>`;

    checkoutDetailsContainer.html(checkoutHTML);
}