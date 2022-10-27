import { Period } from "./period";

enum constraintType
{
    Studies,
    Test,
    Work,
    Event,
    Rest,
    Other
}

interface Constraint extends Period {
    type: constraintType
}

export { Constraint };