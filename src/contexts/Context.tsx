import React, { ReactNode, useEffect, useState, createContext } from "react"
import { useRouter } from "next/router"

interface Team {
    id: number
    name: string
}

export type ContextData = {
    pot: boolean
    setPot: React.Dispatch<React.SetStateAction<boolean>>
    teams: Team[]
    setTeams: React.Dispatch<React.SetStateAction<Team[]>>
    teamsInPots: Team[][]
    setTeamsInPots: React.Dispatch<React.SetStateAction<Team[][]>>
    groupsQtt: number
    setGroupsQtt: React.Dispatch<React.SetStateAction<number>>
    potsQtt: number
    setPotsQtt: React.Dispatch<React.SetStateAction<number>>
    potsQttArray: number[]
    setPotsQttArray: React.Dispatch<React.SetStateAction<number[]>>
    addTeam: (id: number, state: string, potIndex?: number) => void
    deleteTeam: (id: number) => void
    submitDraw: () => void
    shuffleArray: (array: any[]) => any[]
    splitTeamsIntoGroups: (teamsToSplit: any[]) => any[]
    addTeamInPot: (id: number, potIndex: number) => void
    deleteTeamFromPot: (id: number, potIndex: number) => void
    submitDrawWithPots: () => void
    incrementInputValue: (id: string) => void
    decrementInputValue: (id: string) => void
}

export type ContextProviderProps = {
    children: ReactNode
}

export const Context = createContext({} as ContextData)

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const router = useRouter()

    const [pot, setPot] = useState(false)
    const [teams, setTeams] = useState<Team[]>([])
    const [teamsInPots, setTeamsInPots] = useState<Team[][]>([[], []])
    const [groupsQtt, setGroupsQtt] = useState<number>(2)
    const [potsQtt, setPotsQtt] = useState<number>(() => definePotsQtt())
    const [potsQttArray, setPotsQttArray] = useState<number[]>([1, 2])
    const [count, setCount] = useState<number>(1)
    const [potInitialized, setPotInitialized] = useState(false)
    const [potsQttInitialized, setPotsQttInitialized] = useState(false)
    const [countInitialized, setCountInitialized] = useState(false)

    function definePotsQtt() {
        if (typeof window !== 'undefined') {
            let savedTeams = localStorage.getItem("drawTeamsWPots")
            if (savedTeams) {
                savedTeams = JSON.parse(savedTeams)
                return savedTeams!.length
            }
            return 2
        }
        return 2
    }

    useEffect(() => {
        const teamsCount = localStorage.getItem("teamsCount")
        setCount(teamsCount ? +teamsCount : 1)

        let pot = localStorage.getItem("pot")
        if (pot === "true") {
            const withPots = true
            setPot(withPots)
        } else if (pot === "false") {
            const withPots = false
            setPot(withPots)
        }
    }, [])

    useEffect(() => {
        if (potInitialized) {
            localStorage.setItem("pot", pot.toString())
        } else {
            setPotInitialized(true)
        }
    }, [pot])

    useEffect(() => {
        if (countInitialized) {
            localStorage.setItem("teamsCount", count.toString())
        } else {
            setCountInitialized(true)
        }
    }, [count])

    useEffect(() => {
        if (potsQttInitialized) {
            if (potsQttArray.includes(potsQtt)) {
                setPotsQttArray((cs) => cs.slice(0, -1))
                setTeamsInPots((cs) => cs.slice(0, -1))
            } else {
                setPotsQttArray([...potsQttArray, potsQtt])
                setTeamsInPots([...teamsInPots, []])
            }
        } else {
            setPotsQttInitialized(true)
        }
    }, [potsQtt])

    function addTeam(id: number) {
        const newTeam = {
            id,
            name: `Time ${count}`
        }
        setTeams((currentState) => [...currentState, newTeam])
        setCount(count + 1)
    }

    function deleteTeam(id: number) {
        setTeams((currentState) => currentState.filter((el) => el.id != id))
    }

    function submitDraw() {
        if (groupsQtt < 1 || groupsQtt > 32) {
            alert("Defina uma quantidade de grupos entre 1 e 32.")
            return;
        }
        if (teams.some((team) => !team.name || team.name.length > 15)) {
            alert("Preencha todos os nomes de times com, no máximo, 15 caracteres.")
            return;
        }
        if (groupsQtt > teams.length) {
            alert("Não pode haver mais grupos que times.")
            return;
        }
        localStorage.setItem("groupsQtt", String(groupsQtt))
        router.push("/draw")
    }

    function shuffleArray(array: any[]) {
        const shuffledArray = [...array]
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const randomNumber = Math.floor((i + 1) * Math.random())
            const currentItem = shuffledArray[i]
            shuffledArray[i] = shuffledArray[randomNumber]
            shuffledArray[randomNumber] = currentItem
        }
        return shuffledArray
    }

    function splitTeamsIntoGroups(teamsToSplit: any[]) {
        const teamsQtt = teams.length
        const teamsByGroupQtt = Math.floor(teamsQtt / groupsQtt)

        const groupsWTeams: any[] = []

        for (let i = 0; i < groupsQtt; i++) {
            groupsWTeams[i] = []
            for (
                let j = i * teamsByGroupQtt;
                j < (i + 1) * teamsByGroupQtt;
                j++
            ) {
                groupsWTeams[i].push(teamsToSplit[j])
            }
        }

        const teamsLeftQtt = teamsQtt % groupsQtt

        if (teamsLeftQtt === 0) {
            return groupsWTeams
        }

        let j = 0
        for (
            let i = teams.length - teamsLeftQtt;
            i <= teams.length - 1;
            i++
        ) {
            groupsWTeams[j].push(teamsToSplit[i])
            j++
        }

        return groupsWTeams
    }

    function addTeamInPot(id: number, potIndex: number) {
        const newTeam = {
            id,
            name: `Time ${count}`
        }
        setTeamsInPots((currentState) => {
            const updatedPots = [...currentState]
            updatedPots[potIndex] = [...updatedPots[potIndex], newTeam]
            return updatedPots
        })
        setCount(count + 1)
    }

    function deleteTeamFromPot(id: number, potIndex: number) {
        setTeamsInPots((currentState) => {
            const updatedPots = [...currentState]
            updatedPots[potIndex] = updatedPots[potIndex].filter((el) => el.id !== id)
            return updatedPots
        })
    }

    const submitDrawWithPots = () => {
        let allPotsSameSize = true
        const teamsInPotOne = teamsInPots[0].length

        console.log(teamsInPots)

        teamsInPots.forEach(pot => {
            if (pot.length !== teamsInPotOne) {
                allPotsSameSize = false
            }
        })

        if (allPotsSameSize) {
            router.push("/drawWithPots")
        } else {
            alert("Todos os potes devem ter a mesma quantidade de times.")
        }
    }

    function incrementInputValue(id: string){
        const input = document.getElementById(id) as HTMLInputElement
        if(input) input.stepUp()
        switch(id){
            case "potsQtt":
                setPotsQtt(+input.value)
                break
            
            case "groupsQtt":
                setGroupsQtt(+input.value)
                break
        }
    }

    function decrementInputValue(id: string){
        const input = document.getElementById(id) as HTMLInputElement
        if(input) input.stepDown()
            switch(id){
                case "potsQtt":
                    setPotsQtt(+input.value)
                    break
                
                case "groupsQtt":
                    setGroupsQtt(+input.value)
                    break
            }
    }

    return (
        <Context.Provider value={{
            pot,
            setPot,
            teams,
            setTeams,
            teamsInPots,
            setTeamsInPots,
            groupsQtt,
            setGroupsQtt,
            potsQtt,
            setPotsQtt,
            potsQttArray,
            setPotsQttArray,
            addTeam,
            deleteTeam,
            submitDraw,
            shuffleArray,
            splitTeamsIntoGroups,
            addTeamInPot,
            deleteTeamFromPot,
            submitDrawWithPots,
            incrementInputValue,
            decrementInputValue
        }}>
            {children}
        </Context.Provider>
    )
}