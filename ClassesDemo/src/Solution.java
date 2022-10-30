import java.util.ArrayList;

public class Solution {
    private ArrayList<Task> tasks;
    private int value;

    public Solution(ArrayList<Task> tasks, int value) {
        this.tasks = tasks;
        this.value = value;
    }

    // ===========================================================================

    public ArrayList<Task> getTasks() {
        return tasks;
    }

    public int getValue() {
        return value;
    }

    // ===========================================================================

    public void display() {
        if (tasks != null && !tasks.isEmpty()) {
            System.out.println("\nKnapsack solution:");
            System.out.println("Value = " + value);
            System.out.println("Tasks to pick: ");

            for (Task task : tasks)
                System.out.println("- " + task);
        }
    }

    // ===========================================================================
}