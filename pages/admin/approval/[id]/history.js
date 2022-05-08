import {useRouter} from 'next/router'

export default function HistoryLog() {
    const router = useRouter();
    return (
        <>
            <p>{`Test page car id for History${router.query.id}`}</p>
        </>
    )
}