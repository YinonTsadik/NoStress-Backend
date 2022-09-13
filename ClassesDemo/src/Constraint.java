import java.time.Duration;
import java.time.LocalDateTime;

enum constraintType
{
    Studies,
    Test,
    Work,
    Event,
    Rest,
    Other
}

public class Constraint extends Period
{
    private constraintType type;

    public Constraint(LocalDateTime startTime, LocalDateTime endTime, String description, constraintType type)
    {
        super(description);
        setStartTime(startTime);
        setEndTime(endTime);
        this.type = type;

        updateHoursAndMinutes();
    }

    // ===========================================================================

    private void updateHoursAndMinutes()
    {
        Duration duration = Duration.between(getStartTime(), getEndTime());

        double hours = duration.toHours();
        hours += (duration.toMinutes() % 60 / 60.0);

        setHours(hours);
        setMinutes(duration.toMinutes());
    }

    // ===========================================================================

    public constraintType getType()
    {
        return type;
    }

    public void setType(constraintType type)
    {
        this.type = type;
    }

    @Override
    public String toString()
    {
        return ">> Constraint:\n" + super.toString() + "\n"
        + "Type = " + type + "\n"
        + "===================================\n";
    }
}