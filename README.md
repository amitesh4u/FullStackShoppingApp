# CliqueShop 

### Full Stack Shopping Web Application with React 18 web application with Java 21, Spring Boot 3.3 and Mysql implemented according to Hexagonal architecture.

<br/>
<img src="documents/CliqueShop.png" alt="CliqueShop application page snapshot" width="700px"/>



## Technologies used
### Back-end
* **JDK 21** - Core language
* **Spring Boot 3.3** - Java Framework
* **Maven** - Build tool
* **Junit5** - Unit Testing
* **Mockito** - Mocking objects while Unit testing
* **AssertJ** - Simple assertion style while Unit testing
* **Lombok** - Auto generates boilerplate code for POJOs
* **Hibernate/Spring Data JPA** - Persistence Implementation Framework
* **MySql** - Database 
* **TestContainers** - A framework that allows us to launch a MySQL database as a Docker container from tests.
* **Docker** - To run MySQL and Sonar as containers. Just install Docker Desktop and done
* **Jacoco** - To analyze code coverage
* **SonarQube** - To analyze and report bugs and issues
* **Spotless** - To analyze and format the code
* **Static Code Analysis** - By SpotBugs, PMD, Google Checkstyle (_If using Sonar then not req as most of the rules are now part of Sonar_)
* **Slf4j/CustomLog** - Slf4j Logging support using Lombok CustomLog
* **Swagger** - OpenAPI which is the version 3 implementation for Spring Boot 3.x

### Front-end
* **React 18** - JSX Framework
* **React Router** - Navigation
* **Vite JS** - React development Server
* **SWC** - Speedy Web Compiler
* **Bootstrap 5** - CSS 
* **Axios** - Rest API Calls
* **FontAwesome** - SVG Icons

## Important Plugins for Intellij
* **HTTP Client** - Required to run sample http commands from document/sample-requests.http (Step 1,2)
* **JUnit**
* **Lombok**
* **Spring DATA**
* **Tomcat**
* **Jakarta EE** - Application server
* **Vite**


## What is a Hexagonal Architecture?
Alistair Cockburn introduced the hexagonal software architecture as follows
* All non-technical business logic must reside in Application core and must be invoked by User, External application or automated Tests without any difference.
* All communication to the Application core from external entities say User, Database or Test suite must happen through Ports (Interfaces).
* An Adapter is like a middleman who will control the communication between External entities and Application core via Ports. 


# Application overview
The application mimics a simplified online store with following functionalities:

* Add, Remove and Edit Products
* Product search
* Adding a product to the shopping cart
* Retrieving the shopping cart with the products, their respective quantity, and the total price
* Incrementing, Decrementing or removing an Item from Cart
* Emptying the shopping cart

### Note:
* The amount of a product added to the cart must be at least one.
* After adding a product, the total quantity of this product in the cart must not exceed the amount of the product available in the warehouse or 10 which ever is smaller.
* After emptying the Cart there should be no products available in the Cart.
* We can not remove a Product if it is present in any Cart.

# Architecture Overview
The source code has four modules:
* `model` - It contains the domain models
* `application` - It contains the domain services and the ports
* `adapter` - It contains the adapters like REST, In-memory and JPA
* `boostrap` - It contains the configuration and bootstrapping logic like instantiating adapters/domain services and running Undertow web server

The following diagram shows the final hexagonal architecture of the application along with the source code modules.

<img src="documents/hexagonal-architecture-modules-uml.png" alt="Hexagonal Architecture Modules UML diagram" width="600px"/>
<br>
<img src="documents/hexagonal-architecture-modules.png" alt="Hexagonal Architecture Modules" width="600px"/>

Hexagonal Architecture modules (www.happycoders.eu)

## Lombok annotations used in project
* **@RequiredArgsConstructor** - Generates constructor that take one argument per final / non-nullfield
* **@AllArgsConstructor** - Generates constructor that take one argument for every field.
* **@Data** - A shortcut for @ToString, @EqualsAndHashCode, @Getter on all fields, and @Setter on all non-final fields, and @RequiredArgsConstructor!
* **@Accessors** 
* * **fluent** – A boolean. If true, the getter for pepper is just pepper(), and the setter is pepper(T newValue). Furthermore, unless specified, chain defaults to true.
  Default: false.
* * **chain** – A boolean. If true, generated setters return this instead of void.
  Default: false, unless fluent=true, then Default: true.
* **@Getter/@Setter** - Generates getter/setter methods for the fields
* **@ToString** - Generates a toString method for the class
* **@EqualsAndHashCode** - Generates hashCode and equals implementations from the fields of your object
* **@CustomLog** - Generates Custom Logger object for the class based on Logging library as defined in **_lombok.config_** file
```
lombok.log.custom.declaration = org.slf4j.Logger org.slf4j.LoggerFactory.getLogger(NAME)(TOPIC)

```

## How to run
### BackEnd server
* Build and run the **Bootstrap.war** in Tomcat
* **Spring Boot Profile** - Use the Spring boot profile **_mysql_** while running the app. Default is **_inmemory_**
```
-Dspring.profiles.active=mysql
```
* Based on the System property value of '**persistence**' key (_'inmemory'/'mysql'_) we can run the application with 
* **InMemory DB** - Data will persist till the application is running
* **MySql DB** - We can either run a local MySql server (**DB-_shop_, Root Pwd-_test_**) or run a Docker container
```
docker run --name hexagon-mysql -d -p3306:3306 -e MYSQL_DATABASE=shop -e MYSQL_ROOT_PASSWORD=test mysql:8.1
```
* You can invoke HTTP commands from '**documents/sample-requests.http**' directly from Intellij

### Front-end server
* Go to shop-frontend folder and run node server
``` 
cd shop-frontend
npm run dev
```
## Code analysis
* **Spotless** - run **_mvn spotless:apply_** to auto reformat the code if there is any issue during build
* **Static code analysis** - For Static code analysis with Spotbugs, PMD and Google Check style run
```
mvn clean verify -Dspring.profiles.active=code-inspection -DskipTests=true
```
## Running SONAR from Zip file with JDK 17+ on the system
* As per May 2024, Sonar supports up to JDK17 with some issues with ElasticSearch. 
* So if you have any latest version of JDK installed then please install JDK 17 separately.
* Create an Environment variable to point to the Java executable file of JDK17 i.e. 
```
SONAR_JAVA_PATH = C:\Program Files\Java\jdk-17.0.1\bin\java.exe (Windows)
```
* And run the StartSonar.bat 
```
C:\sonarqube\bin\windows-x86-64\StartSonar.bat
```
* Please refer the https://docs.sonarsource.com/sonarqube/latest/try-out-sonarqube/ page for latest steps

## Running Sonar from docker image
* If Docker is already installed on your system (as part of MySql TestContainers step)
* Then just execute the following line and you are all set
```
docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest
```
### After creating a Project and Token in SonarQube run this for report generation
```
mvn -Dsonar.projectKey=<<PROJECT_KEY>> -Dsonar.projectName='<<PROJECT_NAME>>' -Dsonar.host.url=http://localhost:9000 
-Dsonar.token=<<TOKEN_VALUE>> clean verify sonar:sonar
```

## Swagger Version 3 links
* **Swagger UI** - http://localhost:8080/shop/swagger-ui/index.html
* **Client Docs** - http://localhost:8080/shop/v3/api-docs


