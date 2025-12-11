import Image from "next/image";


export default function MythVsReality() {
  return (
    <div className="container pad">
      <p className="color heading text-center font-[800]">Myth vs Reality</p>
      <p className="text-[20px] text-center font-[400]">Discover AllSpark Technologies, a leading website development agency in USA.</p>
      <div className="bg w-[87%]  p-[20px] mt-[40px]  6 relative hidden lg:flex">
        <span className="w-[22%] translate-x-[-20%] translate-y-[-22%] h-auto absolute top-0 left-0 " >
          <Image src={"/circle.png"} alt="circle" unoptimized className="w-[80%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] animate-spin [animation-duration:7s] [animation-duration:7s]" width={200} height={200} />
          <Image src="/myth.png" alt="myth" width={200} height={200} className="w-full" />
        </span>
        <p className="text-white text-[20px] xl:text-[25px] 2xl:text-[35px] w-[80%]  ml-auto">You need months of development and a big agency to get a professional website.</p>
      </div>
      <div className="bg w-[87%] ml-auto  p-[20px] mt-[20px]  relative hidden lg:flex">
        <span className="w-[22%] translate-x-[20%] translate-y-[-22%] h-auto absolute top-0 right-0">
          <Image src={"/circle.png"} alt="circle" unoptimized className="w-[80%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] animate-spin [animation-duration:7s]" width={200} height={200} />
          <Image src="/reality.png" alt="myth" width={200} height={200} className="w-full" />
        </span>
        <p className="text-white text-[20px] xl:text-[25px] 2xl:text-[35px] w-[80%]  mr-auto">You just need a smart partner like AllSpark Technologies who knows what actually converts.</p>
      </div>
      <div className="flex flex-col items-center lg:hidden bg  mt-[50px] sm:mt-[95px]">
        <span className="w-[20%] translate-y-[-50%] absolute">
          <Image src={"/circle.png"} alt="circle" unoptimized className="w-[80%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] animate-spin [animation-duration:7s]" width={200} height={200} />

          <Image src="/myth.png" alt="myth" width={200} height={200} className="w-full" />
        </span>
        <p className="text-white text-[20px] xl:text-[25px] 2xl:text-[35px] w-[80%]  mx-auto text-center pt-[15%] pb-[20px]">You need months of development and a big agency to get a professional website.</p>
      </div>
      <div className="flex flex-col items-center lg:hidden bg  mt-[60px] sm:mt-[120px]">
        <span className="w-[20%] translate-y-[-50%] absolute">
          <Image src={"/circle.png"} alt="circle" unoptimized className="w-[80%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] animate-spin [animation-duration:7s] !duration-300" width={200} height={200} />

          <Image src="/reality.png" alt="myth" width={200} height={200} className="w-full" />
        </span>
        <p className="text-white text-[20px] xl:text-[25px] 2xl:text-[35px] w-[80%]  mx-auto text-center pt-[15%] pb-[20px]">You just need a smart partner like All Spark Tech who knows what actually converts.</p>
      </div>
    </div>
  )
}
