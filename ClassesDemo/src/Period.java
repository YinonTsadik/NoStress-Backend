import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public abstract class Period
{
    protected String description;
    protected LocalDateTime startTime;
    protected LocalDateTime endTime;
    protected int hours;

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

        int hours = (int) duration.toHours();
        int minutes = (int) duration.toMinutes();
        hours += (minutes % 60 / 60.0);

        this.hours = (int) hours;
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

    public int getHours()
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

    public void setHours(int hours)
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
        + "Duration In Hours: " + hours;
    }
}