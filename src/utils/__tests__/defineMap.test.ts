import defineMap from "@/utils/defineMap";
import { describe, expect, it } from "vitest";

const enum MusicType {
  POP = "pop",
  RAP = "rap",
  ROCK = "rock",
}

interface MusicTypeDef {
  key: MusicType;
  value: number;
  name: string;
  icon: string;
  style: { width: number; height: number; color?: string };
}

const MusicTypeDefs: MusicTypeDef[] = [
  {
    key: MusicType.POP,
    value: 1,
    name: "流行音乐",
    icon: "pop.svg",
    style: { width: 100, height: 100, color: "red" },
  },
  {
    key: MusicType.RAP,
    value: 2,
    name: "说唱音乐",
    icon: "rap.svg",
    style: { width: 100, height: 100 },
  },
  {
    key: MusicType.ROCK,
    value: 3,
    name: "摇滚音乐",
    icon: "rock.svg",
    style: { width: 100, height: 100 },
  },
];

// list
const MusicTypeKeys = defineMap(MusicTypeDefs, "key");
const MusicTypeValues = defineMap(MusicTypeDefs, "value");
const MusicTypeNames = defineMap(MusicTypeDefs, "name");
const MusicTypeIcons = defineMap(MusicTypeDefs, "icon");

console.log(MusicTypeKeys[0]);

// map: key to value
const MusicTypeNameMaps = defineMap(MusicTypeDefs, "key", "name");
const MusicTypeIconMaps = defineMap(MusicTypeDefs, "key", "icon");
const MusicTypeName2IconMaps = defineMap(MusicTypeDefs, "name", "icon");
const MusicTypeValue2IconMaps = defineMap(MusicTypeDefs, "value", "icon");
const MusicTypeValue2NameMaps = defineMap(MusicTypeDefs, "value", "name");

console.log(MusicTypeIconMaps[MusicType.POP]); // 'pop.svg'
console.log(MusicTypeName2IconMaps[MusicTypeDefs[2].icon]); // 'rock.svg'
console.log(MusicTypeValue2IconMaps[MusicTypeDefs[1].value]); // 'rap.svg'
console.log(MusicTypeValue2NameMaps[MusicTypeDefs[0]["value"]]); // '流行音乐'

// map: key to values
const MusicTypeMaps = defineMap(MusicTypeDefs, "key", [
  "value",
  "name",
  "icon",
  "style",
]);

console.log(MusicTypeMaps[MusicType.POP].name); // '流行音乐'
console.log(MusicTypeMaps[MusicType.POP].icon); // 'pop.svg'

// console.log({
//     MusicTypeKeys,
//     MusicTypeValues,
//     MusicTypeNames,
//     MusicTypeIcons,

//     MusicTypeNameMaps,
//     MusicTypeIconMaps,
//     MusicTypeName2IconMaps,
//     MusicTypeValue2IconMaps,

//     MusicTypeMaps,
// })

describe("#test defineMap", () => {
  it("return list", () => {
    expect(defineMap(MusicTypeDefs, "key")).toStrictEqual([
      "pop",
      "rap",
      "rock",
    ]);
  });
  it("key to value", () => {
    expect(defineMap(MusicTypeDefs, "key", "name")).toStrictEqual({
      pop: "流行音乐",
      rap: "说唱音乐",
      rock: "摇滚音乐",
    });
  });
  it("key to values", () => {
    expect(
      defineMap(MusicTypeDefs, "key", ["value", "name", "icon", "style"])
    ).toStrictEqual({
      pop: {
        value: 1,
        name: "流行音乐",
        icon: "pop.svg",
        style: { width: 100, height: 100, color: "red" },
      },
      rap: {
        value: 2,
        name: "说唱音乐",
        icon: "rap.svg",
        style: { width: 100, height: 100 },
      },
      rock: {
        value: 3,
        name: "摇滚音乐",
        icon: "rock.svg",
        style: { width: 100, height: 100 },
      },
    });
  });
});
