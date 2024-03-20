import { useEffect } from 'react'

interface LogData {
    feature: 'CropRecommendation' | 'PlantTimeRecommendation';
    status: 'success' | 'unsupported' | 'error';
}

export function useLogEvent(logData: LogData, dependencies: any[] = []) {
    useEffect(() => {
        fetch('/api/logEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logData),
        })
    }, dependencies)
}