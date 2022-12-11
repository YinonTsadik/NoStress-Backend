import Day from './modules/Day'
import Task from './modules/Task'
import Knapsack from './modules/Knapsack'
import Solution from './modules/Solution'

export default function optimization(allDays: Day[], allTasks: Task[]): void {
    allDays.forEach((day) => {
        const options: Task[] = new Array<Task>()
        const x = day.availableHours

        allTasks.forEach((task) => {
            if (!task.getScheduled) {
                const tempTask: Task = new Task(
                    task.getDescription,
                    task.getDeadline,
                    task.getHours
                )
                tempTask.updateDetails(day.date)

                if (task.getHours <= x) {
                    options.push(tempTask)
                } else {
                    options.push(tempTask.splitTask(x))
                }
            }
        })

        const dayKnapsack: Knapsack = new Knapsack(options, x)
        const daySolution: Solution = dayKnapsack.solve()

        day.schedule = [...daySolution.getTasks]
        day.availableHours -= daySolution.getHours
        day.totalValue = daySolution.getValue

        for (let i = 0; i < daySolution.getTasks.length; i++) {
            let solutionTask = daySolution.getTasks[i]
            for (let j = 0; j < allTasks.length; j++) {
                if (allTasks[j].id === solutionTask.id) {
                    let originalTask = allTasks[j]
                    if (originalTask.getHours <= x) {
                        originalTask.setScheduled = true
                    } else {
                        allTasks.splice(
                            j,
                            1,
                            originalTask.splitTask(originalTask.getHours - x)
                        )
                    }
                    break
                }
            }
        }
    })
}
