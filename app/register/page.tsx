const Register = () => {
  return (
    <div className="w-screen h-screen bg-teal-950 p-16">
      <div
        style={{ perspective: "1200px" }}
        className="w-full h-full bg-teal-800 rounded-2xl relative overflow-hidden"
      >
        <div
          style={{ transform: "rotateY(-45deg) rotateZ(-26deg)" }}
          className={[
            "absolute h-[50px] w-[200%] left-[-80%] top-[300px] w-full bg-red-100",
            "bg-gradient-to-bl from-teal-400 via-teal-600 to-teal-800 opacity-50",
          ].join(" ")}
        ></div>

        <div
          style={{ transform: "rotateY(-45deg) rotateZ(-26deg)" }}
          className={[
            "absolute h-[30px] w-[200%] left-[-100%] top-[300px] w-full bg-red-100",
            "bg-gradient-to-bl from-teal-400 via-teal-600 to-teal-800 opacity-25",
          ].join(" ")}
        ></div>

        <div
          style={{ transform: "rotateY(-45deg) rotateZ(-26deg)" }}
          className={[
            "absolute h-[100px] w-[200%] left-[-60%] top-[300px] w-full bg-red-100",
            "bg-gradient-to-bl from-teal-400 via-teal-600 to-teal-800",
          ].join(" ")}
        >
          <div className="flex w-full h-full justify-end">
            <div className="w-[30%] h-[100%] rounded-full bg-gradient-to-l from-teal-100 to-transparent"></div>
          </div>
        </div>

        <div
          style={{ transform: "rotateY(-45deg) rotateZ(-26deg)" }}
          className={[
            "absolute h-[50px] w-[200%] left-[-30%] top-[300px] w-full bg-red-100",
            "bg-gradient-to-bl from-teal-400 via-teal-600 to-teal-800",
          ].join(" ")}
        ></div>

        <div
          style={{ transform: "rotateY(-45deg) rotateZ(-26deg)" }}
          className={[
            "absolute h-[50px] w-[200%] left-[10%] top-[300px] w-full bg-red-100",
            "bg-gradient-to-bl from-teal-400 via-teal-600 to-teal-800",
          ].join(" ")}
        ></div>

        <div className="absolute w-full h-full backdrop-blur-[24px]"></div>
      </div>
    </div>
  );
};

export default Register;
