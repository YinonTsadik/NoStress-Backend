// import java.time.LocalDateTime;
// import java.util.ArrayList;

// public class Test extends Constraint
// {
//     private double preparingHours;
//     private ArrayList<Task> preparing;

//     public Test(LocalDateTime startTime, LocalDateTime endTime, double preparingHours, String description)
//     {
//         super(startTime, endTime, description, constraintType.Test);

//         this.preparingHours = preparingHours;
//         this.preparing = new ArrayList<>();
//     }

//     // ===========================================================================

//     public double getPreparingHours()
//     {
//         return preparingHours;
//     }

//     public ArrayList<Task> getPreparing()
//     {
//         return preparing;
//     }

//     // ===========================================================================

//     public void setPreparingHours(double preparingHours)
//     {
//         this.preparingHours = preparingHours;
//     }

//     public void setPreparing(ArrayList<Task> preparing)
//     {
//         this.preparing = preparing;
//     }

//     // ===========================================================================

//     @Override
//     public String toString()
//     {
//         return super.toString()
//         + "Preparing Hours = " + preparingHours + "\n"
//         + "Preparing: " + preparing + "\n"
//         + "===================================\n";
//     }
// }