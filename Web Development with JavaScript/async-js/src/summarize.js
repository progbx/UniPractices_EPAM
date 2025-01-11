export function summarize(...args) {
    return Promise.all(args).then((values) =>
      values.reduce((sum, value) => sum + value, 0)
    );
}  