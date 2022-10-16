import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;

public class Controller
{
    private ArrayList<Day> allDays;
    private ArrayList<Task> allTasks;

    public Controller(int numOfDays)
    {
        this.allDays = generateCalendar(numOfDays);
        this.allTasks = new ArrayList<>();
    }

    // ===========================================================================

    private ArrayList<Day> generateCalendar(int numOfDays)
    {
        ArrayList<Day> days = new ArrayList<>();
        LocalDate today = LocalDate.now();
        days.add(new Day(today));

        for (int i = 1; i < numOfDays; i++)
            days.add(new Day(today.plusDays(i)));

        return days;
    }

    public void Optimization()
    {
        for (Day day : allDays)
            for (Task task : allTasks)
                if (task.getDeadline().isAfter(LocalDateTime.of(day.getDate(), LocalTime.of(0, 0))))
                    day.getOptionalTasks().add(task);

        for (Day day : allDays)
        {
            Knapsack knapsack = new Knapsack(day.getOptionalTasks(), (int) day.getAvailableHours());
            Solution solution = knapsack.solve();
            day.setTotalValue(solution.getValue());

            for (Task task : solution.getTasks())
            {
                day.getSchedule().add(task);
                day.setAvailableHours(day.getAvailableHours() - task.getHours());
                removeTask(task);
            }
        }
    }

    private void removeTask(Task task)
    {
        for (Day day : allDays)
            day.getOptionalTasks().remove(task);
    }

    // ===========================================================================

    public ArrayList<Day> getAllDays()
    {
        return allDays;
    }

    public ArrayList<Task> getAllTasks()
    {
        return allTasks;
    }

    // ===========================================================================

    @Override
    public String toString()
    {
        String str = "";
        for (Day day : allDays)
            str += day.getDate().getDayOfMonth() + " ";
        str += "\n" + allTasks.toString();
        return str;
    }

    // ===========================================================================
}