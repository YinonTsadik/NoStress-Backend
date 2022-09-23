import java.time.LocalDateTime;
import java.util.ArrayList;

public class App
{
    public static void main(String[] args)
    {
        ArrayList<Task> allTasks = new ArrayList<>();
        allTasks.add(new Task("Task #1", LocalDateTime.of(2022, 9, 24, 23, 59), 5));
        allTasks.add(new Task("Task #2", LocalDateTime.of(2022, 9, 29, 23, 59), 3));
        allTasks.add(new Task("Task #3", LocalDateTime.of(2022, 10, 13, 23, 59), 2));
        allTasks.add(new Task("Task #4", LocalDateTime.of(2022, 10, 7, 23, 59), 1));
        allTasks.add(new Task("Task #5", LocalDateTime.of(2022, 10, 23, 23, 59), 7));


        Knapsack knapsack = new Knapsack(allTasks, 14);
        knapsack.display();
        Solution solution = knapsack.solve();
        solution.display();
    }
}