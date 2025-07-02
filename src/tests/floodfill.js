function hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b, a: 255 }; // Assuming full opacity
}

function flood_fill(x, y, color) {
    if (typeof color === 'string') {
        color = hexToRgb(color);
    }

    let pixel_stack = [{ x: x, y: y }];
    let pixels = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0,
        0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];

    let linear_cords = (y * 4 + x) * 4;
    let original_color = {
        r: pixels[linear_cords],
        g: pixels[linear_cords + 1],
        b: pixels[linear_cords + 2],
        a: pixels[linear_cords + 3]
    };

    while (pixel_stack.length > 0) {
        let new_pixel = pixel_stack.shift();
        x = new_pixel.x;
        y = new_pixel.y;

        linear_cords = (y * 4 + x) * 4;

        while (y-- >= 0 && (pixels[linear_cords] == original_color.r &&
               pixels[linear_cords + 1] == original_color.g &&
               pixels[linear_cords + 2] == original_color.b &&
               pixels[linear_cords + 3] == original_color.a)) {
            linear_cords -= 4 * 4;
        }

        linear_cords += 4 * 4;
        y++;

        let reached_left = false;
        let reached_right = false;

        while (y++ < 4 && (pixels[linear_cords] == original_color.r &&
               pixels[linear_cords + 1] == original_color.g &&
               pixels[linear_cords + 2] == original_color.b &&
               pixels[linear_cords + 3] == original_color.a)) {
            pixels[linear_cords] = color.r;
            pixels[linear_cords + 1] = color.g;
            pixels[linear_cords + 2] = color.b;
            pixels[linear_cords + 3] = color.a;

            if (x > 0) {
                if (pixels[linear_cords - 4] == original_color.r &&
                    pixels[linear_cords - 3] == original_color.g &&
                    pixels[linear_cords - 2] == original_color.b &&
                    pixels[linear_cords - 1] == original_color.a) {
                    if (!reached_left) {
                        pixel_stack.push({ x: x - 1, y: y });
                        reached_left = true;
                    }
                } else if (reached_left) {
                    reached_left = false;
                }
            }

            if (x < 4 - 1) {
                if (pixels[linear_cords + 4] == original_color.r &&
                    pixels[linear_cords + 5] == original_color.g &&
                    pixels[linear_cords + 6] == original_color.b &&
                    pixels[linear_cords + 7] == original_color.a) {
                    if (!reached_right) {
                        pixel_stack.push({ x: x + 1, y: y });
                        reached_right = true;
                    }
                } else if (reached_right) {
                    reached_right = false;
                }
            }

            linear_cords += 4 * 4;
        }
    }

    return pixels;
}

module.exports = flood_fill;