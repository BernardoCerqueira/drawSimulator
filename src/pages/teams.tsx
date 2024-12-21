import { useContext, useEffect } from "react"
import { Button, Col, Input, Label, Row } from "reactstrap"
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
        potsQttArray,
        setPotsQttArray,
        setTeamsInPots,
        incrementInputValue,
        decrementInputValue
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
                        <div className={styles.buttonsDiv}>
                            <Input
                                type="number"
                                min={2}
                                max={32}
                                name="potsQtt"
                                id="potsQtt"
                                value={potsQtt}
                                onKeyDown={(ev) => ev.preventDefault()}
                            />
                            <Button
                                color="success"
                                onClick={() => incrementInputValue("potsQtt")}
                            >+</Button>
                            <Button
                                color="danger"
                                onClick={() => decrementInputValue("potsQtt")}
                            >-</Button>
                        </div>
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
                        <div className={styles.buttonsDiv}>
                            <Input
                                type="number"
                                min={1}
                                max={32}
                                name="groupsQtt"
                                id="groupsQtt"
                                value={groupsQtt}
                                onKeyDown={(ev) => ev.preventDefault()}
                            />
                            <Button
                                color="success"
                                onClick={() => incrementInputValue("groupsQtt")}
                            >+</Button>
                            <Button
                                color="danger"
                                onClick={() => decrementInputValue("groupsQtt")}
                            >-</Button>
                        </div>
                    </div>
                    <TeamsDiv title={"LISTA DE TIMES"} />
                    <DrawButton pots={false}/>
                </section>
            }
        </RootLayout>
    )
}