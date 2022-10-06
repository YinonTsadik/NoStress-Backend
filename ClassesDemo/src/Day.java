import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class Day
{
    private LocalDate date;
    private ArrayList<Task> optionalTasks;
    private ArrayList<Period> schedule;
    private double availableHours;
    private double totalValue;
    
    public static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public Day(LocalDate date)
    {
        this.date = date;
        this.optionalTasks = new ArrayList<>();
        this.schedule = new ArrayList<>();
        this.availableHours = 7;
        this.totalValue = 0;
    }

    // ===========================================================================

    public LocalDate getDate()
    {
        return date;
    }

    public ArrayList<Task> getOptionalTasks()
    {
        return optionalTasks;
    }

    public ArrayList<Period> getSchedule()
    {
        return schedule;
    }

    public double getAvailableHours()
    {
        return availableHours;
    }

    public double getTotalValue()
    {
        return totalValue;
    }

    // ===========================================================================

    public void setDate(LocalDate date)
    {
        this.date = date;
    }

    public void setOptionalTasks(ArrayList<Task> optionalTasks)
    {
        this.optionalTasks = optionalTasks;
    }

    public void setSchedule(ArrayList<Period> schedule)
    {
        this.schedule = schedule;
    }

    public void setAvailableHours(double availableHours)
    {
        this.availableHours = availableHours;
    }

    public void setTotalValue(double totalValue)
    {
        this.totalValue = totalValue;
    }

    // ===========================================================================

    @Override
    public String toString()
    {
        return ">> Day:\n"
        + "Date: " + date.format(FORMATTER) + "\n"
        + "Available Hours: " + availableHours + "\n"
        + "Optional Tasks: " + optionalTasks + "\n"
        + "Schedule: " + schedule + "\n"
        + "Total Value: " + totalValue + "\n"
        + "###################################\n";
    }
}