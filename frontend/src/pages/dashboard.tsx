import {useSearchParams} from "react-router"

export function Dashboard() {
    const [searchParams] = useSearchParams()
    const location = searchParams.get('location')
    const startsAt = searchParams.get('startsAt')
    const endsAt = searchParams.get('endsAt')

    return (
        'dashboard'
    )
}