
<%@ page import="step.learning.dal.dto.ActionItem" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String context = request.getContextPath() ;
    // Вилучаємо дані, передані сервлетом (контролером)
    ActionItem[] actionItems = (ActionItem[]) request.getAttribute("action");
%>
<%-- Відображаємо дані --%>
<% for(ActionItem item : actionItems) { %>
<div class="col s12 m7">
    <div class="card horizontal">
        <div class="card-image flex1">
            <img src="<%=context%>/img/download.png" alt="img" />
        </div>
        <div class="card-stacked flex3">
            <div class="card-content">
                <p><%= item.getProductId() %></p>
                <p><%= item.getCount() %></p>
            </div>
            <div class="card-action">
                <a href="#">Акція</a>
            </div>
        </div>
    </div>
</div>
<% } %>