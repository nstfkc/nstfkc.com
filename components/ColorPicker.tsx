import { HiMiniEyeDropper, HiPencil } from "react-icons/hi2";
import { ColorPicker } from "@ark-ui/react/color-picker";
import { ComponentProps } from "react";
import * as _RadioGroup from "@radix-ui/react-radio-group";

interface RadioGroupProps extends ComponentProps<typeof _RadioGroup.Root> {
  items: { label: string; value: string }[];
}

const RadioGroup = ({ items, ...props }: RadioGroupProps) => {
  return (
    <_RadioGroup.Root className="flex gap-2" {...props}>
      {items.map((item) => (
        <div className="flex items-center" key={item.value}>
          <_RadioGroup.Item
            className="bg-white/60 size-[16px] rounded-full shadow-[0_2px_10px] shadow-black/40 hover:bg-white/80 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
            value={item.value}
            id={item.value}
          >
            <_RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-black" />
          </_RadioGroup.Item>
          <label
            className="text-white text-[15px] leading-none pl-[15px]"
            htmlFor={item.value}
          >
            {item.label}
          </label>
        </div>
      ))}
      <a href=""></a>
    </_RadioGroup.Root>
  );
};

export const ColorInput = (props: ComponentProps<typeof ColorPicker.Root>) => {
  return (
    <ColorPicker.Root {...props}>
      {(api) => {
        const hueLeft = api.getChannelSliderThumbProps({ channel: "hue" }).style
          ?.left;
        return (
          <>
            <ColorPicker.Control className="w-full h-full overflow-hidden">
              <ColorPicker.Trigger className="w-full h-full">
                <ColorPicker.TransparencyGrid className="" />
                <ColorPicker.Swatch
                  data-dnd-ignore="true"
                  className="w-full h-full flex items-center justify-center"
                  value={api.valueAsString}
                >
                  <HiPencil className="text-sm text-white pointer-events-none" />
                </ColorPicker.Swatch>
              </ColorPicker.Trigger>
            </ColorPicker.Control>
            <ColorPicker.Positioner
              style={{
                background: "rgba(255,255,255,0.8)",
                zIndex: 1000,
                minWidth: "270px",
              }}
              className="bg-white w-[290px] rounded-md overflow-hidden shadow-md backdrop-blur-[4px]"
            >
              <ColorPicker.Content>
                <ColorPicker.Area
                  style={{ border: "none" }}
                  className="w-full aspect-video overflow-hidden"
                >
                  <ColorPicker.AreaBackground className="w-full h-full" />
                  <ColorPicker.AreaThumb className="size-6 border border-black/30 rounded-full bg-white shadow-md" />
                </ColorPicker.Area>
                <ColorPicker.ChannelSlider className="h-4" channel="hue">
                  <ColorPicker.ChannelSliderTrack className="h-full" />
                  <ColorPicker.ChannelSliderThumb
                    style={{
                      top: 0,
                      left: `calc(${hueLeft} - (${hueLeft} / 15))`,
                    }}
                    className="size-4 rounded-full shadow-md border border-black"
                  />
                </ColorPicker.ChannelSlider>
                <ColorPicker.ChannelSlider className="h-4 py-0" channel="alpha">
                  <ColorPicker.TransparencyGrid className="h-full" />
                  <ColorPicker.ChannelSliderTrack className="h-full" />
                  <ColorPicker.ChannelSliderThumb
                    style={{
                      top: 0,
                      left: `${100 * api.alpha - api.alpha * 6.8}%`,
                    }}
                    className="size-4 rounded-full shadow-md border border-black"
                  />{" "}
                </ColorPicker.ChannelSlider>
                <ColorPicker.SwatchGroup className="hidden">
                  <ColorPicker.SwatchTrigger value="red">
                    <ColorPicker.Swatch value="red">
                      <ColorPicker.SwatchIndicator>
                        ✓
                      </ColorPicker.SwatchIndicator>
                    </ColorPicker.Swatch>
                  </ColorPicker.SwatchTrigger>
                  <ColorPicker.SwatchTrigger value="blue">
                    <ColorPicker.Swatch value="blue">
                      <ColorPicker.SwatchIndicator>
                        ✓
                      </ColorPicker.SwatchIndicator>
                    </ColorPicker.Swatch>
                  </ColorPicker.SwatchTrigger>
                  <ColorPicker.SwatchTrigger value="green">
                    <ColorPicker.Swatch value="green">
                      <ColorPicker.SwatchIndicator>
                        ✓
                      </ColorPicker.SwatchIndicator>
                    </ColorPicker.Swatch>
                  </ColorPicker.SwatchTrigger>
                </ColorPicker.SwatchGroup>

                <div className="p-2 flex flex-col gap-2">
                  <ColorPicker.FormatSelect className="outline-none rounded-md py-1" />
                  <div className="flex justify-between gap-2">
                    <ColorPicker.View format="rgba" className="flex gap-2">
                      <ColorPicker.ChannelInput
                        className="bg-white/80 rounded-md px-1 outline-none max-w-[77px]"
                        channel="hex"
                      />
                      <ColorPicker.ChannelInput
                        className="bg-white/80 rounded-md px-1 outline-none"
                        channel="alpha"
                      />
                    </ColorPicker.View>
                    <ColorPicker.View
                      data-open="true"
                      className="flex gap-2"
                      format="hsla"
                    >
                      <ColorPicker.ChannelInput
                        className="bg-white/80 rounded-md px-1 outline-none min-w-[76px]"
                        channel="hue"
                      />
                      <ColorPicker.ChannelInput
                        className="bg-white/80 rounded-md px-1 outline-none min-w-[76px]"
                        channel="saturation"
                      />
                      <ColorPicker.ChannelInput
                        className="bg-white/80 rounded-md px-1 outline-none min-w-[76px]"
                        channel="lightness"
                      />
                    </ColorPicker.View>
                    <ColorPicker.EyeDropperTrigger>
                      <HiMiniEyeDropper />
                    </ColorPicker.EyeDropperTrigger>
                  </div>
                </div>
              </ColorPicker.Content>
            </ColorPicker.Positioner>
          </>
        );
      }}
    </ColorPicker.Root>
  );
};
