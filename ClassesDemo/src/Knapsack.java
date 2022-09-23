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

    public void display()
    {
        if (tasks != null && !tasks.isEmpty())
        {
            System.out.println("Knapsack problem");
            System.out.println("Capacity = " + capacity);
            System.out.println("Tasks: ");

            for (Task task : tasks)
                System.out.println("- " + task);
        }
    }

    public Solution solve()
    {
        int NB_TASKS = tasks.size();
        int[][]matrix = new int[NB_TASKS + 1][capacity + 1];

        for (int i = 0; i <= capacity; i++)
            matrix[0][i] = 0;
        
        for (int i = 1; i <= NB_TASKS; i++)
        {
            for (int j = 0; j <= capacity; j++)
            {
                if (tasks.get(i - 1).getHours() > j)
                    matrix[i][j] = matrix[i - 1][j];
                else
                    matrix[i][j] = Math.max(matrix[i - 1][j],
                        matrix[i - 1][j - tasks.get(i - 1).getHours()] + tasks.get(i - 1).getValue());
            }
        }

        int result = matrix[NB_TASKS][capacity];
        int w = capacity;
        ArrayList<Task> tasksSolution = new ArrayList<>();

        for (int i = NB_TASKS; i > 0 && result > 0; i--)
        {
            if (result != matrix[i - 1][w])
            {
                tasksSolution.add(tasks.get(i - 1));
                result -= tasks.get(i - 1).getValue();
                w -= tasks.get(i - 1).getHours();
            }
        }

        return new Solution(tasksSolution, matrix[NB_TASKS][capacity]);
    }
}