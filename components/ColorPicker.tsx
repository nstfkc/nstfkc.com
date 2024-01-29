import { ColorPicker } from "@ark-ui/react/color-picker";
import { ComponentProps } from "react";

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
                  className="w-full h-full"
                  value={api.valueAsString}
                />
              </ColorPicker.Trigger>
            </ColorPicker.Control>
            <ColorPicker.Positioner
              style={{ background: "rgba(255,255,255,0.8)", zIndex: 1000 }}
              className="bg-white w-[240px] py-2 rounded-md overflow-hidden shadow-md backdrop-blur-[4px]"
            >
              <ColorPicker.Content>
                <ColorPicker.FormatSelect />
                <ColorPicker.Area
                  style={{ "--z-index": 1000, border: "none" }}
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
                <ColorPicker.SwatchGroup>
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
                <div className="px-2 flex gap-2">
                  <ColorPicker.View format="rgba" className="flex gap-2">
                    <ColorPicker.ChannelInput
                      className="bg-white/80 rounded-md px-1 outline-none"
                      channel="hex"
                    />
                    <ColorPicker.ChannelInput
                      className="bg-white/80 rounded-md px-1 outline-none"
                      channel="alpha"
                    />
                  </ColorPicker.View>
                  <ColorPicker.View format="hsla">
                    <ColorPicker.ChannelInput channel="hue" />
                    <ColorPicker.ChannelInput channel="saturation" />
                    <ColorPicker.ChannelInput channel="lightness" />
                  </ColorPicker.View>
                  <ColorPicker.EyeDropperTrigger>
                    Pick color
                  </ColorPicker.EyeDropperTrigger>
                </div>
              </ColorPicker.Content>
            </ColorPicker.Positioner>
          </>
        );
      }}
    </ColorPicker.Root>
  );
};
