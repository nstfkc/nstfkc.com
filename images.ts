async function fetchImages(idx = 20) {
  await fetch(
    `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${idx}.jpg`
  )
    .then((res) => res.blob())
    .then(async (blob) => {
      await Bun.write(`public/avatar/${idx}.jpg`, blob);
      console.log("saved avatar", idx);
      if (idx < 100) {
        await fetchImages(idx + 1);
      }
    });
}

await fetchImages();
