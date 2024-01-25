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
          key={color + i}
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
  id: number;
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

function Colors(props: {
  colors: string[];
  setColors: Dispatch<SetStateAction<string[]>>;
}) {
  const { colors, setColors } = props;
  const [items, setItems] = useState(colors.map((_, i) => i + 1));

  useEffect(() => {
    if (colors.length > items.length) {
      setItems((prevItems) => {
        return [...prevItems, prevItems.length + 1];
      });
    }
  }, [colors, items]);

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
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem
              id={item}
              onChange={(color) => {
                setColors((prev) => {
                  let next = [...prev];
                  next[item - 1] = color;
                  return next;
                });
              }}
              key={item}
              color={colors[item - 1]}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        const next = arrayMove(items, oldIndex, newIndex);
        setColors(() => {
          return next.map((i) => colors[i - 1]);
        });
        return next;
      });
    }
  }
}

export const NoiseParameters = () => {
  const [colors, setColors] = useState(["#333"]);
  const [colorStops, setColorStops] = useState([100]);
  const [radii, setRadii] = useState(145);

  useEffect(() => {
    setColorStops(() => {
      if (colors.length === 1) return [100];
      if (colors.length === 2) return [0, 100];
      const biggestColorStop = Math.max(...colorStops);
      const next = Math.min(100, biggestColorStop + 10);
      return [...colorStops, next];
    });
  }, [colors]);

  console.log(colors);

  let bg = (_: number) => "";

  if (colors.length === 1) {
    bg = (_deg: number) => colors[0];
  } else {
    bg = (deg) =>
      `linear-gradient(${deg}deg, ${colors
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
            <span>Background</span>
            <div className="flex flex-col gap-4">
              <div>
                <Colors colors={colors} setColors={setColors} />
                <button
                  onClick={() => {
                    setColors((prev) => [...prev, "#1e1e1e"]);
                  }}
                >
                  Add
                </button>
              </div>
              <div>
                <RangeSlider
                  colors={colors}
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
