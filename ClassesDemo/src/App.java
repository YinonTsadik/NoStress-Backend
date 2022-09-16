import java.time.LocalDate;
import java.time.LocalDateTime;

public class App {
    public static void main(String[] args)
    {
        LocalDateTime dl = LocalDateTime.of(2022, 9, 14, 10, 45);
        Task t = new Task(dl, 0.5, "OS HomeWork");
        System.out.println(t);

        LocalDateTime d2 = LocalDateTime.of(2022, 9, 15, 21, 15);
        LocalDateTime d3 = LocalDateTime.of(2022, 9, 16, 0, 30);

        Constraint c = new Constraint(d2, d3, "Cinema with friends", constraintType.Event);
        System.out.println(c);

        Test test = new Test(
                LocalDateTime.of(2022, 10, 1, 12, 0),
                LocalDateTime.of(2022, 10, 1, 14, 50),
                10, "Algebra test");

        System.out.println(test);

        Day day = new Day(LocalDate.now());
        System.out.println(day);
    }
}