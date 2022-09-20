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

        updateHours();
    }

    // ===========================================================================

    public constraintType getType()
    {
        return type;
    }

    // ===========================================================================

    public void setType(constraintType type)
    {
        this.type = type;
    }

    // ===========================================================================

    @Override
    public String toString()
    {
        return ">> Constraint:\n"
        + "Description: " + getDescription() + "\n"
        + "Type: " + type + "\n"
        + "Start Time: " + getStartTime().format(FORMATTER) + "\n"
        + "End Time: " + getEndTime().format(FORMATTER) + "\n"
        + "Duration In Hours: " + String.format("%.2f", getHours()) + "\n"
        + "===================================\n";
    }
}