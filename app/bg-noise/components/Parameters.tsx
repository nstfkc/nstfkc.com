"use client";

import { BgNoise } from "@/components/BgNoise";
import {
  ComponentProps,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ColorStore, useColorStore, useColorStoreState } from "./ColorStore";

const RangeSlider = (props: {
  colorStore: ColorStore;
  trackBackground?: string;
}) => {
  const { colorStore, trackBackground } = props;
  const colorStops = useColorStoreState(colorStore, "colorStops");
  const colorCodes = useColorStoreState(colorStore, "colorCodes");
  const order = useColorStoreState(colorStore, "order");

  console.log(colorCodes);
  console.log(order);
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
        <Slider.Thumb key={`thumb-${id}-${idx}`} asChild>
          <span style={{ zIndex: 100 - idx * 10 }}>
            <span
              style={{ background: colorCodes[id] }}
              className="w-4 border h-8 border-2 border-white/20 rounded-full block"
            >
              {id.replace("color-", "")}
            </span>
          </span>
        </Slider.Thumb>
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
  id: string;
}) {
  const { color, onChange } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      aria-describedby={`item-${props.id}`}
    >
      <div style={{ background: color }}>
        <input
          className="opacity-0 bg-transparent border border-white/20 rounded-md px-1 py-[2px] h-12"
          type="color"
          onChange={(e) => onChange(e.target.value)}
          value={color}
        />
      </div>
    </div>
  );
}

function Colors(props: { colorStore: ColorStore }) {
  const { colorStore } = props;
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
              onChange={(color) => {
                colorStore.updateColorCode(item, color);
              }}
              key={item}
              color={colorCodes[item]}
            />
          ))}
        </SortableContext>
      </DndContext>
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

  const colorStore = useColorStore();
  const colorCodes = useColorStoreState(colorStore, "colorCodes");
  const colorStops = useColorStoreState(colorStore, "colorStops");
  const order = useColorStoreState(colorStore, "order");

  const bg = (deg: number) =>
    `linear-gradient(${deg}deg, ${order
      .map((id) => `${colorCodes[id]} ${colorStops[id]}%`)
      .join(", ")})`;

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
                <Colors colorStore={colorStore} />
                <button
                  onClick={() => {
                    colorStore.addColor("#333");
                  }}
                >
                  Add
                </button>
              </div>
              <div>
                <RangeSlider colorStore={colorStore} trackBackground={bg(90)} />
              </div>
              <div>
                <RadiiSlider
                  value={[radii]}
                  onValueChange={([radii]) => setRadii(radii)}
                  min={0}
                  max={360}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
