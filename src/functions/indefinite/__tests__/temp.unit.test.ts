export {};

function sum(): number {
  let tally = 0;
  for (let i = 1; i <= 50; i++) {
    tally += 2 * i + 1;
  }
  return tally;
}

function retY(m: number): number {
  let y = Math.floor(m/2);
  for (let i = 0; i < 10; i++) {
    y = m + y + i;
  }
  return y;
}

function powers(n: number): boolean | number {
  let y = 0;
  while (2**y <= n) {
    if (2**y === n) {
      return y;
    }
    y = y + 1;
  }
  return false;
}

function even(n: number): boolean {
  if (n % 2 === 0) {
    return true;
  }
  return false;
}

function sec(n: number): number {
  let y = 2;
  for (let i = 1; i <= n; i++) {
    if (even(i)) {
      y = y + i;
    }
  }
  return y;
}

describe('', () => {
  it('sec should return', () => {
    expect(sec(2)).toBe(4);
  });
  it('should', () => {
    expect(retY(0)).toBe(45);
  });
  it('powers should return 1', () => {
    expect(powers(2)).toBe(1);
  });

  it('should be big', () => {
    expect(sum()).toBe(0);
  });
});
