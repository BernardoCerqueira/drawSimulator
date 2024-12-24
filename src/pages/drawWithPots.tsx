import { useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import styles from "@/styles/Draw.module.scss"
import RootLayout from "@/components/RootLayout";
import GroupDiv from "@/components/GroupDiv"
import { Context } from "@/contexts/Context";

interface Team {
    id: number
    name: string
}

export default function DrawWithPots() {
    const {
        teamsInPots,
        setTeamsInPots,
        shuffleArray
    } = useContext(Context)

    const groupsQtt = teamsInPots[0].length
    let groupsQttArray = []

    let groups: Team[][] = []

    for(let i = 0; i < groupsQtt; i++){
        groups.push([])
        groupsQttArray.push(i+1)
    }

    useEffect(() => {
        const savedTeams = localStorage.getItem("drawTeamsWPots")
        if(savedTeams) setTeamsInPots(JSON.parse(savedTeams))
        setTeamsInPots((currentState) => {
            const shuffledTeams = currentState.map((pot) => {
                const shuffledPot = shuffleArray(pot)
                return shuffledPot
            })
            return shuffledTeams
        })
    }, [])

    teamsInPots.forEach((pot) => {
        for(let i = 0; i < pot.length; i++){
            groups[i].push(pot[i])
        }
    })

    return (
        <RootLayout>
            <main className={styles.main}>
                <Row className={styles.groupsDiv}>
                    {groupsQttArray.map(i => (
                        <Col sm={12} md={6} lg={4} xl={4} xxl={3} key={i}>
                            <GroupDiv groupNumber={i} groupTeams={groups[i-1]} />
                        </Col>
                    ))}
                </Row>
            </main>
        </RootLayout>
    )
}