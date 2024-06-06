import React, {useEffect, useState} from 'react'
import LoaderComponent from "./LoaderComponent.jsx";

const About = () => {

  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
        setTimeout(() => setShowDetails(true), 2000)
      }
  )

  return (
      <div>
        {!showDetails && <LoaderComponent show={{showDetails}}/>}
        {showDetails &&
            <div className="card col-md-8 offset-md-2 app-animate-bottom">
              <p className="bg-white text-center fs-1">About</p>
              <div className="">
                <p className="mb-3">
                  <h5>This a Full Stack Shopping application created as per
                    Hexagonal
                    Architecture
                    with</h5>
                </p>
                <ul className="fs-5">
                  <li>React 18+</li>
                  <li>Jdk 21</li>
                  <li>Spring Boot 3.3+ and</li>
                  <li>Mysql</li>
                </ul>

                <h5>Other technologies used are as follows:</h5>
                <ul className="fs-6">
                  <li><b>Maven</b> - Build tool</li>
                  <li><b>Junit5</b> - Unit Testing</li>
                  <li><b>Mockito</b> - Mocking objects while Unit testing</li>
                  <li><b>AssertJ</b> - Simple assertion style while Unit testing
                  </li>
                  <li><b>Lombok</b> - Auto generates boilerplate code for POJOs
                  </li>
                  <li><b>Hibernate/Spring Data JPA</b> - Persistence
                    Implementation
                    Framework
                  </li>
                  <li><b>TestContainers</b> - A framework that allows us to
                    launch a
                    MySQL
                    database as a Docker container from tests.
                  </li>
                  <li><b>Docker</b> - To run MySQL and Sonar as containers. Just
                    install
                    Docker Desktop and done
                  </li>
                  <li><b>Tomcat</b> - Application Server</li>
                  <li><b>Jacoco</b> - To analyze code coverage</li>
                  <li><b>SonarQube</b> - To analyze and report bugs and issues
                  </li>
                  <li><b>Spotless</b> - To analyze and format the code</li>
                  <li><b>Static Code Analysis</b> - By SpotBugs, PMD, Google
                    Checkstyle (If
                    using Sonar then not req as most of the rules are now part
                    of
                    Sonar)
                  </li>
                  <li><b>Slf4j/CustomLog</b> - Slf4j Logging support using
                    Lombok
                    CustomLog
                  </li>
                  <li><b>Swagger</b> - OpenAPI which is the version 3
                    implementation
                    for
                    Spring Boot 3.x
                  </li>
                  <li><b>React Router</b> - FrontEnd Navigation</li>
                  <li><b>Vite JS</b> - React development Server</li>
                  <li><b>SWC</b> - Speedy Web Compiler</li>
                  <li><b>Bootstrap 5</b> - CSS</li>
                  <li><b>Axios</b> - Rest API Calls</li>
                  <li><b>FontAwesome</b> - SVG Icons</li>
                </ul>
              </div>
            </div>}
      </div>
  )
}
export default About
