/**
 * @description: hex 转 rgb
 * @param {*} color 颜色
 * @return {*}
 * @author: gumingchen
 */
export function hex2Rgb(color: string): number[] {
  color = color.replace("#", "");
  const result: Array<any> | null = color.match(/../g);
  for (let i = 0; i < 3; i++) {
    result![i] = parseInt(result![i], 16);
  }
  return result as number[];
}
/**
 * @description: rgb 转 hex
 * @param {*} r g b 颜色
 * @return {*}
 * @author: gumingchen
 */
export function rgb2Hex(r: number, g: number, b: number) {
  const hexs = [r.toString(16), g.toString(16), b.toString(16)];
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length === 1) {
      hexs[i] = "0" + hexs[i];
    }
  }
  const result = "#" + hexs.join("");
  return result;
}
/**
 * @description: 使颜色变淡
 * @param {*} key
 * @return {*}
 * @author: gumingchen
 */
export function lighten(color: string, level: number) {
  const rgb: number[] = hex2Rgb(color);
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
  }
  const result = rgb2Hex(rgb[0], rgb[1], rgb[2]);
  return result;
}

/**
 * @description: 使颜色变深
 * @param {*} key
 * @return {*}
 * @author: gumingchen
 */
export function darken(color: string, level: number) {
  const rgb = hex2Rgb(color);
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor(rgb[i] * (1 - level));
  }
  const result = rgb2Hex(rgb[0], rgb[1], rgb[2]);
  return result;
}
