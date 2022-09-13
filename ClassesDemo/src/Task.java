import java.time.Duration;
import java.time.LocalDateTime;

public class Task extends Period
{
    private LocalDateTime deadline;
    private double daysUntilDeadline;
    private double score;

    public Task(LocalDateTime deadline, double hours, String description)
    {
        super(description);
        this.deadline = deadline;
        setHours(hours);
        setMinutes(hours * 60);

        updateDeadline();
        updateScore();
    }

    // ===========================================================================

    public void updateDetails()
    {
        updateDeadline();
        updateScore();
    }

    private void updateDeadline()
    {
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(now, this.deadline);
        double daysUntilDeadline = 0;

        daysUntilDeadline += duration.toDays();
        daysUntilDeadline += (duration.toHours() % 24 / 24.0);
        daysUntilDeadline += (duration.toMinutes() % 60 / 60.0 / 24.0);

        this.daysUntilDeadline = daysUntilDeadline;
    }

    private void updateScore()
    {
        double days = this.daysUntilDeadline;
        double hours = this.getHours();
        double score = 0;

        if (days <= 1)
            this.score = Double.POSITIVE_INFINITY;

        else
        {
            score += f(days);
            score += g(hours);

            this.score = score;
        }
    }

    private double f(double x)
    {
        return Math.log10(x - 1) / Math.log10(0.88) + 25.8;
    }

    private double g(double x)
    {
        return Math.pow(1.7, x) - 1;
    }

    // ===========================================================================

    public LocalDateTime getDeadline()
    {
        return deadline;
    }

    public double getDaysUntilDeadline()
    {
        return daysUntilDeadline;
    }

    public double getScore()
    {
        return score;
    }

    public void setDeadline(LocalDateTime deadline)
    {
        this.deadline = deadline;
    }

    // public void setDaysUntilDeadline(double daysUntilDeadline)
    // {
    //     this.daysUntilDeadline = daysUntilDeadline;
    // }

    // public void setScore(double score)
    // {
    //     this.score = score;
    // }

    @Override
    public String toString()
    {
        return ">> Task:\n" + super.toString() + "\n"
        + "Deadline = " + deadline.format(FORMATTER) + "\n"
        + "Days Until Deadline = " + String.format("%.3f", daysUntilDeadline) + "\n"
        + "Score = " + score + "\n"
        + "===================================\n";
    }
}
