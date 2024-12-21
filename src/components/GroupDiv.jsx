import { ScrollArea } from "@radix-ui/themes/dist/cjs/index.js"
import styles from "@/styles/GroupDiv.module.scss"

export default function GroupDiv({ groupNumber, groupTeams }) {
    return (
        <>
            <div className={styles.groupDiv}>
                <h3 className={styles.h3}>Grupo {groupNumber}</h3>
                <hr />
                <ScrollArea scrollbars="vertical" className={styles.teamsNames}>
                    {groupTeams.map(team => (
                        <div className={styles.teamName} key={team.id}>
                            {team.name}
                        </div>
                    ))}
                </ScrollArea>
            </div>
        </>
    )
}