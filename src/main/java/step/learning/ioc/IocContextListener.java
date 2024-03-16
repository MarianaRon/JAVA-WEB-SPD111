package step.learning.ioc;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;

public class IocContextListener extends GuiceServletContextListener {

    @Override
    protected Injector getInjector() {
        return Guice.createInjector(
                new ServiceModule(),
                new RouterModule()
        );
    }



    /*
    Подія створення контексту - аналог запуску виконавчого коду
    Оскільки запуск вепроєктів
    */
}
