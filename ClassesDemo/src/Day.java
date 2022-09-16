import java.time.LocalDate;
import java.util.ArrayList;

public class Day
{
    private LocalDate date;
    private ArrayList<Period> schedule;
    private ArrayList<Task> optionalTasks;
    private double availableHours;
    private double totalScore;

    public Day(LocalDate date)
    {
        this.date = date;
        this.schedule = new ArrayList<>();
        this.optionalTasks = new ArrayList<>();
        this.availableHours = 0;
        this.totalScore = 0;
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

    public double getTotalScore()
    {
        return totalScore;
    }

    // ===========================================================================

    public void setDate(LocalDate date)
    {
        this.date = date;
    }

    // public void setSchedule(ArrayList<Period> schedule)
    // {
    //     this.schedule = schedule;
    // }

    // public void setOptionalTasks(ArrayList<Task> optionalTasks)
    // {
    //     this.optionalTasks = optionalTasks;
    // }

    public void setAvailableHours(double availableHours)
    {
        this.availableHours = availableHours;
    }

    public void setTotalScore(double totalScore)
    {
        this.totalScore = totalScore;
    }

    // ===========================================================================

    @Override
    public String toString()
    {
        return ">> Day:\n"
        + "Schedule: " + schedule + "\n"
        + "Optional Tasks: " + optionalTasks + "\n"
        + "Available Hours = " + availableHours + "\n"
        + "Total Score = " + totalScore + "\n"
        + "###################################\n";
    }
}