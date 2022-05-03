const cart_items = document.querySelector('#cart .cart-items');


const parentNode = document.getElementById('music-content');

const parentContainer=document.getElementById('EcommerceContainer')
parentContainer.addEventListener('click',(e)=>{

})
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/products').then((data)=>{
        if(data.request.status===200){
            const products=data.data.products
            const parentSection = document.getElementById('Products')
            products.forEach(product => {
                const productHtml=`
                <div>
                    <h1>${product.title}</h1>
                    <img src=${product.imageUrl}></img>
                    <button onClick="addToCart(${product.id})" type='button'>Add To Cart</button>
                </div>`
                parentSection.innerHTML += productHtml
                
            });
        }
    })
})
function addToCart(productId){
    axios.post('http://localhost:3000/cart',{productId:productId}).then((response)=>{
        if(response.status===200){
            notifyUsers(response.data.message)
        }else{
            throw new Error();
        }

    }).catch(err=>{
        console.log(err)
        notifyUsers(err.data.message)
    })
}
function notifyUsers(message){
    const container = document.getElementById('container');
    const notification = document.createElement('div');
    //notification.style.backgroundColor = iserror ? 'red' : 'green';
    notification.classList.add('notification');
    notification.innerHTML = `<h4>${message}<h4>`;
    container.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },2500)
}

