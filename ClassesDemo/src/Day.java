import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class Day
{
    private LocalDate date;
    private ArrayList<Period> schedule;
    private ArrayList<Task> optionalTasks;
    private double availableHours;
    private double totalValue;
    
    public static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public Day(LocalDate date)
    {
        this.date = date;
        this.schedule = new ArrayList<>();
        this.optionalTasks = new ArrayList<>();
        this.availableHours = 7;
        this.totalValue = 0;
    }

    // ===========================================================================

    public LocalDate getDate()
    {
        return date;
    }

    public ArrayList<Period> getSchedule()
    {
        return schedule;
    }

    public ArrayList<Task> getOptionalTasks()
    {
        return optionalTasks;
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

    public void setSchedule(ArrayList<Period> schedule)
    {
        this.schedule = schedule;
    }

    public void setOptionalTasks(ArrayList<Task> optionalTasks)
    {
        this.optionalTasks = optionalTasks;
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
        + "Schedule: " + schedule + "\n"
        + "Optional Tasks: " + optionalTasks + "\n"
        + "Available Hours: " + availableHours + "\n"
        + "Total Value: " + totalValue + "\n"
        + "###################################\n";
    }
}