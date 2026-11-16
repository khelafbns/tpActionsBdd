import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Optional;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StudentsTest {

    private static Connection conn;

    @BeforeAll
    static void connect() throws SQLException {
        conn = Students.connect();
    }

    @AfterAll
    static void close() throws SQLException {
        conn.close();
    }

    @BeforeEach
    void clean() throws SQLException {
        try (Statement st = conn.createStatement()) {
            st.execute("TRUNCATE students RESTART IDENTITY");
        }
    }

    @Test
    void ajouterPuisLire() throws SQLException {
        int id = Students.addStudent(conn, "Amel", 15);
        Optional<Students.Student> student = Students.getStudent(conn, id);
        assertTrue(student.isPresent());
        assertEquals("Amel", student.get().name());
        assertEquals(15.0, student.get().grade(), 0.001);
    }

    @Test
    void etudiantInexistant() throws SQLException {
        assertEquals(Optional.empty(), Students.getStudent(conn, 999));
    }

    @Test
    void moyenne() throws SQLException {
        Students.addStudent(conn, "Amel", 10);
        Students.addStudent(conn, "Karim", 14);
        assertEquals(12.0, Students.averageGrade(conn), 0.001);
    }
}
