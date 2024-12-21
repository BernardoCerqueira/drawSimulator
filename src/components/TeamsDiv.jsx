import { useContext, useEffect, useState } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import { FaPlus } from "react-icons/fa6"
import { Button } from "reactstrap"
import { ScrollArea } from "@radix-ui/themes"
import { v4 } from "uuid"
import styles from "@/styles/TeamsDiv.module.scss"
import { Context } from "@/contexts/Context"

export default function TeamsDiv({title}) {
    const {
        teams,
        setTeams,
        addTeam,
        deleteTeam
    } = useContext(Context)
    
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        const savedTeams = localStorage.getItem("drawTeams")
        setTeams(savedTeams ? JSON.parse(savedTeams) : [])
    }, [])

    useEffect(() => {
        if (initialized) {
            localStorage.setItem("drawTeams", JSON.stringify(teams))
        } else {
            setInitialized(true)
        }
    }, [teams])

    return (
        <>
            <ScrollArea scrollbars="vertical" className={styles.teamsDiv}>
                <h4>{title}</h4>
                {teams.map((team, index) => (
                    <div className={styles.teamCard} key={team.id}>
                        <input
                            type="text"
                            name="teamName"
                            value={team.name}
                            onChange={(ev) =>
                                setTeams((currentState) =>
                                    currentState.map((team, pos) =>
                                        pos === index ? { ...team, name: ev.target.value } : team
                                    )
                                )
                            }
                        />
                        <button
                            className={styles.trashBtn}
                            onClick={() => deleteTeam(team.id)}
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
                            addTeam(v4())
                        }}
                    >
                        <FaPlus /> Adicionar time
                    </Button>
                </div>
            </ScrollArea>
        </>
    )
}