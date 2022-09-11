import java.time.LocalDate;
import java.time.LocalTime;

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

    public Constraint(LocalDate date, LocalTime startTime, LocalTime endTime, double durationInHours, double durationInMinutes, String description, constraintType type)
    {
        super(date, startTime, endTime, durationInHours, durationInMinutes, description);
        this.type = type;
    }

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
        return "Constraint:\n{" + super.toString() + ",\n"
        + "Type = " + type + "}\n";
    }
}