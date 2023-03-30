import java.util.*;
import java.sql.*;
public class Database {

    public static void main(String[] args) throws SQLException {
        String url = "jdbc:mysql://localhost:3306/piquedDB";
        String user = "root";
        String password = "Cattle08!";

        Connection conn = null;
        Statement stmt = null;

        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(url, user, password);

            stmt = conn.createStatement();
            String sql = "SELECT * FROM commentreaction";
            ResultSet rs = stmt.executeQuery(sql);

            while(rs.next()) {
                
                int commentReactionId = rs.getInt("commentReactionId");
                int fk_commentId = rs.getInt("fk_commentId");
                int fk_userId = rs.getInt("fk_userId");
                int reactionType = rs.getInt("reactionType");
                String lastModified = rs.getString("lastModified");
                

                System.out.println("reactid: " + commentReactionId + " " + fk_commentId + " " + fk_userId + " " + reactionType + " " + lastModified);
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
