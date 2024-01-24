"use client";

import { BgNoise } from "@/components/BgNoise";
import { ComponentProps, Dispatch, SetStateAction, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  useSortable,
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

const RangeSlider = (props: {
  value: number[];
  onChange: (fn: (value: number[]) => number[]) => void;
  trackBackground?: string;
  colors: string[];
}) => {
  const { onChange, value, trackBackground, colors } = props;
  return (
    <Slider.Root
      className="relative flex items-center select-none touch-none h-5"
      value={value}
      onValueChange={(nextValue) =>
        onChange((prevValue) => {
          return nextValue;
        })
      }
      min={0}
      max={100}
    >
      <Slider.Track
        style={{ background: trackBackground }}
        className="w-full relative grow h-6 rounded-md"
      >
        <Slider.Range className="absolute h-full" />
      </Slider.Track>

      {colors.map((color, i) => (
        <Slider.Thumb
          key={color}
          style={{ background: color }}
          className="w-4 border h-8 border-2 border-white/20 rounded-full block"
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

const Color = (props: {
  index: number;
  color: string;
  onChange: (color: string) => void;
}) => {
  const { color, onChange, index } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: `draggable-${index}`,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={{ background: color, ...style }}
      {...listeners}
      {...attributes}
    >
      <input
        className="opacity-0 bg-transparent border border-white/20 rounded-md px-1 py-[2px] h-12"
        type="color"
        onChange={(e) => onChange(e.target.value)}
        value={color}
      />
    </div>
  );
};

export function SortableItem(props: {
  color: string;
  onChange: (color: string) => void;
}) {
  const { color, onChange } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.color });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
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

function Colors(props: {
  colors: string[];
  setColors: Dispatch<SetStateAction<string[]>>;
}) {
  const { colors, setColors } = props;
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
        <SortableContext
          items={colors}
          strategy={horizontalListSortingStrategy}
        >
          {colors.map((color, index) => (
            <SortableItem
              onChange={(color) => {
                setColors((prev) => {
                  let next = [...prev];
                  next[index] = color;
                  return next;
                });
              }}
              key={color}
              color={color}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setColors((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

export const NoiseParameters = () => {
  const [bgColors, setBgColors] = useState(["#333"]);
  const [colorStops, setColorStops] = useState([0, 30, 60]);
  const [radii, setRadii] = useState(145);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  let bg = (_: number) => "";

  if (bgColors.length === 1) {
    bg = (_deg: number) => bgColors[0];
  } else {
    bg = (deg) =>
      `linear-gradient(${deg}deg, ${bgColors
        .map((color, i) => `${color} ${colorStops[i]}%`)
        .join(", ")})`;
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
            <Colors colors={bgColors} setColors={setBgColors} />
            <span>Background</span>
            <div className="flex flex-col gap-4">
              <div className="flex">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                >
                  <SortableContext
                    items={bgColors}
                    strategy={verticalListSortingStrategy}
                  >
                    {bgColors.map((color, i) => (
                      <Color
                        index={i}
                        color={color}
                        onChange={(value) => {
                          setBgColors((prev) => {
                            let next = [...prev];
                            next[i] = value;
                            return next;
                          });
                        }}
                        key={i}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
                <button
                  onClick={() => {
                    setBgColors((prev) => [...prev, "#1e1e1e"]);
                  }}
                >
                  Add
                </button>
              </div>
              <div>
                <RangeSlider
                  colors={bgColors}
                  trackBackground={bg(90)}
                  value={colorStops}
                  onChange={setColorStops}
                />
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
