function feistelRound(value: number, key: number, round: number): number {
    return (((value ^ key) * (2654435761 + round)) >>> 0) & 0xffffffff;
}

function feistelPermute(input: number, seed: number, range: number, rounds: number = 3): number {
    let left = input & 0xffff;
    let right = (input >> 16) & 0xffff;

    for (let i = 0; i < rounds; i++) {
        const newLeft = right;
        const newRight = (left ^ feistelRound(right, seed, i)) & 0xffff;
        left = newLeft;
        right = newRight;
    }

    return (((left << 16) | right) >>> 0) % range;
}

export function getFeistelRandomNumber(yyyymmdd: number, n: number, m: number): number {
    const range = m - n;

    const seed = ((yyyymmdd ^ 0x5deece66d) >>> 0) & 0xffffffff;

    return n + feistelPermute(yyyymmdd % range, seed, range);
}
