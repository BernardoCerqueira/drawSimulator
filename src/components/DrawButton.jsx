import { useContext } from "react"
import { Button } from "reactstrap"
import { Context } from "@/contexts/Context"

export function DrawButton({pots}) {
    const {submitDraw, submitDrawWithPots} = useContext(Context)

    return (
        <Button
            color="success"
            onClick={pots ? submitDrawWithPots : submitDraw}
        >
            Sortear!
        </Button>
    )
}