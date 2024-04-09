document.addEventListener( 'DOMContentLoaded', () => {
    // шукаємо кнопку реєстрації, якщо знаходимо - додаємо обробник
    const signupButton = document.getElementById("signup-button");
    if(signupButton) { signupButton.onclick = signupButtonClick; }
    // шукаємо кнопку додавання товару, якщо знаходимо - додаємо обробник
    const addProductButton = document.getElementById("add-product-button");
    if(addProductButton) { addProductButton.onclick = addProductButtonClick; }
    // шукаємо кнопку автентифікації, якщо знаходимо - додаємо обробник
    const authButton = document.getElementById("auth-button");
    if(authButton) { authButton.onclick = authButtonClick; }
    // налаштування модальних вікон
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {
        "opacity": 	    	0.5, 	// Opacity of the modal overlay.
        "inDuration": 		250, 	// Transition in duration in milliseconds.
        "outDuration": 		250, 	// Transition out duration in milliseconds.
        "onOpenStart": 		null,	// Callback function called before modal is opened.
        "onOpenEnd": 		null,	// Callback function called after modal is opened.
        "onCloseStart":		null,	// Callback function called before modal is closed.
        "onCloseEnd": 		null,	// Callback function called after modal is closed.
        "preventScrolling": true,	// Prevent page from scrolling while modal is open.
        "dismissible": 		true,	// Allow modal to be dismissed by keyboard or overlay click.
        "startingTop": 		'4%',	// Starting top offset
        "endingTop": 		'10%'	// Ending top offset
    });
    checkAuth();
});

function getContext(){
    return window.location.pathname.split('/')[1];
}

function addProductButtonClick(e){
    // шукаємо форму - батьківській елемент кнопки (e.target)
    const productForm = e.target.closest('form') ;
    if( ! productForm ) {
        throw "Product form not found" ;
    }
    // всередині форми productForm знаходимо елементи
    const nameInput = productForm.querySelector('input[name="product-name"]');
    if( ! nameInput ) { throw "nameInput not found" ; }
    const brandInput = productForm.querySelector('input[name="product-brand"]');
    if( ! brandInput ) { throw "brandInput not found" ; }
    const categoryInput = productForm.querySelector('input[name="product-category"]');
    if( ! categoryInput ) { throw "categoryInput not found" ; }
    const typeInput = productForm.querySelector('input[name="product-type"]');
    if( ! typeInput ) { throw "typeInput not found" ; }
    const descriptionInput = productForm.querySelector('textarea[name="product-description"]');
    if( ! descriptionInput ) { throw "descriptionInput not found" ; }
    const photoInput = productForm.querySelector('input[name="product-photo"]');
    if( ! photoInput ) { throw "photoInput not found" ; }
    const countInput = productForm.querySelector('input[name="product-count"]');
    if( ! countInput ) { throw "photoInput not found" ; }
    const priceInput = productForm.querySelector('input[name="product-price"]');
    if( ! priceInput ) { throw "photoInput not found" ; }
    /// Валідація даних
    let isFormValid = true ;

    if( nameInput.value == "" ) {
        nameInput.classList.remove("valid");
        nameInput.classList.add("invalid");
        isFormValid = false ;
    }
    else {
        nameInput.classList.remove("invalid");
        nameInput.classList.add("valid");
    }

    if( brandInput.value == "" ) {
        brandInput.classList.remove("valid");
        brandInput.classList.add("invalid");
        isFormValid = false ;
    }
    else {
        brandInput.classList.remove("invalid");
        brandInput.classList.add("valid");
    }

    if( categoryInput.value == "" ) {
        categoryInput.classList.remove("valid");
        categoryInput.classList.add("invalid");
        isFormValid = false ;
    }
    else {
        categoryInput.classList.remove("invalid");
        categoryInput.classList.add("valid");
    }

    if( typeInput.value == "" ) {
        typeInput.classList.remove("valid");
        typeInput.classList.add("invalid");
        isFormValid = false ;
    }
    else {
        typeInput.classList.remove("invalid");
        typeInput.classList.add("valid");
    }

    if( photoInput.value == "" ) {
        photoInput.classList.remove("valid");
        photoInput.classList.add("invalid");
        isFormValid = false ;
    }
    else {
        photoInput.classList.remove("invalid");
        photoInput.classList.add("valid");
    }

    if( ! isFormValid ) return ;
    /// кінець валідації

    // формуємо дані для передачі на бекенд
    const formData = new FormData() ;
    formData.append( "product-name", nameInput.value ) ;
    formData.append( "product-brand", brandInput.value ) ;
    formData.append( "product-category", categoryInput.value ) ;
    formData.append( "product-price", priceInput.value ) ;

    if( photoInput.files.length > 0 ) {
        formData.append( "product-photo", photoInput.files[0] ) ;
    }

    // передаємо - формуємо запит
    fetch( window.location.href, { method: 'POST', body: formData } )
        .then( r => r.json() )
        .then( j => {
            console.log(j);
            // if( j.status == 1 ) {  // реєстрація успішна
            //     alert( 'реєстрація успішна' ) ;
            //     window.location = '/' ;  // переходимо на головну сторінку
            // }
            // else {  // помилка реєстрації (повідомлення - у полі message)
            //     alert( j.data.message ) ;
            // }
        } ) ;
}

function authButtonClick(e) {
    const emailInput = document.querySelector('input[name="auth-email"]');
    if( ! emailInput ) { throw "'auth-email' not found" ; }
    const passwordInput = document.querySelector('input[name="auth-password"]');
    if( ! passwordInput ) { throw "'auth-password' not found" ; }

     //console.log( emailInput.value, passwordInput.value ) ;
    fetch(`/${getContext()}/auth?email=${emailInput.value}&password=${passwordInput.value}`, {
        method: 'GET'
    })
        .then( r => r.json() )
        .then( j => {
            if(j.data == null || typeof j.data.token == "undefined"){
                document.getElementById("modal-auth-message").innerText = "Вхід відхилено";

            }
            else{
                localStorage.setItem("auth-token", j.data.token);
                window.location.reload();

            }
        });
}

function checkAuth(){
    //... при завантаженні сторінки перевіряємо наявність даних автентифікації у
    const authToken = localStorage.getItem("auth-token");
    if(authToken){
        //перевіряємо токен на валідність і
        fetch(`/${getContext()}/auth?token=${authToken}`,{
        method: 'POST'
        })
            .then( r => r.json() )
            .then( j => {
                if(j.meta.status == 'success'){
                    //замінити кнопку входу на аватарку користувача
                    document.querySelector('[data-auth ="avatar"]') .innerHTML = `<img title="${j.data.name}" class="nav-avatar" src="/${getContext()}/img/avatar/${j.data.avatar}" />`
                    const product = document.querySelector('[data-auth ="product"]');
                    if(product){
                        fetch(`/${getContext()}/product.jsp`)
                            .then(r => r.text())
                            .then(t => {product.innerHTML = t;
                                document.getElementById("add-product-button")
                                    .addEventListener('click', addProductClick);
                    });
                }}
            } );

    }
}

function addProductClick(e) {
    // Збираємо дані з форми додавання продукту
    const form = e.target.closest('form');
    const name = form.querySelector("#product-name").value.trim();
    const price = Number(form.querySelector("#product-price").value);
    const description = form.querySelector("#product-description").value.trim();
    const fileInput = form.querySelector("#product-img");

    // Формуємо дані для передачі на сервер
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", fileInput.files[0]);
    formData.append("token", localStorage.getItem("auth-token"));
    //
    fetch(`/${getContext()}/shop-api`,{
        method: 'POST',
            body: formData })
        .then(r => r.text())
        .then(console.log);


}


function signupButtonClick(e) {
    // шукаємо форму - батьківській елемент кнопки (e.target)
    const signupForm = e.target.closest('form') ;
    if( ! signupForm ) {
        throw "Signup form not found" ;
    }
    // всередині форми signupForm знаходимо елементи
    const nameInput = signupForm.querySelector('input[name="user-name"]');
    if( ! nameInput ) { throw "nameInput not found" ; }
    const emailInput = signupForm.querySelector('input[name="user-email"]');
    if( ! emailInput ) { throw "emailInput not found" ; }
    const passwordInput = signupForm.querySelector('input[name="user-password"]');
    if( ! passwordInput ) { throw "passwordInput not found" ; }
    const repeatInput = signupForm.querySelector('input[name="user-repeat"]');
    if( ! repeatInput ) { throw "repeatInput not found" ; }
    const avatarInput = signupForm.querySelector('input[name="user-avatar"]');
    if( ! avatarInput ) { throw "avatarInput not found" ; }

    /// Валідація даних
    let isFormValid = true ;

    if( nameInput.value == "" ) {
        nameInput.classList.remove("valid");
        nameInput.classList.add("invalid");
        isFormValid = false ;
    }
    else {
        nameInput.classList.remove("invalid");
        nameInput.classList.add("valid");
    }

    if( ! isFormValid ) return ;
    /// кінець валідації

    // формуємо дані для передачі на бекенд
    const formData = new FormData() ;
    formData.append( "user-name", nameInput.value ) ;
    formData.append( "user-email", emailInput.value ) ;
    formData.append( "user-password", passwordInput.value ) ;
    if( avatarInput.files.length > 0 ) {
        formData.append( "user-avatar", avatarInput.files[0] ) ;
    }

    // передаємо - формуємо запит
    fetch( window.location.href, { method: 'POST', body: formData } )
        .then( r => r.json() )
        .then( j => {
            console.log(j);
            // if( j.status == 1 ) {  // реєстрація успішна
            //     alert( 'реєстрація успішна' ) ;
            //     window.location = '/' ;  // переходимо на головну сторінку
            // }
            // else {  // помилка реєстрації (повідомлення - у полі message)
            //     alert( j.data.message ) ;
            // }
        } ) ;
}
