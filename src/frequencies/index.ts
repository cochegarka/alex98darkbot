export const englishFrequencies: ReadonlyMap<string, number> = new Map<string, number>(
  [
    ['e', 0.0601],
    ['t', 0.0455],
    ['a', 0.0406],
    ['o', 0.0384],
    ['i', 0.03655],
    ['n', 0.03475],
    ['s', 0.0314],
    ['r', 0.0301],
    ['h', 0.0296],
    ['d', 0.0216],
    ['l', 0.0199],
    ['u', 0.0144],
    ['c', 0.01355],
    ['m', 0.01305],
    ['f', 0.0115],
    ['y', 0.01055],
    ['w', 0.01045],
    ['g', 0.01015],
    ['p', 0.0091],
    ['b', 0.00745],
    ['v', 0.00555],
    ['k', 0.00345],
    ['x', 0.00085],
    ['q', 0.00055],
    ['j', 0.0005],
    ['z', 0.00035]
  ]
);

export const russianFrequencies: ReadonlyMap<string, number> = new Map<string, number>(
  [

    ['о', 0.05485],
    ['е', 0.04225],
    ['а', 0.04005],
    ['и', 0.03675],
    ['н', 0.0335],
    ['т', 0.0313],
    ['с', 0.02735],
    ['р', 0.02365],
    ['в', 0.0227],
    ['л', 0.022],
    ['к', 0.01745],
    ['м', 0.01605],
    ['д', 0.0149],
    ['п', 0.01405],
    ['у', 0.0131],
    ['я', 0.01005],
    ['ы', 0.0095],
    ['ь', 0.0087],
    ['г', 0.0085],
    ['з', 0.00825],
    ['б', 0.00795],
    ['ч', 0.0072],
    ['й', 0.00605],
    ['х', 0.00485],
    ['ж', 0.0047],
    ['ш', 0.00365],
    ['ю', 0.0032],
    ['ц', 0.0024],
    ['щ', 0.0018],
    ['э', 0.0016],
    ['ф', 0.0013],
    ['ъ', 0.0002],
    ['ё', 0.0002]
  ]
);

export function computeMetric(first: ReadonlyMap<string, number>, second: ReadonlyMap<string, number>): number {
  let metric = 0;

  first.forEach((v, k) => {
    const x = Math.abs(v - (second.get(k) || 0));
    metric += x * x;
  });

  return metric;
}

export function computeDot(first: ReadonlyMap<string, number>, second: ReadonlyMap<string, number>): number {
  let dotProd = 0;

  first.forEach((v, k) => {
    dotProd += v * (second.get(k) || 0);
  });

  return dotProd;
}