interface Props {
  type?: "fractalNoise" | "turbulence";
  stitchTiles?: "stitch" | "noStitch";
  baseFrequency?: number;
  opacity?: number;
}

export const BgNoise = ({
  type = "fractalNoise",
  baseFrequency = 1,
  stitchTiles = "stitch",
  opacity = 0.5,
}: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <filter id="n" x="0" y="0">
        <feTurbulence
          type={type}
          baseFrequency={baseFrequency}
          stitchTiles={stitchTiles}
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#n)" opacity={opacity} />
    </svg>
  );
};
