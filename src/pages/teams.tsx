import { useContext, useEffect } from "react"
import { Col, Input, Label, Row } from "reactstrap"
import styles from "@/styles/Teams.module.scss"
import RootLayout from "@/components/RootLayout"
import { DrawButton } from "@/components/DrawButton"
import TeamsDiv from "@/components/TeamsDiv"
import PotDiv from "@/components/PotDiv"
import { Context } from "@/contexts/Context"

export default function Teams() {
    const {
        pot,
        groupsQtt,
        setGroupsQtt,
        potsQtt,
        setPotsQtt,
        potsQttArray,
        setPotsQttArray,
        setTeamsInPots,
    } = useContext(Context)

    useEffect(() => {
        const savedGroupsQtt = localStorage.getItem("groupsQtt")
        if (savedGroupsQtt) setGroupsQtt(JSON.parse(savedGroupsQtt))

        const savedTeams = localStorage.getItem("drawTeamsWPots")
        if(savedTeams){
            const teamsArray: {}[] = JSON.parse(savedTeams)
            const potsQttArray: number[] = []

            teamsArray.map((team, index) => {
                potsQttArray.push(index + 1)
            })

            setPotsQttArray(potsQttArray)
            setTeamsInPots(savedTeams ? JSON.parse(savedTeams) : [[],[]])
        }
    }, [])

    return (
        <RootLayout>
            {pot ?
                <section className={styles.potMain}>
                    <div className={styles.inputDiv}>
                        <Label htmlFor="potsQtt">Quantos potes serão?</Label>
                        <Input
                            type="number"
                            min={2}
                            max={32}
                            name="potsQtt"
                            value={potsQtt}
                            onChange={(ev) => setPotsQtt(+ev.target.value)}
                            onKeyDown={(ev) => ev.preventDefault()}
                        />
                    </div>
                    <Row className={styles.row}>
                        {
                            potsQttArray.map((e) => (
                                <Col key={e} sm={12} md={6} lg={4} xl={4} xxl={3}>
                                    <PotDiv title={`Pote ${e}`} potIndex={e-1}/>
                                </Col>
                            ))
                        }
                    </Row>
                    <DrawButton pots={true}/>
                </section>
                :
                <section className={styles.noPotMain}>
                    <div className={styles.inputDiv}>
                        <Label htmlFor="groupsQtt">Quantos grupos serão?</Label>
                        <Input
                            type="number"
                            min={1}
                            max={32}
                            name="groupsQtt"
                            value={groupsQtt}
                            onChange={(ev) => setGroupsQtt(+ev.target.value)}
                        />
                    </div>
                    <TeamsDiv title={"LISTA DE TIMES"} />
                    <DrawButton pots={false}/>
                </section>
            }
        </RootLayout>
    )
}