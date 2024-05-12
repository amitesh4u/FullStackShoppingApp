package com.amitesh.shop.bootstrap;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

@Disabled("Run manually after starting MySQL server")
class MysqlConnectionTest {


  @Test
  void testConnnection() {
    String url = "jdbc:mysql://localhost:3306"; //pointing to no database.
    String username = "root";
    String password = "test";

    System.out.println("Connecting to server...");

    try (Connection connection = DriverManager.getConnection(url, username, password)) {
      System.out.println("Server connected!");
      Statement stmt = null;
      ResultSet resultset = null;

      try {
        stmt = connection.createStatement();

        if (stmt.execute("SHOW DATABASES;")) {
          resultset = stmt.getResultSet();
        }

        while (resultset.next()) {
          System.out.println(resultset.getString("Database"));
        }

      } catch (SQLException ex) {
        // handle any errors
      } finally {
        // release resources
        if (resultset != null) {
          try {
            resultset.close();
          } catch (SQLException sqlEx) {
            //ignore
          }
          resultset = null;
        }

        if (stmt != null) {
          try {
            stmt.close();
          } catch (SQLException sqlEx) {
            //ignore
          }
          stmt = null;
        }

        if (connection != null) {
          connection.close();
        }
      }
    } catch (SQLException e) {
      throw new IllegalStateException("Cannot connect the server!", e);
    }
  }

}
