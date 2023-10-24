let perm = (n) => {
    let p = [...Array(n).keys()];
    for (let i = n - 1 ; i >= 0 ; i--) {
        const j = crypto.randomInt(n);
        [p[i], p[j]] = [p[j], p[i]];
    }
    return p;
}

let random_key = (n) => {
    let k = [];
    for (let i = 0; i < n; i++) k.push(perm(n));
    return k;
}
let random_p = (n) => {
    let p = [];
    for (let i = 0; i < n; i++) p.push(crypto.randomInt(n));
    return p;
}
let new_state_vector = (n) => {
    return Array(n).fill(0);
}
let print_key = (k) => {
    const n = k.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) process.stdout.write(`${k[i][j]} `);
        process.stdout.write(`\n`);
    }
}
let get_f = (k,s) => {
    const n = k.length;
    var f = [];var x;
    for (let i = 0; i < n; i++) {
        x = i;
        for (let j = 0; j < n; j++) x = k[j][(x+s[j])%n];
        f.push(x);
    }
    return f;
}
let print_vec = (v) => {
    for (let j = 0; j < v.length; j++) process.stdout.write(`${v[j]} `);
    process.stdout.write('\n');
}
let inv = (f) => {
    let g = [];
    for (let i =0; i < f.length; i++ ) g.push(f.indexOf(i));
    return g;
}

let enc = (p,k) => {
    const n = k.length;
    let s = new_state_vector(n);
    let c = [];
    for (let i = 0; i < p.length; i++) {
        const f = get_f(k,s);
        c.push(f[p[i]]);
        for (let j = 0; j < n; j++) s[j] = (s[j] + f[j])%n;
        //print_key(k,s);
        //process.stdout.write('\n');
    }
    return c;
}

let dec = (p,k) => {
    const n = k.length;
    let s = new_state_vector(n);
    let c = [];
    for (let i = 0; i < p.length; i++) {
        const f = get_f(k,s);
        const g = inv(f);
        c.push(g[p[i]]);
        for (let j = 0; j < n; j++) s[j] = (s[j] + f[j])%n;
        //print_key(k,s);
        //process.stdout.write('\n');
    }
    return c;
}
let test = () => {
    const n = 10;
    const k =  random_key(n);
    print_key(k);
    process.stdout.write('\n');
    for (let i = 0; i < n; i++) {
        const p = random_p(n);
        const c = enc(p,k);
        const d = dec(c,k);
        print_vec(p);
        print_vec(c);
        print_vec(d);
        process.stdout.write('\n');
    }
}

test()

