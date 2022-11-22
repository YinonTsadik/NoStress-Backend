import { Day } from './services/day'
import { Task, splitTask } from './services/task'
import { Knapsack, solve } from './services/knapsack'
import { Solution } from './services/solution'

const optimization = (allDays: Day[], allTasks: Task[]): void => {
    allDays.forEach((day) => {
        let options: Task[] = new Array()
        const x = day.availableHours

        allTasks.forEach((task) => {
            if (task.hours <= x) {
                options.push(task)
            } else {
                options.push(splitTask(task, x))
            }
        })

        const dayKnapsack: Knapsack = {
            tasks: options,
            capacity: x,
        }

        const daySolution: Solution = solve(dayKnapsack)

        day.schedule = [...daySolution.tasks]
        day.totalValue = daySolution.value
        daySolution.tasks.forEach((task) => (day.availableHours -= task.hours))

        for (let i = 0; i < daySolution.tasks.length; i++) {
            let solutionTask = daySolution.tasks[i]
            for (let j = 0; j < allTasks.length; j++) {
                if (allTasks[j].id === solutionTask.id) {
                    let originalTask = allTasks[j]
                    if (originalTask.hours <= x) {
                        allTasks.splice(j, 1)
                    } else {
                        allTasks.splice(
                            j,
                            1,
                            splitTask(originalTask, originalTask.hours - x)
                        )
                    }
                    break
                }
            }
        }
    })
}

export { optimization }
