import { useContext, useEffect, useState } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import { FaPlus } from "react-icons/fa6"
import { Button } from "reactstrap"
import { ScrollArea } from "@radix-ui/themes"
import { v4 } from "uuid"
import styles from "@/styles/PotDiv.module.scss"
import { Context } from "@/contexts/Context"

export default function PotDiv({ title, potIndex }) {
    const {
        teamsInPots,
        setTeamsInPots,
        addTeamInPot,
        deleteTeamFromPot
    } = useContext(Context)

    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        if (initialized) {
            localStorage.setItem("drawTeamsWPots", JSON.stringify(teamsInPots))
        } else {
            setInitialized(true)
        }
    }, [teamsInPots])

    return (
        <main className={styles.main}>
            <ScrollArea scrollbars="vertical" className={styles.potDiv}>
                <h4>{title}</h4>
                {teamsInPots[potIndex].map((team, pos) => (
                    <div className={styles.teamCard} key={team.id}>
                        <input
                            type="text"
                            name="teamName"
                            value={team.name}
                            onChange={(ev) => {
                                setTeamsInPots((currentState) => {
                                    const updatedState = [...currentState]
                                    updatedState[potIndex][pos] = { ...team, name: ev.currentTarget.value }
                                    return updatedState
                                })
                            }}
                        />
                        <button
                            className={styles.trashBtn}
                            onClick={() => {
                                deleteTeamFromPot(team.id, potIndex)
                            }}
                        >
                            <FaRegTrashAlt />
                        </button>
                    </div>
                ))}

                <div>
                    <Button
                        className={styles.addTeamButton}
                        color="primary"
                        onClick={() => {
                            addTeamInPot(v4(), potIndex)
                        }}
                    >
                        <FaPlus /> Adicionar time
                    </Button>
                </div>
            </ScrollArea>
        </main>
    )
}