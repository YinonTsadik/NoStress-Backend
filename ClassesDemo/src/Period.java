import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public abstract class Period
{
    protected String description;
    protected LocalDateTime startTime;
    protected LocalDateTime endTime;
    protected double hours;

    public static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    public Period(String description)
    {
        this.description = description;
        this.startTime = LocalDateTime.now();
        this.endTime = LocalDateTime.now();
        this.hours = 0;
    }

    // ===========================================================================

    public void updateHours()
    {
        Duration duration = Duration.between(getStartTime(), getEndTime());

        double hours = duration.toHours();
        double minutes = duration.toMinutes();
        hours += (minutes % 60 / 60.0);

        this.hours = hours;
    }

    // ===========================================================================

    public String getDescription()
    {
        return description;
    }

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

    // ===========================================================================

    public void setDescription(String description)
    {
        this.description = description;
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

    // ===========================================================================

    @Override
    public String toString()
    {
        return "Description: " + description + "\n"
        + "Start Time: " + startTime.format(FORMATTER) + "\n"
        + "End Time: " + endTime.format(FORMATTER) + "\n"
        + "Duration In Hours: " + String.format("%.2f", hours);
    }
}