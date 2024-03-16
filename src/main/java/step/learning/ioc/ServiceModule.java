package step.learning.ioc;

import com.google.inject.AbstractModule;
import step.learning.services.db.DBService;
import step.learning.services.db.MySqlDbService;
import step.learning.services.form.FormParseService;
import step.learning.services.form.HybridFormParser;
import step.learning.services.hash.HashService;
import step.learning.services.hash.Md5HashService;

public class ServiceModule extends AbstractModule {
@Override
    protected void configure(){
    bind(HashService.class).to(Md5HashService.class);
    bind(DBService.class).to(MySqlDbService.class);
    bind(FormParseService.class).to(HybridFormParser.class);

}
    /*
    Інверсія управління(Inversion of Control, IoC) -

    */

    /*
    Впровадження на базі Google Guice
    Spring - аналог
    - підключаємо до проекту

    - створбємо клас - "слухач" створення контексту
    - створюємо класи-конфігуратори


     */
}
