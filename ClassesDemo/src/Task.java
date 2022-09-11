import java.time.LocalDate;
import java.time.LocalTime;

public class Task extends Period
{
    private double daysUntilDeadline;
    private double score;

    public Task(LocalDate date, LocalTime startTime, LocalTime endTime, double durationInHours, double durationInMinutes, String description, double daysUntilDeadline, double score)
    {
        super(date, startTime, endTime, durationInHours, durationInMinutes, description);
        this.daysUntilDeadline = daysUntilDeadline;
        this.score = score;
    }

    public double getDaysUntilDeadline()
    {
        return daysUntilDeadline;
    }

    public double getScore()
    {
        return score;
    }

    public void setDaysUntilDeadline(double daysUntilDeadline)
    {
        this.daysUntilDeadline = daysUntilDeadline;
    }

    public void setScore(double score)
    {
        this.score = score;
    }

    @Override
    public String toString()
    {
        return "Task:\n{" + super.toString() + ",\n"
        + "Days Until Deadline = " + daysUntilDeadline + ",\n"
        + "Score = " + score + "}\n";
    }
}
