package User;

import java.sql.*;
public class UserDatabase {

    public static void main(String[] args) throws SQLException {
        String url = "jdbc:mysql://database-1.cc4pib73i9ac.us-east-2.rds.amazonaws.com/piquedDB";
        String user = "admin";
        String pw = "GBZJV8eZxHWC2DFYLyof";

        Connection conn = null;
        Statement stmt = null;

        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(url, user, pw);

            stmt = conn.createStatement();
            String sql = "SELECT * FROM user";
            ResultSet rs = stmt.executeQuery(sql);

            while(rs.next()) {
                
                int userId = rs.getInt("userId");
                String username = rs.getString("username");
                String name = rs.getString("name");
                String lastName = rs.getString("lastName");
                String email = rs.getString("email");
                String password = rs.getString("password");
                String dob = rs.getString("dob");
                String profilePic = rs.getString("profilePic");
                String lastLogin = rs.getString("lastLogin");
                String createdAt = rs.getString("createdAt");

                System.out.println("userid: " + userId + "name " + name);
            }

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            if (stmt != null) {
                stmt.close();
            }
            if (conn != null) {
                conn.close();
            }
        }
    }
}

