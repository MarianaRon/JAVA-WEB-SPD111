

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<h1>Додайте новий товар</h1>
<div class="row">
    <form class="col s12" method="post">
        <div class="row">
            <div class="input-field col s6">
                <i class="material-icons prefix">add_shopping_cart</i>
                <input id="icon_product" type="text" name="product-name">
                <label for="icon_product">Товар</label>
                <span class="helper-text"
                      data-error="Це необхідне поле"
                      data-success="Правильно">Назва товару</span>
            </div>
            <div class="input-field col s6">
                <i class="material-icons prefix">language</i>
                <input  id="icon_brand" type="text"  name="product-brand">
                <label for="icon_brand">Виробник</label>
                <span class="helper-text"
                <%--                      //data-error="Це необхідне поле"--%>
                      data-success="Правильно">Виробник</span>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s6">
                <i class="material-icons prefix">category</i>
                <input id="icon_category" type="text" name="product-category">
                <label for="icon_category">Категорія</label>
                <span class="helper-text"
                      data-error="Це необхідне поле"
                      data-success="Правильно">Категорія товару</span>
            </div>
            <div class="input-field col s4">
                <i class="material-icons prefix">payments</i>
                <input  id="icon_price" type="number"  name="product-price">
                <label for="icon_price">Ціна</label>
                <span class="helper-text"
                      data-error="Це необхідне поле"
                      data-success="Правильно">Ціна товару</span>
            </div>
        </div>
        <div class="row">
            <div class="file-field input-field col s6">
                <div class="btn light orange">
                    <i class="material-icons">photo</i>
                    <input type="file" name="product-photo">
                </div>
                <div class="file-path-wrapper">
                    <label>
                        <input class="file-path validate" type="text" placeholder="Фото">
                    </label>
                </div>
            </div>
            <div class="input-field col s4">
                <i class="material-icons prefix">production_quantity_limits</i>
                <input  id="icon_count" type="number"  name="product-count">
                <label for="icon_count">Кількість</label>
                <span class="helper-text"
                      data-error="Це необхідне поле"
                      data-success="Правильно">Кількість товару</span>
            </div>
            <div class="input-field col s2">
                <button type="button" id="add-product-button" class="btn light orange right"><i class="material-icons left">task_alt</i>Зберігти</button>
            </div>
        </div>
    </form>
</div>
