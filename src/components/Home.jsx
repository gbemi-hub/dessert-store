import "./Home.css"
import basket from "./icon-add-to-cart.svg"
import Empty from "./illustration-empty-cart.svg"
import Cancel from "./icon-remove-item.svg"
import Data from "./data.json"

let count = 0;
function Home() {
  function Addtocart(e) {
   
  count++;
  document.querySelector("#counts").innerHTML = "Your Cart(" + count + ")";

  const productName = e.currentTarget.getAttribute("product-name");
  const productPrice = e.currentTarget.getAttribute("product-price");
   const emptyCart = document.querySelector("#cart-checkout article");
  if (emptyCart) {
    emptyCart.style.display = "none";
  }

 
  const orderList = document.createElement("div");
  orderList.className = "order-list";

  const orderName = document.createElement("div");

  const par = document.createElement("p");
  par.textContent = productName;

  const quality = document.createElement("span");
  quality.className = "quality";
  quality.textContent = "1"; 

  const price = document.createElement("span");
  price.textContent = "$" + productPrice;
  price.className = "price";

  const quatity = document.createElement("label");
  quatity.textContent = "$" + productPrice;
  quatity.className = "quatity";

  const ima = document.createElement("img");
  ima.src = Cancel;

 
  ima.onclick = function () {
    orderList.remove();
    const addBtn = document.querySelector('button[product-name="' + productName + '"]');
    if (addBtn) addBtn.style.display = "flex";
    minusBtn.style.display = "none"
    qtyNumber.style.display = "none"
    plusBtn.style.display = "none"

   
    const currentQtyInCheckout = parseInt(quality.textContent || "1", 10);
    count = count - currentQtyInCheckout;
    if (count < 0) count = 0;
    document.querySelector("#counts").innerHTML = "Your Cart(" + count + ")";
      if (count == 0){
         emptyCart.style.display = "block";
      }

    

  
  };

  orderName.append(par, quality, price, quatity);
  orderList.append(orderName, ima);

  const cartCheckout = document.getElementById("cart-checkout");
  cartCheckout.appendChild(orderList);

 
  const addBtn = e.currentTarget; 
  addBtn.style.display = "none";

  const qtyBox = document.createElement("div");
  qtyBox.className = "qty-box";

  const minusBtn = document.createElement("button");
  minusBtn.textContent = "-";
  minusBtn.className = "qty-btn";

  const qtyNumber = document.createElement("span");
  qtyNumber.textContent = "1";
  qtyNumber.className = "qty-number";

  const plusBtn = document.createElement("button");
  plusBtn.textContent = "+";
  plusBtn.className = "qty-btn";

  qtyBox.append(minusBtn, qtyNumber, plusBtn);


  addBtn.parentNode.insertBefore(qtyBox, addBtn);

 
  function updateCheckoutQty(newQty) {
   
    const allOrders = document.querySelectorAll(".order-list");
    allOrders.forEach((order) => {
      const orderP = order.querySelector("p");
      if (!orderP) return;
      const orderNameText = orderP.textContent;
      if (orderNameText === productName) {
        const checkoutQty = order.querySelector(".quality");
        if (checkoutQty) checkoutQty.textContent = String(newQty);
       
        const priceLabel = order.querySelector(".quatity");
        if (priceLabel) {
          const numericprice = parseFloat(productPrice);
          const total = numericprice * newQty;
          priceLabel.textContent = "$"+ total;
        }
      }
    });
  }


  plusBtn.onclick = function () {
    let current = parseInt(qtyNumber.textContent || "0", 10);
    current = current + 1;
    qtyNumber.textContent = String(current);

 
    updateCheckoutQty(current);

    count++;
    document.querySelector("#counts").innerHTML = "Your Cart(" + count + ")";
  };


  minusBtn.onclick = function () {
    let current = parseInt(qtyNumber.textContent || "0", 10);

    if (current > 1) {
    
      current = current - 1;
      qtyNumber.textContent = String(current);

 
      updateCheckoutQty(current);

   
      count--;
      if (count < 0) count = 0;
      document.querySelector("#counts").innerHTML = "Your Cart(" + count + ")";
    } else {
     
 
      if (qtyBox && qtyBox.parentNode) qtyBox.parentNode.removeChild(qtyBox);


      if (addBtn) addBtn.style.display = "flex";


      const allOrders = document.querySelectorAll(".order-list");
      allOrders.forEach((order) => {
        const orderP = order.querySelector("p");
        if (!orderP) return;
        if (orderP.textContent === productName) {
          order.remove();
        }
      });

    
      count--;
      if (count < 0) count = 0;
      document.querySelector("#counts").innerHTML = "Your Cart(" + count + ")";
    }
    if (count == 0){
         emptyCart.style.display = "block";
      }

  };
}

 return(
        <div id="container">
           <section id="cart-list">
            <h2>Desserts</h2>
           <div id="cart-div">
            {Data.map(product=>(<div key={product.id}>
             <img src={product.image.desktop} alt={product.image}  className="img"/>  
             <nav>
               <button onClick={Addtocart} product-name={product.name} product-price = {product.price} id="none"> <img src={basket} alt={basket}/>Add to cart</button>
               <p>{product.name}</p>
               <h4>{product.category}</h4>
               <label>${product.price}</label>
             </nav>
               
               
              </div> 
               ))}
                
           
            
          
            </div>
           </section>
           <section id="cart-checkout">
           
            <div className="order">
             <h3 id="counts"> Your Cart(0)</h3>
             <article id="article">
            <img src={Empty} alt={Empty}  className="empty"/>
            <p>Your added items will appear here</p>
            
          
            </article>
            <div id="total-price">

            </div>
            </div>

           
           </section>
            
        </div>
    )
}

 

   

export default Home