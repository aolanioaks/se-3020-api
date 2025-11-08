import { useEffect, useRef } from "react";
import { Accelerometer } from "expo-sensors";


export default function useShake(onShake: () => void, options?: { threshold?: number; intervalMs?: number }) {
    const { threshold = 1.7, intervalMs = 800 } = options || {};
    const last = useRef(0);


    useEffect(() => {
        let sub: any;
        Accelerometer.setUpdateInterval(50);
        (async () => {
            sub = Accelerometer.addListener(({ x, y, z }) => {
                const magnitude = Math.sqrt(x * x + y * y + z * z);
                const now = Date.now();
                if (magnitude > threshold && now - last.current > intervalMs) {
                last.current = now;
                onShake();
                }
});
})();


return () => {
    if (sub) sub.remove();
};
}, [onShake, threshold, intervalMs]);
}