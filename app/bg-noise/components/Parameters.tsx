"use client";

import { BgNoise } from "@/components/BgNoise";
import { ComponentProps, useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ColorStore, useColorStore, useColorStoreState } from "./ColorStore";
import { LuX } from "react-icons/lu";

const RangeSlider = (props: {
  colorStore: ColorStore;
  trackBackground?: string;
}) => {
  const { colorStore, trackBackground } = props;
  const colorStops = useColorStoreState(colorStore, "colorStops");
  const colorCodes = useColorStoreState(colorStore, "colorCodes");
  const order = useColorStoreState(colorStore, "order");

  return (
    <Slider.Root
      className="relative flex items-center select-none touch-none h-5"
      value={order.map((id) => colorStops[id])}
      onValueChange={(nextValue) => {
        colorStore.updateColorStops(nextValue);
      }}
      min={0}
      max={100}
      step={1}
      minStepsBetweenThumbs={5}
    >
      <Slider.Track
        style={{ background: trackBackground }}
        className="w-full relative grow h-6 rounded-md"
      >
        <Slider.Range className="absolute h-full" />
      </Slider.Track>
      {order.map((id, idx) => (
        <Slider.Thumb
          key={`thumb-${id}-${idx}`}
          style={{ background: colorCodes[id] }}
          className="group relative w-4 border h-8 border-2 border-white/20 rounded-full block outline-none"
        ></Slider.Thumb>
      ))}
    </Slider.Root>
  );
};

const RadiiSlider = (props: ComponentProps<typeof Slider.Root>) => {
  return (
    <Slider.Root
      className="relative flex items-center select-none touch-none h-6 rounded-md bg-white/10"
      {...props}
    >
      <Slider.Track className="w-full relative grow h-8">
        <Slider.Range className="absolute h-full" />
      </Slider.Track>

      <Slider.Thumb className="w-4 border h-8 border-2 border-white/20 rounded-full block"></Slider.Thumb>
    </Slider.Root>
  );
};

const Container = (props: ComponentProps<"div">) => {
  return (
    <div className="bg-white/10 w-[320px] rounded-xl p-4" {...props}></div>
  );
};

export function SortableItem(props: {
  color: string;
  onChange: (color: string) => void;
  handleRemoveColor: () => void;
  showRemoveButton?: boolean;
  id: string;
}) {
  const { color, onChange, handleRemoveColor, showRemoveButton = true } = props;
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="relative group">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        aria-describedby={`item-${props.id}`}
      >
        <div
          className="group"
          style={{ background: color, position: "relative" }}
        >
          <input
            className="opacity-0 bg-transparent border border-white/20 rounded-md px-1 py-[2px] h-12"
            type="color"
            onChange={(e) => onChange(e.target.value)}
            value={color}
          />
        </div>
      </div>
      {!active && showRemoveButton && (
        <button
          onClick={(event) => {
            event.preventDefault();
            handleRemoveColor();
          }}
          className="absolute invisible group-hover:visible right-[-6px] top-[-6px] z-[100] rounded-full p-[1px] bg-white/80 shadow-sm"
        >
          <LuX />
        </button>
      )}
    </div>
  );
}

function Colors(props: {
  colorStore: ColorStore;
  handleAddColor: VoidFunction;
}) {
  const { colorStore, handleAddColor } = props;
  const order = useColorStoreState(props.colorStore, "order");
  const colorCodes = useColorStoreState(props.colorStore, "colorCodes");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="flex gap-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={order} strategy={horizontalListSortingStrategy}>
          {order.map((item) => (
            <SortableItem
              id={item}
              showRemoveButton={order.length > 1}
              handleRemoveColor={() => {
                colorStore.removeColor(item);
              }}
              onChange={(color) => {
                colorStore.updateColorCode(item, color);
              }}
              key={item}
              color={colorCodes[item]}
            ></SortableItem>
          ))}
        </SortableContext>
      </DndContext>
      <button onClick={handleAddColor}>Add</button>
    </div>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      colorStore.updateOrder(active.id, over.id);
    }
  }
}

export const NoiseParameters = () => {
  const [radii, setRadii] = useState(145);
  const [ready, setReady] = useState(false);

  const colorStore = useColorStore();
  const colorCodes = useColorStoreState(colorStore, "colorCodes");
  const colorStops = useColorStoreState(colorStore, "colorStops");
  const order = useColorStoreState(colorStore, "order");

  let bg = (_deg: number) => colorCodes[order[0]];
  if (order.length > 1) {
    bg = (deg: number) =>
      `linear-gradient(${deg}deg, ${order
        .map((id) => `${colorCodes[id]} ${colorStops[id]}%`)
        .join(", ")})`;
  }

  useEffect(() => {
    if (!ready) {
      setReady(true);
    }
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <div
      style={{
        background: bg(radii),
      }}
      className="w-full h-full p-8"
    >
      <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-md border border-slate-950/10">
        <div className="absolute z-0 pointer-events-none w-full h-full">
          <BgNoise baseFrequency={1} opacity={0.4} type="fractalNoise" />
        </div>
        <div className="w-full h-full relative z-10 flex items-center justify-center">
          <Container>
            <span>Background</span>
            <div className="flex flex-col gap-4">
              <div>
                <Colors
                  colorStore={colorStore}
                  handleAddColor={() => colorStore.addColor("#333021")}
                />
              </div>
              {order.length > 1 && (
                <div>
                  <div>Color stops</div>
                  <RangeSlider
                    colorStore={colorStore}
                    trackBackground={bg(90)}
                  />
                </div>
              )}
              {order.length > 1 && (
                <div>
                  <div>Angle</div>
                  <RadiiSlider
                    value={[radii]}
                    onValueChange={([radii]) => setRadii(radii)}
                    min={0}
                    max={360}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
