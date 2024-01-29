export function generateRandomId(length: number = 6): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function arrayDiff<T>(arr1: T[], arr2: T[]): T | undefined {
  for (const x of arr1) {
    if (!arr2.includes(x)) {
      return x;
    }
  }
}

type Params = {
  background: string;
  noiseType: string;
  baseFrequency: number;
  opacity: number;
};
export function generateCode(params: Params) {
  const { background, baseFrequency, noiseType, opacity } = params;
  return `<div style="position:absolute;width:100%;height:100%;z-index:0;pointer-events:none;background:${background}">
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <filter id="n" x="0" y="0">
      <feTurbulence
        type="${noiseType}"
        baseFrequency="${baseFrequency}"
        stitchTiles="stitch"
      />
    </filter>
    <rect
      width="100%"
      height="100%"
      filter="url(#n)"
      opacity="${opacity}"
    />
  </svg>
</div>
`;
}
