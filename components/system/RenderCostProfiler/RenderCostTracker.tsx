import {
  Profiler,
  type ProfilerOnRenderCallback,
  type ReactNode,
  useEffect,
  useRef,
} from "react";

export type RenderPhase = "mount" | "update" | "nested-update";

export type RenderSample = {
  actual: number;
  base: number;
  capturedAt: number;
  commitTime: number;
  id: string;
  phase: RenderPhase;
  startTime: number;
};

export type RenderCostTrackerProps = {
  children: ReactNode;
  enabled?: boolean;
  id: string;
  onSample?: (sample: RenderSample) => void;
  thresholdMs?: number;
};

const SAMPLE_BUFFER_LIMIT = 2000;

const sampleBuffer: RenderSample[] = [];

export const getRenderCostSamples = (): readonly RenderSample[] => sampleBuffer;

export const clearRenderCostSamples = (): void => {
  sampleBuffer.length = 0;
};

const formatSample = (sample: RenderSample): string => {
  const date = new Date(
    Math.round(performance.timeOrigin + sample.commitTime)
  ).toISOString();
  const relative = (sample.commitTime - sample.startTime).toFixed(1);

  return `[render ${date}] ${sample.id} ${sample.phase} Δ=${sample.actual.toFixed(
    1
  )}ms base=${sample.base.toFixed(1)}ms (Δcommits=${relative}ms)`;
};

const writeSample = (sample: RenderSample): void => {
  if (sampleBuffer.length >= SAMPLE_BUFFER_LIMIT) {
    sampleBuffer.shift();
  }
  sampleBuffer.push(sample);

  console.info(formatSample(sample));
  console.info(JSON.stringify(sample));
};

const RenderCostTracker = ({
  id,
  children,
  thresholdMs = 5,
  enabled = true,
  onSample,
}: RenderCostTrackerProps): React.ReactElement => {
  const onSampleRef = useRef(onSample);

  useEffect(() => {
    onSampleRef.current = onSample;
  }, [onSample]);

  useEffect((): (() => void) | void => {
    if (!enabled || typeof window === "undefined") return undefined;

    const handleKey = (event: KeyboardEvent): void => {
      if (
        !event.altKey ||
        !event.shiftKey ||
        event.code !== "KeyP" ||
        event.repeat
      ) {
        return;
      }

      const recent = sampleBuffer.slice(-50);

      console.info(
        `[render-cost] ${recent.length} recent samples (showing last 50):`
      );
      recent.forEach((sample) => {
        console.info(formatSample(sample));
      });
    };

    window.addEventListener("keydown", handleKey);
    return (): void => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [enabled]);

  if (!enabled) return children as React.ReactElement;

  const handleRender: ProfilerOnRenderCallback = (
    renderId,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    if (actualDuration < thresholdMs) return;

    const sample: RenderSample = {
      actual: actualDuration,
      base: baseDuration,
      capturedAt: performance.now(),
      commitTime,
      id: renderId,
      phase: phase as RenderPhase,
      startTime,
    };

    writeSample(sample);
    onSampleRef.current?.(sample);
  };

  return (
    <Profiler id={id} onRender={handleRender}>
      {children}
    </Profiler>
  );
};

export default RenderCostTracker;
