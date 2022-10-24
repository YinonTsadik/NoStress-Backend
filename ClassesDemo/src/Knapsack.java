import java.util.ArrayList;

public class Knapsack
{
    private ArrayList<Task> tasks;
    private int capacity;

    public Knapsack(ArrayList<Task> tasks, int capacity)
    {
        this.tasks = tasks;
        this.capacity = capacity;
    }

    public Solution solve()
    {
        int numOfTasks = tasks.size();
        int[][]mat = new int[numOfTasks + 1][capacity + 1];

        for (int i = 0; i <= capacity; i++)
            mat[0][i] = 0;
        
        for (int i = 1; i <= numOfTasks; i++)
        {
            for (int j = 0; j <= capacity; j++)
            {
                if (tasks.get(i - 1).getHours() > j)
                    mat[i][j] = mat[i - 1][j];
                else
                    mat[i][j] = (int) Math.max(
                        mat[i - 1][j],
                        mat[i - 1][j - (int) tasks.get(i - 1).getHours()] + (int) tasks.get(i - 1).getValue());
            }
        }

        int result = mat[numOfTasks][capacity];
        int w = capacity;
        ArrayList<Task> tasksSolution = new ArrayList<>();

        for (int i = numOfTasks; i > 0 && result > 0; i--)
        {
            if (result != mat[i - 1][w])
            {
                tasksSolution.add(tasks.get(i - 1));
                result -= (int) tasks.get(i - 1).getValue();
                w -= (int) tasks.get(i - 1).getHours();
            }
        }

        return new Solution(tasksSolution, mat[numOfTasks][capacity]);
    }

    // ===========================================================================

    public void display()
    {
        if (tasks != null && !tasks.isEmpty())
        {
            System.out.println("Knapsack problem:");
            System.out.println("Capacity = " + capacity);
            System.out.println("Tasks: ");

            for (Task task : tasks)
                System.out.println("- " + task);
        }
    }

    // ===========================================================================
}