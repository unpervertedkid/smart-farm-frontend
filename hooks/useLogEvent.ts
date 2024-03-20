// hooks/useLogEvent.ts
import { useCallback } from 'react'

interface LogData {
    feature: 'CropRecommendation' | 'PlantTimeRecommendation';
    status: 'success' | 'unsupported' | 'error';
}

export function useLogEvent(feature: LogData['feature']) {
    return useCallback((status: LogData['status']) => {
        fetch('/api/logEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ feature, status }),
        })
    }, [feature])
}