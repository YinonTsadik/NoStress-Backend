import { Day } from './services/day'
import { Task, updateDetails, splitTask } from './services/task'
import { Knapsack, solve } from './services/knapsack'
import { Solution } from './services/solution'

// אלגוריתם האופטימיזציה מקבל את רשימת הימים
// אותה נמקסם ואת רשימת המטלות הכללית
const optimization = (allDays: Day[], allTasks: Task[]): void => {
    // נמקסם כל יום בנפרד
    allDays.forEach((day) => {
        // רשימת המטלות שתכיל את כל המטלות בהתאם לכמות השעות הפנויות שיש לנו באותו יום
        let options: Task[] = new Array()
        // נקרא למספר השעות הפנויות איקס
        const x = day.availableHours

        // נעבור על רשימת המטלות הכללית
        allTasks.forEach((task) => {
            if (!task.scheduled) {
                // אם אורך המטלה קצר או שווה לכמות השעות ביום נכניס אותה כמו שהיא
                if (task.hours <= x) {
                    const tempTask = { ...task }
                    updateDetails(tempTask, day.date)

                    options.push(tempTask)
                } else {
                    // אם המטלה גדולה מדי ניקח את המטלה עם מספר השעות המתאים
                    const tempTask = { ...task }
                    updateDetails(tempTask, day.date)

                    options.push(splitTask(tempTask, x))
                }
            }
        })

        // כעת ניצור תרמיל גב עם המערך המותאם שיש לנו
        const dayKnapsack: Knapsack = {
            tasks: options,
            capacity: x,
        }

        // נפתור את תרמיל הגב
        const daySolution: Solution = solve(dayKnapsack)

        // ניקח את המטלות מהפתרון ונשבץ בלוז של היום
        day.schedule = [...daySolution.tasks]
        // נעדכן את כמות השעות שנשארה לנו באותו יום בהתאם לפתרון
        day.availableHours -= daySolution.hours
        // נעדכן את הערך הכולל של היום לערך שחזר מהפתרון
        day.totalValue = daySolution.value

        // אנחנו רוצים לעבור על כל מטלה שקיבלנו מהפתרון
        // ולבצע שינויים במופע שלה ברשימת המטלות הכללית
        for (let i = 0; i < daySolution.tasks.length; i++) {
            let solutionTask = daySolution.tasks[i]
            for (let j = 0; j < allTasks.length; j++) {
                // אם הגעתי למופע מטלת הפתרון ברשימת המטלות הכללית אבצע שינויים
                if (allTasks[j].id === solutionTask.id) {
                    let originalTask = allTasks[j]
                    // אם המטלה הייתה קצרה ולקחתי את כולה
                    // אמחק לגמרי את המופע שלה מהרשימה
                    if (originalTask.hours <= x) {
                        originalTask.scheduled = true
                    } else {
                        /* אם המטלה הייתה ארוכה ולקחתי רק חלק ממנה
                         אחליף את המופע שלה במופע של המטלה שנשארה
                         כלומר עדכון השעות והניקוד בהתאם
                         לכמה לקחתי מתוך המטלה */
                        allTasks.splice(
                            j,
                            1,
                            splitTask(originalTask, originalTask.hours - x)
                        )
                    }
                    // אם סיימתי לעדכן אעבור למטלת הפתרון הבאה
                    break
                }
            }
        }
    })
}

export default optimization
