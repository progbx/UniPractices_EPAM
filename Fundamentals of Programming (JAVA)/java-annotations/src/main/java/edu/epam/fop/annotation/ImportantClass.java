package edu.epam.fop.annotation;

import java.io.FileNotFoundException;
import java.lang.annotation.*;
import java.security.GeneralSecurityException;
import java.util.Properties;

@Documented
@Inherited
@Target(ElementType.ANNOTATION_TYPE)
@Retention(RetentionPolicy.RUNTIME)
@interface Documentation {
}

@Documentation
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Repeatable(ExceptionMappingContainer.class)
@interface ExceptionMapping {
  int status();
  String message();
  Class<? extends Throwable>[] types();
}

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@interface Mutable {
  String reason() default "";
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.CONSTRUCTOR)
@interface Source {
  Origin origin();

  enum Origin {
    DB, PROPERTIES, SERVER
  }
}

@Documentation
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface Tracked {
  String value();
}

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface ExceptionMappingContainer {
  ExceptionMapping[] value();
}

@Tracked(value = "important-class-track-number")
public class ImportantClass {

  @Mutable
  private final Properties properties;

  @Source(origin = Source.Origin.DB)
  public ImportantClass(@Mutable(reason = "Needs to filter out invalid properties") Properties properties) {
    this.properties = properties;
  }

  @ExceptionMapping(status = 400, message = "Bad Request", types = {IllegalArgumentException.class, IllegalStateException.class})
  @ExceptionMapping(status = 404, message = "Not Found", types = {FileNotFoundException.class})
  @ExceptionMapping(status = 401, message = "Unauthorized", types = {GeneralSecurityException.class})
  public void execute() {
    // some business logic here
  }
}