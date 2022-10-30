import java.time.LocalDateTime;

enum constraintType {
    Studies,
    Test,
    Work,
    Event,
    Rest,
    Other
}

public class Constraint extends Period {
    private constraintType type;

    public Constraint(String description, constraintType type, LocalDateTime startTime, LocalDateTime endTime) {
        super(description);
        this.type = type;
        this.startTime = startTime;
        this.endTime = endTime;

        updateHours();
    }

    // ===========================================================================

    public constraintType getType() {
        return type;
    }

    // ===========================================================================

    public void setType(constraintType type) {
        this.type = type;
    }

    // ===========================================================================

    @Override
    public String toString() {
        return ">> Constraint:\n"
                + "Description: " + description + "\n"
                + "Type: " + type + "\n"
                + "Start Time: " + startTime.format(FORMATTER) + "\n"
                + "End Time: " + endTime.format(FORMATTER) + "\n"
                + "Duration In Hours: " + String.format("%.2f", hours) + "\n"
                + "===================================\n";
    }

    // ===========================================================================
}