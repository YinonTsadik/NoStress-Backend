interface Period {
    readonly id: number,
    description: string,
    startTime: Date,
    endTime: Date,
    hours: number
}

const updateHours = (period: Period): void => {
    const diff: number = period.endTime.getTime() - period.startTime.getTime();
    period.hours = (diff / 1000 / 60 / 60);
}

const printPeriod = (period: Period): void => {

    console.log("ID: " + period.id)
    console.log("Description: " + period.description)
    console.log("Start Time: " + period.startTime)
    console.log("End Time: " + period.endTime)
    console.log("Duration: " + period.hours + " Hours")
}

export { Period, updateHours, printPeriod }