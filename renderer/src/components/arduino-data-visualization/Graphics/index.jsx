import { PTA } from "./PTA";
import { Velocity } from "./Velocity";
import { Orientation } from "./Orientation/index";
import { Position } from "./Position";
import { Aceleration } from "./Aceleration";

export default function Graphics() {
  return (
    <>
      <div className="w-full gap-2 grid grid-cols-[repeat(12,1fr)] grid-rows-[repeat(2,10rem)_repeat(3,15rem)] md:grid-rows-[10rem_15rem_20rem] lg:grid-rows-[13rem_24rem] font-semibold leading-6 text-slate-500 dark:text-slate-300">
        <div className="relative bg-white dark:bg-slate-800 p-2 w-full h-full rounded-lg col-span-12 md:col-span-6 lg:col-span-4">
          <h2 className="absolute text-sm">Posición</h2>
          <Position />
        </div>
        <div className="relative bg-white dark:bg-slate-800 p-2 w-full h-full rounded-lg col-span-12 md:col-span-6 lg:col-span-4">
          <h2 className="absolute text-sm">Velocidad</h2>
          <Velocity />
        </div>
        <div className="relative bg-white dark:bg-slate-800 p-2 w-full h-full rounded-lg col-span-12 md:col-span-6 lg:col-span-4">
          <h2 className="absolute text-sm">Aceleración</h2>
          <Aceleration />
        </div>
        <div className="relative bg-white dark:bg-slate-800 w-full h-full rounded-lg col-span-12 md:col-span-6 lg:col-span-5">
          <h2 className="absolute text-sm top-2 left-2">Orientación</h2>
          <Orientation />
        </div>
        <div className="relative bg-white dark:bg-slate-800 p-2 w-full h-full rounded-lg col-span-12 md:col-span-12 lg:col-span-7">
          <PTA />
        </div>
      </div>
    </>
  );
}
