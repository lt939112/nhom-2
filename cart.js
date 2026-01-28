const list = document.getElementById("cartList");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  if (!list) return;

  if (cart.length === 0) {
    list.innerHTML = `
            <div class="empty-cart">
                <p>Giỏ hàng của bạn đang trống.</p>
                <button onclick="window.location.href='index.html'" class="checkout-btn">Tiếp tục mua sắm</button>
            </div>`;
    return;
  }

  let total = 0;
  list.innerHTML = cart
    .map((item, index) => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;
      return `
        <li class="cart-item-row">
            <div class="cart-item-left">
                <img src="${item.image}" class="cart-img">
                <div class="cart-info">
                    <strong class="cart-name">${item.name}</strong> 
                    <div class="item-total-price">${itemTotal.toLocaleString()}đ</div>
                </div>
            </div>
            <div class="cart-item-right">
                <div class="qty-wrapper">
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                    <span class="qty-number">${item.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                </div>
                <button class="remove-btn-premium" onclick="removeItem(${index})" title="Xóa sản phẩm">
                    ✕
                </button>
            </div>
        </li>`;
    })
    .join("");

  list.innerHTML += `
        <div class="cart-footer">
            <div class="total-section">
                <span class="total-label">TỔNG CỘNG:</span>
                <span class="total-amount">${total.toLocaleString()}đ</span>
            </div>
            <div class="cart-action-buttons">
                <button class="clear-all-btn" onclick="clearAllCart()">Xóa tất cả</button>
                <button class="checkout-btn" onclick="handleCheckout()">Thanh toán ngay</button>
            </div>
        </div>`;
}

// Hàm thay đổi số lượng
window.changeQty = (index, delta) => {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    removeItem(index);
  } else {
    saveAndReload();
  }
};

// Hàm xóa 1 món
window.removeItem = (index) => {
  if (confirm("Xóa đôi này khỏi giỏ hàng?")) {
    cart.splice(index, 1);
    saveAndReload();
  }
};

// Hàm xóa tất cả
window.clearAllCart = () => {
  if (confirm("Bạn muốn dọn sạch giỏ hàng?")) {
    cart = [];
    saveAndReload();
  }
};

// Hàm THANH TOÁN: Xóa sạch hàng và ra trang chính
window.handleCheckout = () => {
  if (confirm("Xác nhận thanh toán đơn hàng?")) {
    alert("Thanh toán thành công! Giỏ hàng sẽ được dọn dẹp.");
    cart = []; // Xóa mảng
    localStorage.removeItem("cart"); // Xóa bộ nhớ
    window.location.href = "index.html"; // Về trang chủ
  }
};

function saveAndReload() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();