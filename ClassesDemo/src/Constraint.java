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
        return ((this instanceof Test) ? ">> Test:\n" : ">> Constraint:\n")
        + "Type = " + type + "\n"
        + super.toString() + "\n"
        + ((this instanceof Test) ? "" : "===================================\n");
    }
}