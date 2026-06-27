import { useMemo, type CSSProperties } from 'react';

type CometConfig = {
  id: number;
  spawnLeft: number;
  delaySeconds: number;
  durationSeconds: number;
  tailLengthPx: number;
  entryOffsetVw: number;
};

const COMET_COUNT = 10;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function CometConfigs(count: number): CometConfig[] {
  return Array.from({ length: count }, (_, id) => {
    const slot = (id + Math.random() * 0.5) / count;

    return {
      id,
      spawnLeft: slot * 100,
      delaySeconds: id === 0 ? 0 : randomBetween(0.5, 5),
      durationSeconds: randomBetween(2, 7),
      tailLengthPx: randomBetween(180, 400),
      entryOffsetVw: randomBetween(5, 30),
    };
  });
}

export const Comets = () => {
  const comets = useMemo(() => CometConfigs(COMET_COUNT), []);

  return (
    <div className="comet-stage" aria-hidden="true">
      {comets.map((comet) => (
        <span
          key={comet.id}
          className="comet"
          aria-hidden="true"
          style={
            {
              '--spawn-left': `${comet.spawnLeft}%`,
              '--entry-offset': `${comet.entryOffsetVw}vw`,
              '--delay': `${comet.delaySeconds}s`,
              '--duration': `${comet.durationSeconds}s`,
              '--tail-length': `${comet.tailLengthPx}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
};
