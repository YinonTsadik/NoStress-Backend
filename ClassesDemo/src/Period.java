import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public abstract class Period
{
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private double hours;
    private double minutes;
    private String description;

    public static final DateTimeFormatter FORMATTER= DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    public Period(String description)
    {
        this.startTime = LocalDateTime.now();
        this.endTime = LocalDateTime.now();
        this.hours = 0;
        this.minutes = 0;
        
        this.description = description;
    }

    // ===========================================================================

    public LocalDateTime getStartTime()
    {
        return startTime;
    }

    public LocalDateTime getEndTime()
    {
        return endTime;
    }

    public double getHours()
    {
        return hours;
    }

    public double getMinutes()
    {
        return minutes;
    }

    public String getDescription()
    {
        return description;
    }

    public void setStartTime(LocalDateTime startTime)
    {
        this.startTime = startTime;
    }

    public void setEndTime(LocalDateTime endTime)
    {
        this.endTime = endTime;
    }

    public void setHours(double hours)
    {
        this.hours = hours;
    }

    public void setMinutes(double minutes)
    {
        this.minutes = minutes;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    @Override
    public String toString()
    {
        return "Start Time = " + startTime.format(FORMATTER) + "\n"
        + "End Time = " + endTime.format(FORMATTER) + "\n"
        + "Duration In Hours = " + hours + "\n"
        + "Duration In Minutes = " + minutes + "\n"
        + "Description = " + description;
    }
}