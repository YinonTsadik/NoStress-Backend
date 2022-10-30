import java.time.Duration;
import java.time.LocalDateTime;

public class Task extends Period {
    private LocalDateTime deadline;
    private double daysUntilDeadline;
    private double value;

    public Task(String description, LocalDateTime deadline, double hours) {
        super(description);
        this.hours = hours;
        this.deadline = deadline;

        updateDetails();
    }

    // ===========================================================================

    public void updateDetails() {
        updateDeadline();
        updateScore();
    }

    private void updateDeadline() {
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(now, this.deadline);
        double daysUntilDeadline = 0;

        daysUntilDeadline += duration.toDays();
        daysUntilDeadline += (duration.toHours() % 24 / 24.0);
        daysUntilDeadline += (duration.toMinutes() % 60 / 60.0 / 24.0);

        this.daysUntilDeadline = daysUntilDeadline;
    }

    private void updateScore() {
        double days = this.daysUntilDeadline;
        double hours = this.hours;
        double value = 0;

        if (days <= 1)
            this.value = 1000;

        else {
            value += daysScore(days);
            value += hoursScore(hours);

            this.value = value;
        }
    }

    private double daysScore(double x) {
        return Math.log10(x - 1) / Math.log10(0.88) + 25.8;
    }

    private double hoursScore(double x) {
        return Math.pow(1.5, x) - 1;
    }

    // ===========================================================================

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public double getDaysUntilDeadline() {
        return daysUntilDeadline;
    }

    public double getValue() {
        return value;
    }

    // ===========================================================================

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    // public void setDaysUntilDeadline(double daysUntilDeadline)
    // {
    // this.daysUntilDeadline = daysUntilDeadline;
    // }

    // public void setValue(double value)
    // {
    // this.value = value;
    // }

    // ===========================================================================

    // @Override
    // public String toString()
    // {
    // return ">> Task:\n"
    // + "Description: " + description + "\n"
    // + "Deadline: " + deadline.format(FORMATTER) + "\n"
    // + "Days Until Deadline: " + String.format("%.2f", daysUntilDeadline) + "\n"
    // + "Duration In Hours: " + String.format("%.2f", hours) + "\n"
    // + "Value: " + String.format("%.2f", value) + "\n"
    // + "===================================\n";
    // }

    @Override
    public String toString() {
        return "\n" + getDescription()
                + ", Weight = " + String.format("%.2f", hours)
                + ", Deadline = " + deadline.format(FORMATTER)
                + ", Value = " + String.format("%.2f", value);
    }

    // ===========================================================================
}