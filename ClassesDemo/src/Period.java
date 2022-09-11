import java.time.LocalDate;
import java.time.LocalTime;

public abstract class Period
{
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private double durationInHours;
    private double durationInMinutes;
    private String description;

    public Period(LocalDate date, LocalTime startTime, LocalTime endTime, double durationInHours, double durationInMinutes, String description)
    {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.durationInHours = durationInHours;
        this.durationInMinutes = durationInMinutes;
        this.description = description;
    }

    public LocalDate getDate()
    {
        return date;
    }

    public LocalTime getStartTime()
    {
        return startTime;
    }

    public LocalTime getEndTime()
    {
        return endTime;
    }

    public double getDurationInHours()
    {
        return durationInHours;
    }

    public double getDurationInMinutes()
    {
        return durationInMinutes;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDate(LocalDate date)
    {
        this.date = date;
    }

    public void setStartTime(LocalTime startTime)
    {
        this.startTime = startTime;
    }

    public void setEndTime(LocalTime endTime)
    {
        this.endTime = endTime;
    }

    public void setDurationInHours(double durationInHours)
    {
        this.durationInHours = durationInHours;
    }

    public void setDurationInMinutes(double durationInMinutes)
    {
        this.durationInMinutes = durationInMinutes;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    @Override
    public String toString()
    {
        return "Date = " + date + ",\n"
        + "Start Time = " + startTime + ",\n"
        + "End Time = " + endTime + ",\n"
        + "Duration In Hours = " + durationInHours + ",\n"
        + "Duration In Minutes = " + durationInMinutes + ",\n"
        + "Description = " + description;
    }
}