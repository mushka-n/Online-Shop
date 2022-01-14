export default class ColorManager {
    static rgbToHex(r, g, b) {
        return (
            "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
    }

    static hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        console.log(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : { r: 0, g: 0, b: 0 };
    }

    static hexToHSL(rgb) {
        rgb = rgb.replace(/^\s*#|\s*$/g, "");

        if (rgb.length === 3) {
            rgb = rgb.replace(/(.)/g, "$1$1");
        }

        let r = parseInt(rgb.substr(0, 2), 16) / 255,
            g = parseInt(rgb.substr(2, 2), 16) / 255,
            b = parseInt(rgb.substr(4, 2), 16) / 255,
            cMax = Math.max(r, g, b),
            cMin = Math.min(r, g, b),
            delta = cMax - cMin,
            l = (cMax + cMin) / 2,
            h = 0,
            s = 0;

        if (delta === 0) h = 0;
        else if (cMax === r) h = 60 * (((g - b) / delta) % 6);
        else if (cMax === g) h = 60 * ((b - r) / delta + 2);
        else h = 60 * ((r - g) / delta + 4);

        if (delta === 0) s = 0;
        else s = delta / (1 - Math.abs(2 * l - 1));

        const hsl = { h: h, s: s, l: l };
        return hsl;
    }

    static hslToHex(hsl) {
        let c = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s,
            x = c * (1 - Math.abs(((hsl.h / 60) % 2) - 1)),
            m = hsl.l - c / 2;

        let rgb;
        if (hsl.h < 60) rgb = { r: c, g: x, b: 0 };
        else if (hsl.h < 120) rgb = { r: x, g: c, b: 0 };
        else if (hsl.h < 180) rgb = { r: 0, g: c, b: x };
        else if (hsl.h < 240) rgb = { r: 0, g: x, b: c };
        else if (hsl.h < 300) rgb = { r: x, g: 0, b: c };
        else rgb = { r: c, g: 0, b: x };

        const normalize_rgb_value = (color, m) => {
            color = Math.floor((color + m) * 255);
            if (color < 0) {
                color = 0;
            }
            return color;
        };

        rgb.r = normalize_rgb_value(rgb.r, m);
        rgb.g = normalize_rgb_value(rgb.g, m);
        rgb.b = normalize_rgb_value(rgb.b, m);

        return this.rgbToHex(rgb.r, rgb.g, rgb.b);
    }

    static hexToShade(hex) {
        const rgb = this.hexToRgb(hex);
        return (
            (1 / 2) *
            (Math.max(rgb.r, rgb.g, rgb.b) + Math.min(rgb.r, rgb.g, rgb.b))
        );
    }

    static changeHue(hex, degree) {
        let hsl = this.hexToHSL(hex);
        hsl.h += degree;
        if (hsl.h > 360) hsl.h -= 360;
        else if (hsl.h < 0) hsl.h += 360;
        return this.hslToHex(hsl);
    }

    static setShade(hex, amount) {
        const currShade = this.hexToShade(hex);
        if (currShade !== amount) {
            hex = this.changeShade(hex, amount - currShade);
        }
        return hex;
    }

    static changeShade(hex, amount) {
        if (hex === undefined) return "#ffffff";
        const num = parseInt(hex.slice(1), 16);

        const designateBoundaries = (x) => {
            if (x > 255) x = 255;
            else if (x < 0) x = 0;
            return x;
        };

        let r = designateBoundaries((num >> 16) + amount);
        let b = designateBoundaries(((num >> 8) & 0x00ff) + amount);
        let g = designateBoundaries((num & 0x0000ff) + amount);

        return "#" + (g | (b << 8) | (r << 16)).toString(16);
    }

    static gradientFromHex(hex, deg, shift, shade) {
        const color1 = this.changeShade(hex, shade);
        const color2 = this.changeHue(this.changeShade(hex, shade), shift);
        return `linear-gradient(${deg}deg, ${color1} 0%, ${color2} 100%)`;
    }
}
