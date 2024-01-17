const CircularTactileButton = () => {
  return (
    <div
      className={[
        "w-screen h-screen flex justify-center items-center",
        "bg-gradient-to-br from-stone-100 via-90% via-stone-500 to-stone-600",
      ].join(" ")}
    >
      <div className="size-64 bg-gradient-to-br from-stone-700 to-stone-50 rounded-full p-4">
        <div className="w-full h-full bg-stone-950 rounded-full p-1">
          <button
            className={[
              "group w-full h-full bg-gradient-to-br from-stone-50 via-stone-500 to-stone-50 rounded-full p-1",
              "active:from-stone-300 active:via-stone-600 active:to-stone-300",
            ].join(" ")}
          >
            <div className="bg-white w-full h-full rounded-full">
              <div className="bg-neutral-900/30 group-active:bg-neutral-900/35 w-full h-full rounded-full"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CircularTactileButton;
