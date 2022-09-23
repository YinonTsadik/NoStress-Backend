import java.time.LocalDateTime;
import java.util.ArrayList;

public class App
{
    public static void main(String[] args)
    {
        ArrayList<Task> allTasks = new ArrayList<>();
        allTasks.add(new Task(LocalDateTime.of(2022, 9, 23, 23, 59), 5, "Task 1"));
        allTasks.add(new Task(LocalDateTime.of(2022, 9, 29, 23, 59), 3, "Task 2"));
        allTasks.add(new Task(LocalDateTime.of(2022, 10, 13, 23, 59), 2, "Task 3"));
        allTasks.add(new Task(LocalDateTime.of(2022, 10, 7, 23, 59), 1, "Task 4"));
        allTasks.add(new Task(LocalDateTime.of(2022, 10, 23, 23, 59), 7, "Task 5"));

        System.out.println(allTasks);

        System.out.println(new Constraint(LocalDateTime.of(2022, 10, 26, 0, 0), LocalDateTime.of(2022, 10, 27, 0, 0), "Birthday", constraintType.Event));
    }
}