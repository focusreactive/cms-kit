export const colorText = (text, color) => {
  const colors = {
    reset: "\x1b[0m",
    dim: "\x1b[2m",
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
  };
  return `${colors[color] || colors.reset}${text}${colors.reset}`;
};
