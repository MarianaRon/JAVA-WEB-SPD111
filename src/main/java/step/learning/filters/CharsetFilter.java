package step.learning.filters;

import com.google.inject.Singleton;

import javax.servlet.*;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import  java.nio.charset.StandardCharsets;
@Singleton
public class CharsetFilter implements Filter {
    private FilterConfig filterConfig;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        //
        //
        //
        this.filterConfig = filterConfig;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException
    {

        /*Chain -
          * */

        request.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());

        chain.doFilter(request, response);
        //
    }

    @Override
    public void destroy() {
        this.filterConfig = null; //
    }
    /*
    фільтри (сервлетні фільтри) - концепція Midelware JSPутворення каскаду обробників запиту, які передають (обо не передають)
    процес один іншому. Фільтри спрацьовують раніше за сервлети, тому вони не залежать від методу до JSP
     (до представлення)
    * */
}
