import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;

public class App
{
    static ArrayList<Task> allTasks;
    static ArrayList<Day> allDays;

    public static void main(String[] args)
    {
        allTasks = new ArrayList<>();
        allTasks.add(new Task("Task A", LocalDateTime.of(2022, 10, 2, 0, 0), 5));
        allTasks.add(new Task("Task B", LocalDateTime.of(2022, 9, 30, 0, 0), 3));
        allTasks.add(new Task("Task C", LocalDateTime.of(2022, 10, 1, 0, 0), 2));
        allTasks.add(new Task("Task D", LocalDateTime.of(2022, 10, 1, 0, 0), 1));
        allTasks.add(new Task("Task E", LocalDateTime.of(2022, 10, 2, 0, 0), 3));
        allTasks.add(new Task("Task F", LocalDateTime.of(2022, 9, 30, 0, 0), 4));
        allTasks.add(new Task("Task G", LocalDateTime.of(2022, 10, 3, 0, 0), 3));
        allTasks.add(new Task("Task H", LocalDateTime.of(2022, 10, 3, 0, 0), 2));


        allDays = new ArrayList<>();
        allDays.add(new Day(LocalDate.of(2022, 9, 29)));
        allDays.add(new Day(LocalDate.of(2022, 9, 30)));
        allDays.add(new Day(LocalDate.of(2022, 10, 1)));
        allDays.add(new Day(LocalDate.of(2022, 10, 2)));

        for (Day day : allDays)
        {
            for (Task task : allTasks)
            {
                if (task.getDeadline().isAfter(LocalDateTime.of(day.getDate(), LocalTime.of(0, 0))))
                    day.getOptionalTasks().add(task);
            }    
        }

        // System.out.println(allDays);

        for (Day day : allDays)
        {
            Knapsack knapsack = new Knapsack(day.getOptionalTasks(), (int) day.getAvailableHours());
            Solution solution = knapsack.solve();
            day.setTotalValue(solution.getValue());

            for (Task task : solution.getTasks())
            {
                day.getSchedule().add(task);
                removeTask(task);
            }
        }

        System.out.println(allDays);
    }

    public static void removeTask(Task task)
    {
        for (Day day : allDays)
            day.getOptionalTasks().remove(task);
    }
}