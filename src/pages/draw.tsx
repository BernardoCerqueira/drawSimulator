import { useContext, useEffect } from "react";
import { Col, Row } from "reactstrap";
import styles from "@/styles/Draw.module.scss"
import RootLayout from "@/components/RootLayout";
import GroupDiv from "@/components/GroupDiv"
import { Context } from "@/contexts/Context";

export default function Draw() {
    const {
        teams,
        setTeams,
        groupsQtt,
        shuffleArray,
        splitTeamsIntoGroups,
    } = useContext(Context)

    useEffect(() => {
        setTeams(shuffleArray(teams))
    }, [])

    const groups = splitTeamsIntoGroups(teams)

    const groupsDiv = []
    if(groupsQtt){
        for(let i = 1; i <= +groupsQtt; i++){
            groupsDiv.push(`${i}`)
        }
    }
    
    return(
        <RootLayout>
            <main className={styles.main}>
                <Row className={styles.groupsDiv}>
                    {groupsDiv.map(i => (
                        <Col sm={12} md={6} lg={4} xl={4} xxl={3} key={i}>
                            <GroupDiv groupNumber={i} groupTeams={groups[+i-1]}/>
                        </Col>
                    ))}
                </Row>
            </main>
        </RootLayout>
    )
}